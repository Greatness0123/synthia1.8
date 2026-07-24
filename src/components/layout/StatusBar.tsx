import { useConnectionStore } from '@/store/connectionStore'
import { useAgentStore } from '@/store/agentStore'
import { useWorldStore } from '@/store/worldStore'

export default function StatusBar() {
  const { metrics, status } = useConnectionStore()
  const { heartbeat } = useAgentStore()
  const { lightState } = useWorldStore()

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-panel px-4 py-2 flex items-center gap-3">
        <StatusPill label="RTT" value={`${metrics.rtt.toFixed(0)}ms`} />
        <div className="w-px h-4 bg-glass-border" />
        <StatusPill label="INF" value={`${metrics.inferenceTime.toFixed(0)}ms`} />
        <div className="w-px h-4 bg-glass-border" />
        <StatusPill label="FPS" value={`${metrics.fps.toFixed(0)}`} />
        <div className="w-px h-4 bg-glass-border" />
        <StatusPill label="FRAME" value={`${metrics.frameSize.toFixed(0)}KB`} />
        <div className="w-px h-4 bg-glass-border" />
        <StatusPill label="HB" value={`#${heartbeat}`} />
        <div className="w-px h-4 bg-glass-border" />
        <StatusPill label="LIGHT" value={lightState.toUpperCase()} />
        <div className="w-px h-4 bg-glass-border" />
        <ConnectionDot status={status} />
      </div>
    </div>
  )
}

function StatusPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] font-mono font-semibold text-gray-500 tracking-wider">{label}</span>
      <span className="text-xs font-mono text-gray-200 tabular-nums">{value}</span>
    </div>
  )
}

function ConnectionDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    connected: 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]',
    connecting: 'bg-yellow-400 animate-pulse',
    error: 'bg-red-400',
    disconnected: 'bg-gray-600',
  }
  return <div className={`w-2 h-2 rounded-full ${colors[status] ?? colors.disconnected}`} />
}
