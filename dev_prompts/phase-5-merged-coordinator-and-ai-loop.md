# SYNTHIA Rebuild — Phase 5: Merged Coordinator & AI Cognition Loop

**Read first:** `PHASE_4_COMPLETE.md`, `05_MODEL_PROMPTS_AND_PROVIDERS.md` in full (this is the
primary reference for this entire phase), `technical_spec.md`'s memory system and skill ladder
sections.

**Architecture change from the original build:** the coordinator was previously a separate process
communicating over WebSocket to a remote inference backend (Kaggle-hosted). **For this rebuild, the
coordinator is merged directly into the single-agent app** — no separate process, no WebSocket hop
for the core loop. Inference calls go straight from the app to the provider APIs. Keep the
WebSocket-based pattern in mind only as prior art for Phase 7+ (the multi-agent platform, which
does need a real server); it does not apply here.

## Objective

Build the full sense→think→act loop: capture the agent's sensory payload, send it to a model
provider, parse the streamed response into thoughts and structured actions, validate and normalize
those actions, and apply them to the motor controller from Phase 3.

## Tasks

1. **System prompt architecture** (`05_MODEL_PROMPTS_AND_PROVIDERS.md` §1). Self-awareness/body
   config block, joint axis map (exact signs and axes per that document — don't re-derive these,
   they're precisely specified), degree-only joint control contract, Training Mode / Free Will Mode
   directive blocks.
2. **Sensory payload assembly** (§2). System message, visual frame (448×448 base64, offscreen
   render target from the WebGL viewport), audio PCM buffer, tactile context (contact impulses
   converted to qualitative descriptions), spatial grounding summary (text backup of joint
   orientations/hip height), physical feedback block (rejected-target explanations from the
   previous frame), user override injection.
3. **Provider adapters** (§3). `GeminiProvider.ts` and `OpenAICompatProvider.ts` (generic for
   NIM/Groq/OpenRouter-style endpoints). Both implement the streaming separator parser: accumulate
   into a buffer, route to thought-stream until `---ACTION---` is seen, route to the action JSON
   buffer after — with the documented fallback (scan for `{`) if the separator is never emitted.
4. **Action normalization pipeline** (§4). JSON cleanup (strip markdown fences), memory-write block
   validation with fallbacks, action array normalization into `program_sequence` +
   `joint_overrides`, degree→radian conversion (assume degrees if magnitude exceeds `π + 0.1`),
   clamp to `[-π, +π]`, gaze target extraction and injection into `mixamorighead` overrides.
5. **Wire normalized joint overrides into `MotorController.ts`'s deviation channel** from Phase 3 —
   this is exactly the `deviation[joint]` term the additive `ctrl` equation was built for; AI
   targets should slot in with zero rework needed to the actuator math itself.
6. **Memory system** per `technical_spec.md` — writes, retrieval, whatever tiering/heartbeat
   mechanism that document specifies. This phase wires the client-side logic; the Supabase schema
   for it is `supabase/v1-single-agent-schema.sql` (build/verify that schema as part of this phase
   if not already present).
7. **Skill ladder / motor program library** per `technical_spec.md` — the Rung system referenced
   there.

## Test Before Calling This Phase Done

- Full loop runs end-to-end against at least one real provider: capture → infer → parse → normalize
  → apply, with visible thought streaming in the UI and joint targets actually reaching the motor
  controller.
- Feed a deliberately out-of-range joint target and confirm it's clamped, not applied raw, and that
  the physical feedback block correctly reports the rejection on the next cycle.
- Confirm degree/radian auto-detection works for both a clearly-degrees value (e.g. 45) and a
  clearly-radians value (e.g. 0.7) without misclassifying either.
- Kill the connection mid-stream and confirm auto-reconnect / graceful degradation, no crash.

## Completion Checklist

- [ ] Full sense-think-act loop verified working against a real provider
- [ ] Both provider adapters (Gemini, OpenAI-compatible) tested
- [ ] Action normalization handles malformed/legacy formats gracefully
- [ ] Memory writes/reads verified against the V1 Supabase schema
- [ ] AI joint targets confirmed flowing through the Phase 3 additive `ctrl` pattern correctly

## Before Ending This Phase

Write `PHASE_5_COMPLETE.md`: which providers were tested, any prompt-architecture deviations from
`05_MODEL_PROMPTS_AND_PROVIDERS.md` and why, memory system status, and instructions for Phase 6 to
begin with zero prior context.
