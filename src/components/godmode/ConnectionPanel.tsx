import { useConnectionStore } from '@/store/connectionStore'

export default function ConnectionPanel() {
  const { endpoint, status } = useConnectionStore()

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 italic">Connection config — coming in Phase 5</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Endpoint</span>
        <span className="text-xs font-mono text-gray-500 truncate max-w-[160px]">{endpoint}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Status</span>
        <span className={`text-xs font-mono ${
          status === 'connected' ? 'text-green-400' :
          status === 'error' ? 'text-red-400' : 'text-gray-500'
        }`}>{status}</span>
      </div>
    </div>
  )
}
