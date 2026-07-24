# SYNTHIA — Master Rebuild Plan (Clean-Slate, MuJoCo-Native, Hosted Multi-Agent)

## What This Is

This is a ground-up rebuild of Synthia. The previous build started on a hybrid Rapier/MuJoCo
stack and migrated to MuJoCo mid-project; that migration surfaced a long list of hard-won
lessons (coordinate systems, actuator mechanics, balance, contact geometry). This rebuild starts
MuJoCo-native from Phase 1, folds every one of those lessons in from the start, merges the
coordinator into the single-agent app (no separate backend process for V1), and — once V1 is
stable — builds the hosted multi-agent platform on top of it.

**Two projects, sequenced, not parallel:**
- **Single Agent (V1)** — Phases 1–6. Must be fully stable, producing exported datasets, before V2 begins.
- **Multi-Agent Hosted Platform (V2)** — Phases 7–16. Built as a superset of V1's codebase, not a separate rewrite. Follows `v2_hosted_platform_spec.md` section 14's build sequencing exactly.

## Source-of-Truth Documents (read the relevant one before each phase, don't re-derive from memory)

| Document | Covers |
|---|---|
| `technical_spec.md` | Full system architecture, payload/output schemas, memory system, motor programs, skill ladder, camera system, body modes, dataset export — the primary reference for *what* to build |
| `01_UI_UX_AND_STATE.md` | Every UI panel, Zustand store slice, state sync mechanics |
| `02_FILE_MANIFEST_AND_FUNCTIONS.md` | Directory tree, per-file responsibilities |
| `03_PHYSICS_AND_DOMAIN_BLUEPRINT.md` | Kinematic hierarchy, coordinate conversions, joint limits, PD gains |
| `04_MIGRATION_PROMPTS_AND_SPECS.md` | The 10 architectural lessons from the previous MuJoCo migration — **mandatory reading before Phase 2**, since this rebuild exists specifically to bake these in from day one instead of discovering them mid-project |
| `05_MODEL_PROMPTS_AND_PROVIDERS.md` | System prompt architecture, joint axis map, streaming parser, provider adapters, action normalization |
| `jules_prompts.md` | Original 5-phase build sequence — superseded by this plan, but its design-system reference (typography, colour, components, icons, toasts) and completion-check discipline still apply as-is |
| `project_info__43.md` | The balance system design (convex-hull contact reflex) and its own 3-phase rollout plan — this rebuild's Phase 3 balance work follows this document's plan directly |
| `v2_hosted_platform_spec.md` | Full V2 platform spec — architecture, auth, sharded Supabase, visibility tiers, camera, audio, sleep system. Section 13's open decisions are already resolved (✅). Section 14's build sequencing is what Phases 7–16 below are built from. |
| `v2_spec.md` | **Superseded.** Do not build from this — it describes the earlier local two-Kaggle-account draft. Kept for historical reference only. |

## Non-Negotiable Corrections Baked In From Phase 1 (not discovered later)

These come from the previous migration's hard lessons (`04_MIGRATION_PROMPTS_AND_SPECS.md`) plus
issues found after that document was written. Every phase below assumes these as ground truth:

1. **Single physics engine, MuJoCo WASM, from Phase 1.** No hybrid Rapier/MuJoCo split, ever.
2. **Mass via `<inertial>` tags, never geom density.** Explicit `<inertial>` overrides density calculations in MuJoCo — specifying both double-counts mass.
3. **Position actuators use `forcerange` for torque limits, never `gear`.** `gear` is inert on `<position>` actuators.
4. **Frame-0 `ctrl`/`qpos` sync is mandatory from the first commit.** `qpos` initializes directly to `DEFAULT_STANCE_POSE`, `ctrl` is written to match in the same call, before the first `mj_step`. Never spawn at zero and ramp up.
5. **Quaternion conversion is conjugation, not axis remapping.** `q_mujoco = Q_align * q_three * Q_align⁻¹` where `Q_align` is a +90° rotation about X. Never swap quaternion components directly — that produces a mirrored (improper, det=−1) transform, not a rotation.
6. **The root capsule body has zero collision participation from Phase 2 onward** (`contype="0" conaffinity="0"`). It exists only to anchor the freejoint and as the target for balance torque — never as a collision object. This is not something to discover and fix later; it's a Phase 2 requirement.
7. **Foot geoms are thin rectangular slabs directly under the sole, never boxes or capsules that protrude past the foot's silhouette.** Any geom sticking out beyond the actual foot shape — sideways, forward, or vertically — degrades balance by shifting the effective support polygon in ways the visual foot doesn't match. This applies to every ground-contact geom, not just feet, if any other body part is ever given standing/gripping contact later (e.g., hands on a ladder).
8. **Balance, for this rebuild pass, is `applyCapsuleBalance()` only** — orientation/angular-velocity based torque on the root capsule, the same proven mechanism from the previous build. **`project_info__43.md`'s convex-hull contact-based COM tracking is explicitly deferred — do not implement it as part of this plan.** That design isn't ready yet. Phase 3 below builds the balance system assuming layer 1 only; the layered COM-tracking addition is future work, out of scope here, and will get its own plan when it's ready.
9. **WASM heap array views (`qpos`, `qvel`, `ctrl`) are wrapped in getters that re-acquire the live heap address every step.** Never cache a raw reference across a model reload or heap resize.
10. **Dynamic object spawning uses the pre-allocated slot pool** (20 slots, each with 4 deactivated sibling geoms — sphere/box/cylinder/capsule) — never live XML recompilation for primitive spawns. Recompilation is reserved for custom mesh uploads and full scene resets only, and must capture + rehydrate all existing object and humanoid state across the reload.

## Documentation-Per-Phase Discipline

**After every phase**, before starting the next, produce a `PHASE_N_COMPLETE.md` in the project
root containing: what was built, what deviated from this plan and why, what's still open/deferred,
and the exact state needed for a fresh session to pick up at Phase N+1 with zero prior context.
Do not start a new phase in a new session without reading the previous phase's completion doc
first.

## Phase Index

**Single Agent:**
1. Project Scaffold & Design System
2. MuJoCo-Native Humanoid (Engine, Skeleton, Coordinate/Quaternion Layer)
3. Actuators, Motor Control & Layered Balance System
4. Interactive World — Objects, Terrain, Audio
5. Merged Coordinator & AI Cognition Loop
6. Full UI Integration, Dataset Export & V1 Stabilization

**Multi-Agent Hosted Platform (V2):**
7. Headless Multi-Agent Core (server-side physics + N-agent inference loop, no auth/frontend yet)
8. Auth, Accounts & Agent Registry
9. Camera & Personal Viewing (own agents only)
10. Visibility Tiers & Spectator Mode
11. Audio — TTS / STT / Discussions Log
12. Sleep System
13. Recording & BYO Supabase
14. Admin Panel, Custom Model Upload & External Agent Integration

Each phase has its own prompt file in `single-agent/` or `multi-agent/`. Supabase schemas are in
`supabase/` — `v1-single-agent-schema.sql` and `v2-multi-agent-sharded-schema.sql`, kept separate
since V2's per-agent memory storage is sharded across multiple owned Supabase projects while V1
uses one.
