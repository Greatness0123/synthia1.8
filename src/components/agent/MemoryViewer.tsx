import { useAgentStore } from '@/store/agentStore'

export default function MemoryViewer() {
  const { memories } = useAgentStore()

  if (memories.length === 0) {
    return <p className="text-xs text-gray-500 italic">No memories yet — coming in Phase 5</p>
  }

  return (
    <div className="space-y-2">
      {memories.slice(-10).reverse().map((m) => (
        <div key={m.id} className="text-xs bg-glass-light rounded-lg p-2 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-500">#{m.heartbeat}</span>
            {m.reward > 0 && (
              <span className="text-[10px] font-mono text-green-400">+{m.reward.toFixed(1)}</span>
            )}
          </div>
          <p className="text-gray-300">{m.summary}</p>
        </div>
      ))}
    </div>
  )
}
