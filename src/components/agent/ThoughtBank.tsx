import { useAgentStore } from '@/store/agentStore'

export default function ThoughtBank() {
  const { thoughts, currentThought } = useAgentStore()

  return (
    <div className="space-y-2">
      {currentThought && (
        <div className="text-xs text-gray-300 italic bg-glass-light rounded-lg p-2">
          {currentThought}
        </div>
      )}
      {thoughts.length === 0 && !currentThought && (
        <p className="text-xs text-gray-500 italic">No thoughts yet — coming in Phase 5</p>
      )}
      {thoughts.slice(-10).reverse().map((t) => (
        <div key={t.id} className="text-xs text-gray-400 border-l-2 border-glass-border pl-2">
          [{t.heartbeat}] {t.text}
        </div>
      ))}
    </div>
  )
}
