# SYNTHIA Rebuild — Phase 2: MuJoCo-Native Humanoid (Engine, Skeleton, Coordinate Layer)

**Read first:** `PHASE_1_COMPLETE.md`, `00_MASTER_BUILD_PLAN.md`'s corrections list (all 10 apply
here, most heavily items 1–7 and 9), `03_PHYSICS_AND_DOMAIN_BLUEPRINT.md`, and
`04_MIGRATION_PROMPTS_AND_SPECS.md` in full — this phase exists specifically to build correctly
what that document's Lessons 1–9 discovered the hard way mid-migration last time. Every one of
those lessons is a Phase 2 requirement here, not a later fix.

## Objective

Load MuJoCo WASM, load the `x-bot.glb` humanoid mesh, extract its skeleton, and build a fully
correct MJCF humanoid — coordinate transforms, quaternion handling, mass, joints, and foot contact
geometry all correct from the first commit. No AI, no motor control loop yet — this phase proves
the physical body exists, spawns correctly, and holds a static pose without exploding.

## Tasks

1. **WASM setup.** Place the single-threaded `mujoco.wasm` binary at `/public/mujoco/mujoco.wasm`.
   Implement `PhysicsEngine.ts` loading it via absolute server path. Use the single-threaded build —
   no SharedArrayBuffer/COOP-COEP requirement. Wrap `qpos`/`qvel`/`ctrl` heap array access in
   getters that re-acquire the live heap address every step (correction #9).
2. **Coordinate & quaternion layer.** Implement `worldToMuJoCo`/`mujocoToWorld` as a **proper
   rotation** (det = +1) mapping Y-up (Three.js) to Z-up (MuJoCo) with up staying up:
   `worldToMuJoCo(v) = (v.x, -v.z, v.y)`, inverse `mujocoToWorld(p) = (p[0], p[2], -p[1])`.
   Implement `threeQuatToMuJoCo`/`mujocoQuatToThree` via **conjugation**, not axis-swapping:
   `q_mujoco = Q_align * q_three * Q_align⁻¹` where `Q_align` is +90° about X
   (`(0.7071, 0.7071, 0, 0)` in MuJoCo's scalar-first `w,x,y,z` convention — note MuJoCo is
   scalar-first, Three.js is scalar-last, the conjugation must account for both the axis remap and
   the component-order difference). Unit-test both against a known non-trivial rotation (not just
   identity) before moving on — identity round-trips pass under a broken (mirrored) transform too,
   so it doesn't catch this class of bug.
3. **Skeleton extraction.** Traverse the loaded skeleton, index anatomical bone names, extract
   world-space bone positions and orientations. **Explicitly call `updateMatrixWorld(true)` on the
   skeleton before extraction** — Three.js bone matrices are not auto-evaluated outside a render
   loop, and skipping this produces all bones collapsed near the origin.
4. **MJCF humanoid template (`MJCFHumanoidTemplate.ts`).** For each bone: decompose multi-DOF
   joints as multiple `<joint type="hinge">` elements inside one `<body>` (not nested dummy
   bodies). Set `armature` (0.02 major joints, 0.01 extremities) and `frictionloss` (~0.1) on every
   joint. Set mass via explicit `<inertial>` tags per body segment — **never** via geom density;
   specifying both double-counts mass (correction #2).
5. **Root capsule.** Give it a `<freejoint>` (only a direct child of `<worldbody>` may have one —
   any bone nested under it structurally cannot). Set its collision geom to
   `contype="0" conaffinity="0"` from this phase onward (correction #6) — it exists solely to
   anchor the freejoint; collision is handled entirely by limb/foot geoms.
6. **Foot geometry.** Flat, thin rectangular slab geoms directly under the sole — matching the
   actual foot's footprint, never protruding past it in any direction (correction #7). This
   prevents the single-point "rolling pin" contact instability capsule/rounded foot geoms caused
   previously.
7. **Collision scheme.** Every limb gets its own collision geom (verify torso/spine/neck coverage,
   not just legs/feet/arms). Use a `contype`/`conaffinity` bitmask scheme where limbs collide with
   the floor but not with each other (self-collision off) — document the exact bitmask chosen in
   code comments so future additions match it.
8. **Frame-0 sync.** On spawn/reset: `qpos` initializes directly to `DEFAULT_STANCE_POSE` values
   (define this constant now, even though the AI/motor-control loop doesn't exist yet — a static
   test pose is fine for this phase), `ctrl` is written to match `qpos` in the same call before the
   first `mj_step` (correction #4). Zero `qvel` and `xfrc_applied` on reset.
9. **Body sync.** Implement `syncRigidBodiesFromBones` to initialize joint coordinates from bone
   transforms at load, and the reverse sync (physics → visual mesh) for rendering — using the
   coordinate/quaternion helpers from step 2, and rotating any local offset vectors (e.g. capsule-
   to-mesh-root offsets) by current orientation rather than subtracting along a fixed world axis.

## Test Before Calling This Phase Done

- Spawn the humanoid in the stance pose. It should hold that pose, standing, for 600+ simulation
  steps without joint explosion, jitter, or visible drift.
- Push it over deliberately (apply an external force) and let it come to rest lying down. Confirm
  it settles on its actual limb geometry — no capsule artifacts, no floor clipping.
- Confirm a 90°-about-one-axis test rotation on a single bone (e.g. an arm) visually rotates the
  correct limb in the correct direction — this is the check that would catch a mirrored quaternion
  transform, which an identity-only test would miss.

## Completion Checklist

- [ ] Coordinate and quaternion helpers pass the non-trivial rotation test
- [ ] Character spawns already in `DEFAULT_STANCE_POSE`, zero frame-0 snap
- [ ] Static stance holds for 600+ steps, no explosion or jitter
- [ ] Push-and-fall test settles correctly with no capsule artifacts
- [ ] All limb collision geoms confirmed present (explicit grep/audit, not assumption)

## Before Ending This Phase

Write `PHASE_2_COMPLETE.md`: exact `DEFAULT_STANCE_POSE` values used, confirmation of the rotation
test result, any bones/joints that needed special handling, and instructions for Phase 3 to begin
with zero prior context.
