export default function PhysicsControls() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 italic">Physics controls — coming in Phase 4</p>
      <PlaceholderSlider label="Gravity" value="-9.81" />
      <PlaceholderSlider label="Friction" value="0.5" />
      <PlaceholderColor label="Sky Color" />
      <PlaceholderColor label="Floor Color" />
    </div>
  )
}

function PlaceholderSlider({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-xs font-mono text-gray-500">{value}</span>
    </div>
  )
}

function PlaceholderColor({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">{label}</span>
      <div className="w-6 h-6 rounded bg-gray-800 border border-glass-border" />
    </div>
  )
}
