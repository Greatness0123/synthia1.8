import { useAgentStore } from '@/store/agentStore'
import { useUIStore } from '@/store/uiStore'

export default function RehydrationModal() {
  const { rehydrationModalOpen, setRehydrationModalOpen } = useUIStore()
  const { rehydrationSummary, hasRehydrated } = useAgentStore()

  if (!rehydrationModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="glass-panel w-96 p-5 space-y-4">
        <h2 className="text-sm font-semibold">Rehydrating</h2>
        {rehydrationSummary && (
          <p className="text-xs text-gray-400">{rehydrationSummary}</p>
        )}
        {hasRehydrated && (
          <button
            onClick={() => setRehydrationModalOpen(false)}
            className="glass-button w-full text-center"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
