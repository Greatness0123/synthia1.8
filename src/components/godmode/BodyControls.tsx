export default function BodyControls() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 italic">Body controls — coming in Phase 2</p>
      <PlaceholderToggle label="Simplified Skeleton" />
      <PlaceholderToggle label="Debug Joints" />
      <PlaceholderToggle label="Capsule Debug" />
      <PlaceholderToggle label="Multi-Body PD" />
      <PlaceholderToggle label="Procedural Model" />
    </div>
  )
}

function PlaceholderToggle({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">{label}</span>
      <div className="w-8 h-4 rounded-full bg-gray-700 border border-glass-border" />
    </div>
  )
}
