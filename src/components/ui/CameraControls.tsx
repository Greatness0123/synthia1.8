import { useWorldStore } from '@/store/worldStore'
import type { CameraMode } from '@/types'

const modes: { key: CameraMode; label: string }[] = [
  { key: 'third_person', label: '3RD' },
  { key: 'first_person', label: '1ST' },
  { key: 'model_input', label: '2ND' },
]

export default function CameraControls() {
  const { cameraMode, setCameraMode } = useWorldStore()

  return (
    <div className="absolute top-4 right-4 z-50">
      <div className="glass-panel flex">
        {modes.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setCameraMode(key)}
            className={`px-3 py-1.5 text-xs font-mono font-semibold tracking-wider transition-all
              ${cameraMode === key
                ? 'bg-synthia-primary/30 text-synthia-primary'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
