import { useWorldStore } from '@/store/worldStore'

export default function ModelInputPiP() {
  const { showAIPiP, lastAIFrameForDisplay } = useWorldStore()

  if (!showAIPiP) return null

  return (
    <div className="absolute bottom-20 right-4 z-40 glass-panel overflow-hidden" style={{ width: 224, height: 224 }}>
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        {lastAIFrameForDisplay ? (
          <img src={lastAIFrameForDisplay} alt="AI POV" className="w-full h-full object-cover" />
        ) : (
          <span className="text-[10px] text-gray-600 font-mono">AI PiP — coming in Phase 2</span>
        )}
      </div>
    </div>
  )
}
