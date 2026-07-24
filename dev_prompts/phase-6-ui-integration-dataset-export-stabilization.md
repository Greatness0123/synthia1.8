# SYNTHIA Rebuild — Phase 6: Full UI Integration, Dataset Export & V1 Stabilization

**Read first:** `PHASE_5_COMPLETE.md`, `01_UI_UX_AND_STATE.md` in full, `technical_spec.md`'s
dataset export section.

## Objective

Wire every UI panel scaffolded in Phase 1 to real, live data from Phases 2–5. Build dataset export.
Then stabilize: this phase does not end until V1 meets the bar `v2_hosted_platform_spec.md` and
`v2_spec.md` both set as the prerequisite for starting multi-agent work.

## Tasks

1. **God Mode panel** — physics controls (gravity, etc.), object spawner (Phase 4), body controls
   (reset position, full reset, body type, training mode, goal) — live-wired, not placeholder.
2. **Agent diagnostics sidebar** — Thoughts (live streaming from Phase 5's parser), Memories (live
   from the Phase 5 memory system), Skeletal Nodes (live joint state), Logs.
3. **Camera system** — orbital third-person, agent POV, whatever modes `01_UI_UX_AND_STATE.md`
   specifies. Confirm the 448×448 offscreen POV render target from Phase 5 is correctly wired as a
   selectable camera view, not just an internal capture buffer.
4. **Injection input** — real-time user-injected thoughts flowing into the Phase 5 payload's user
   override block.
5. **Dataset export (`datasetExporter.ts`)** — package session logs into CSV and JSONL (LeRobot
   format per `v2_spec.md`'s prerequisite list), covering joint states, actions, thoughts, and
   memory writes over a session.
6. **Toast/error system** — complete, per the design system from Phase 1.

## V1 Stability Bar — Do Not Proceed to Phase 7 Until All of These Hold

This list is the literal prerequisite `v2_spec.md` and `v2_hosted_platform_spec.md` both require
before multi-agent work begins:

- [ ] Single agent runs stably for a full 9–12 hour session without crash or memory leak
- [ ] Memory system writing and retrieving correctly, verified over a long session, not just a
      short smoke test
- [ ] Motor program library has at least the first several rungs of the skill ladder demonstrably
      working (per `technical_spec.md`'s rung definitions)
- [ ] Dataset export produces valid, complete LeRobot-format output from a real session
- [ ] All error handling and the toast system complete and exercised (provider timeout, malformed
      action, connection drop, physics instability auto-reset — each deliberately triggered and
      confirmed handled gracefully)
- [ ] At minimum one complete exported dataset produced from a real long-running session — this is
      the literal, explicit gate `v2_spec.md` states

## Completion Checklist

- [ ] Every UI panel live-wired, zero placeholder data remaining
- [ ] Dataset export verified against real session output
- [ ] Full V1 Stability Bar above passed, not partially

## Before Ending This Phase

Write `PHASE_6_COMPLETE.md` — this doc doubles as the formal "V1 complete, cleared for V2" record.
Include the actual long-session test results (duration, any issues found and fixed), the exported
dataset's location/format confirmation, and explicit sign-off that every Stability Bar item passed.
Phase 7 should not begin without this document confirming a clean pass.
