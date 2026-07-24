export default function WorldViewport() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center bg-synthia-dark">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-2 border-synthia-primary/30 border-t-synthia-primary animate-spin mb-4 mx-auto" />
        <p className="text-sm text-gray-500 font-mono">Viewport — coming in Phase 2</p>
        <p className="text-xs text-gray-600 mt-1">MuJoCo + Three.js rendering pipeline</p>
      </div>
    </div>
  )
}
