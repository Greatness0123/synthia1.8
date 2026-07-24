import { useUIStore } from '@/store/uiStore'

export default function ExportModal() {
  const { exportModalOpen, setExportModalOpen, exportProgress } = useUIStore()

  if (!exportModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-panel w-96 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Export Dataset</h2>
          <button onClick={() => setExportModalOpen(false)} className="text-gray-500 hover:text-white text-sm">✕</button>
        </div>
        <div className="space-y-3">
          <p className="text-xs text-gray-500 italic">Dataset export — coming in Phase 6</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Progress</span>
            <span className="font-mono">{exportProgress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden">
            <div className="h-full bg-synthia-primary rounded-full transition-all" style={{ width: `${exportProgress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
