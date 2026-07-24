export default function DirectivePanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 italic">Directive controls — coming in Phase 5</p>
      <PlaceholderToggle label="Training Mode" />
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Current Goal</span>
        <span className="text-xs font-mono text-gray-600">—</span>
      </div>
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
