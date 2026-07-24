export default function LogViewer() {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-500 italic">System logs — coming in Phase 5</p>
      <div className="text-xs font-mono text-gray-600 space-y-1 mt-2">
        <LogEntry level="info" message="Phase 1 scaffold complete" />
        <LogEntry level="info" message="Awaiting Phase 2: MuJoCo humanoid" />
      </div>
    </div>
  )
}

function LogEntry({ level, message }: { level: 'info' | 'warn' | 'error'; message: string }) {
  const colors = {
    info: 'text-blue-400',
    warn: 'text-yellow-400',
    error: 'text-red-400',
  }
  const prefixes = { info: 'ℹ', warn: '⚠', error: '✕' }
  return (
    <div className="flex items-start gap-2">
      <span className={colors[level]}>{prefixes[level]}</span>
      <span className="text-gray-500">{message}</span>
    </div>
  )
}
