# SYNTHIA V2 — Phase 14: Admin Panel, Custom Model Upload & External Agent Integration

**Read first:** `PHASE_13_COMPLETE.md`, `v2_hosted_platform_spec.md` (admin, custom upload, and
external integration sections).

## Objective

Per section 14 items 9–10, the final, lowest-priority-relative-to-core-platform items: a full admin
panel, custom model upload for agent bodies, and external agent integration. This phase is
explicitly last because everything above it is the platform actually functioning — this phase is
operational tooling and advanced extensibility on top of a working platform.

## Tasks

1. **Admin panel.** Full version of the "sleep all" control from Phase 12, plus whatever additional
   admin surface `v2_hosted_platform_spec.md` specifies — likely capacity monitoring, per-user
   oversight, and the optional FDW-based cross-shard querying convenience noted as admin-only in
   Phase 13.
2. **Custom model upload.** Extend the Phase 8 agent-creation flow (preset-only at that stage)
   to allow custom body/mesh upload — reuse the V1 Phase 2 MJCF-generation pipeline and Phase 4's
   custom-mesh-upload-with-state-rehydration pattern, now in the multi-agent server context rather
   than single-client.
3. **External agent integration.** Whatever `v2_hosted_platform_spec.md` specifies for allowing
   agents/models not run through this platform's own provider adapters to participate — likely an
   API surface for external inference sources to plug into the same action-normalization pipeline
   from V1 Phase 5.

## Test Before Calling This Phase Done

- Admin panel functions correctly across all its controls, including cross-shard visibility if FDW
  is implemented.
- A user uploads a custom body mesh, it correctly generates a valid MJCF humanoid via the reused
  Phase 2 pipeline, and spawns correctly into the shared multi-agent world without destabilizing
  other agents already present.
- External agent integration tested against at least one real external source, confirming it flows
  correctly through the same normalization/validation pipeline as internal providers — no bypass of
  the safety/validation logic built in earlier phases.

## Completion Checklist

- [ ] Admin panel fully functional
- [ ] Custom model upload working in the multi-agent context, confirmed stable alongside existing
      agents
- [ ] External agent integration tested end-to-end, confirmed routed through existing validation

## Before Ending This Phase

Write `PHASE_14_COMPLETE.md`. This is the final phase in this build plan — this document should
also serve as the overall project completion record: confirm every phase 1–14's completion doc is
present and accounted for, and note any remaining known issues or deferred work (including the
still-deferred `project_info__43.md` balance system, if it remains unimplemented) for whoever picks
up the project next.
