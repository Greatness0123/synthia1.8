# SYNTHIA Rebuild — Phase 3: Actuators, Motor Control & Balance

**Read first:** `PHASE_2_COMPLETE.md`, `03_PHYSICS_AND_DOMAIN_BLUEPRINT.md` for PD gain reference
values, `04_MIGRATION_PROMPTS_AND_SPECS.md` Lesson 7 (gear mechanics) and Lesson 2 (ramping).

**Scope note — read this before starting:** `project_info__43.md` describes a more advanced
convex-hull, contact-based balance system layered on top of orientation-based balance torque.
**That design is explicitly out of scope for this phase and this rebuild pass — do not implement
it.** This phase builds balance as a single system: `applyCapsuleBalance()`, orientation and
angular-velocity based, the same proven mechanism from the previous build. The layered COM-tracking
addition is deferred to a future plan once that design is ready.

## Objective

Give every joint a working PD position actuator, correct torque limiting, a soft-start ramp that
never conflicts with the Frame-0 sync from Phase 2, and a working orientation-based balance
controller on the root capsule. By the end of this phase the character stands stably, indefinitely,
with no AI driving it — pure physics and this control layer.

## Tasks

1. **Actuators.** `<position>` actuators for every hinge joint, `kp`/`kv` per `03_PHYSICS_AND_
   DOMAIN_BLUEPRINT.md`'s reference table (rough starting points: legs `kp=400/kv=80`, arms
   `kp=200/kv=40`, spine `kp=300/kv=60`, neck/head `kp=150/kv=30`, fingers `kp=5/kv=1`) — treat
   these as starting points to tune against the stability test below, not fixed values.
2. **Torque limiting — use `forcerange`, never `gear`.** `gear` has no effect on `<position>`
   actuators' torque scaling (Lesson 7); set explicit `forcerange` per actuator to keep outputs
   within safe bounds.
3. **`MotorController.ts`.** Central place that writes `ctrl` from either default stance targets or
   externally supplied targets (AI targets come in Phase 5 — for now, only the stance pose exists as
   a target source). Implement the additive pattern from day one even though nothing but the stance
   pose feeds it yet: `ctrl[joint] = DEFAULT_STANCE_POSE[joint] + deviation[joint]`, with
   `deviation` defaulting to zero. This avoids a rework in Phase 5 when AI targets become a real
   deviation source.
4. **Soft-start ramp.** 20-frame linear ramp (`α = min(1.0, step/20)`) for *changes* to targets
   after spawn — but confirm this never fights Frame-0 sync: at `t=0`, `qpos` and `ctrl` are
   already equal (from Phase 2), so the ramp only matters for pose *transitions* after spawn, never
   for the initial state. Verify explicitly: log `ctrl` and `qpos` at frame 0 and confirm zero
   error, not "error ramping down from something."
5. **Balance controller (`applyCapsuleBalance`).** Reads root capsule orientation (`xquat`) and
   angular velocity (`qvel` via `body_dofadr`) only — no dependency on contact state. Computes tilt
   relative to world-up and applies a capped corrective torque via `xfrc_applied`. Cap the torque
   (don't let it silently dominate over leg actuators) — tune the cap empirically against the
   stability test, don't guess a number and assume it's right.

## Test Before Calling This Phase Done

- Spawn in stance pose, zero AI input, run 600+ steps (10+ seconds): should hold standing, no
  jitter, no drift, no gradual height climb (verify via a foot-ground distance check that reads
  real geom world position — not body origin plus a fixed constant offset, that was a real bug
  last time).
- Push it lightly: should wobble and recover.
- Push it hard: should actually fall over — balance torque is capped on purpose, this is correct
  behavior, not a bug to fix.
- Fallen/lying-down test: confirm it settles correctly, and specifically watch any grounded-state
  logic for orientation-dependent bugs (a fixed-offset-along-world-Y calculation that doesn't
  rotate with the body's current orientation will misreport once the body is lying flat rather than
  standing — this was a real, separate bug last time, worth testing for explicitly here).

## Completion Checklist

- [ ] All joints actuated, `forcerange` set (not relying on `gear`)
- [ ] `ctrl`/`qpos` frame-0 equality confirmed via log, not assumed
- [ ] 600+ step standing-idle test passes with no jitter or height drift
- [ ] Light push → recovers; hard push → genuinely falls (both confirmed, not just one)
- [ ] Fallen/lying-down test passes, grounded-state logic checked while lying flat specifically

## Before Ending This Phase

Write `PHASE_3_COMPLETE.md`: final tuned gain values, torque cap value used, confirmation of all
four tests above with actual numbers (not just pass/fail), and note explicitly that the
`project_info__43.md` layered balance system remains deferred and out of scope.
