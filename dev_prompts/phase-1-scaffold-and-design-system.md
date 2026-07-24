# SYNTHIA Rebuild — Phase 1: Project Scaffold & Design System

**Read first:** `00_MASTER_BUILD_PLAN.md` (non-negotiable corrections list) and `jules_prompts.md`'s
Phase 1 section for the original design-system reference (typography, colour tokens, glassmorphism
panel styling, icon set, toast system) — that part of the original plan is unchanged and still
correct; reuse it directly rather than redesigning.

## Objective

Stand up the project skeleton: tooling, state management shape, and the visual shell — with **no
physics, no AI loop, no WebGL viewport content yet**. This phase produces an app that runs, looks
right, and has empty panels waiting for later phases to fill in.

## Tasks

1. Initialize React + TypeScript + Vite. Install: `@phosphor-icons/react`, `framer-motion`,
   `idb-keyval`, `tone`, `three`. Dev dependencies: `typescript`, `eslint`, `tailwindcss` + PostCSS.
2. Configure `tsconfig.json` for combined client/node environments; set up Jest.
3. Configure Tailwind for glassmorphism styling and dark/light theme classes, per
   `01_UI_UX_AND_STATE.md`'s design tokens.
4. Build `AppShell.tsx` — the primary layout container, overflow-hidden to isolate mouse captures
   for draggable panels.
5. Set up Zustand stores as empty shells with correct shape, no logic yet: `useWorldStore`,
   `useUIStore`, `useAgentStore`, `useConnectionStore`. Pull exact state shape from
   `01_UI_UX_AND_STATE.md` — don't invent fields; that document is the source of truth for what
   each store holds.
6. Build the draggable panel wrapper component using `framer-motion`.
7. Build the HUD tab shells (Physics, Body, Directives, Connections) and the Agent diagnostics
   sidebar shells (Thoughts, Memories, Skeletal Nodes, Logs) — structurally present, populated with
   placeholder/empty states only. Real data wiring happens in later phases as each subsystem comes
   online.

## Explicit Non-Goals for This Phase

- No WebGL rendering, no Three.js scene content
- No MuJoCo, no physics of any kind
- No AI/coordinator logic
- No Supabase connection

Resist the urge to wire any of this early "to save time later" — each of these has its own phase
with corrections that need to land in a controlled way, and pre-wiring them here risks having to
partially undo work once Phase 2+'s coordinate/physics corrections are in place.

## Completion Checklist

- [ ] App builds and runs with zero console errors
- [ ] All four Zustand stores exist with correct shape (verified against `01_UI_UX_AND_STATE.md`)
- [ ] Draggable HUD panels render, drag correctly, and persist position across a reload if that's
      specified in the UI doc
- [ ] Design system (colours, type, glassmorphism, icons, toasts) visually matches the reference

## Before Ending This Phase

Write `PHASE_1_COMPLETE.md`: what was built, any deviations from `01_UI_UX_AND_STATE.md` and why,
and exact instructions for a fresh session to begin Phase 2 with zero prior context.
