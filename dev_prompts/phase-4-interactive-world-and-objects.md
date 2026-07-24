# SYNTHIA Rebuild — Phase 4: Interactive World — Objects, Terrain, Audio

**Read first:** `PHASE_3_COMPLETE.md`, `02_FILE_MANIFEST_AND_FUNCTIONS.md` for `ObjectManager.ts`
and `AudioEngine.ts` responsibilities, `04_MIGRATION_PROMPTS_AND_SPECS.md` Lessons 3, 6, and 10.

## Objective

Give the world spawnable objects, custom mesh upload, terrain, and the piano/audio interaction
system — all without the recompilation stutter the previous build hit, and without breaking the
humanoid's stability from Phase 3.

## Tasks

1. **Pre-allocated slot pool.** 20 empty slot bodies (`env_slot_0`–`env_slot_19`) baked into the
   base MJCF from world init. Each slot has 4 deactivated sibling geoms (sphere, box, cylinder,
   capsule) at minimal size. Spawning a primitive claims an empty slot and activates the matching
   geom — no XML recompilation for ordinary spawns (Lesson 10).
2. **Terrain & custom mesh upload.** Reserved for actual XML recompilation, since arbitrary
   vertex/index data can't be pre-allocated. On recompile: capture full current state (every active
   slot's position/velocity, humanoid `qpos`/`qvel`) before reload, rebuild the MJCF string with the
   new mesh appended, reload, then **write the captured state back into the new `mjData`** before
   resuming stepping — a reload without this step silently resets everything else in the scene, not
   just adds the new object.
3. **`ObjectManager.ts`.** Manages spawned shapes and custom uploads, IndexedDB-backed persistence
   for the scene's object list across sessions.
4. **Collision bitmask.** Objects get their own `contype`/`conaffinity` consistent with the scheme
   documented in Phase 2 — collide with the floor and the humanoid, and with each other, but confirm
   this explicitly rather than assuming it falls out of the existing bitmask.
5. **88-key piano.** Individual sensor geoms per key (pre-allocated in the base MJCF, deactivated
   until spawned, same pooling principle as step 1 but as one dedicated body rather than 20 generic
   slots). Contact listeners map key-press collisions to polyphonic synthesis triggers.
6. **`AudioEngine.ts`.** Built on `tone`. Polyphonic voice allocation for piano keys, plus whatever
   general world sound-event system `02_FILE_MANIFEST_AND_FUNCTIONS.md` specifies.
7. **Heap safety.** Any array pointers touched during a model reload (step 2) go through the getter-
   wrapper pattern from Phase 2 — reloads are exactly when stale heap references cause silent
   corruption (Lesson 3).

## Test Before Calling This Phase Done

- Spawn 15+ primitive objects rapidly — confirm no frame drop/stutter (pool claim, not
  recompilation).
- Upload a custom mesh mid-session with the humanoid standing and several primitives already
  spawned — confirm after reload, the humanoid is still standing (not reset to spawn pose) and all
  previously spawned primitives are still present and in their pre-reload positions.
- Play several piano keys in quick succession — confirm correct polyphonic audio, no dropped notes,
  no audio/visual desync.
- Spawn a second custom mesh after the first — confirm the first one is still present (this is the
  specific accumulation bug from the previous build: capturing "base" XML once and never updating
  it silently drops earlier custom spawns on the next reload).

## Completion Checklist

- [ ] Rapid multi-object spawn shows no stutter
- [ ] Custom mesh upload preserves humanoid + all existing object state
- [ ] Sequential custom mesh uploads accumulate correctly, none silently dropped
- [ ] Piano plays correctly under rapid multi-key input

## Before Ending This Phase

Write `PHASE_4_COMPLETE.md`: pool sizing decisions, any deviations, and instructions for Phase 5 to
begin with zero prior context.
