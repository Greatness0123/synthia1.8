import { useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import WorldViewport from '@/components/world/WorldViewport'
import StatusBar from '@/components/layout/StatusBar'
import LogoPill from '@/components/ui/LogoPill'
import ThemeToggle from '@/components/ui/ThemeToggle'
import CameraControls from '@/components/ui/CameraControls'
import GodModePanel from '@/components/godmode/GodModePanel'
import AgentBrainPanel from '@/components/agent/AgentBrainPanel'
import ModelInputPiP from '@/components/world/ModelInputPiP'
import PianoReward from '@/components/world/PianoReward'
import ExportModal from '@/components/export/ExportModal'
import RehydrationModal from '@/components/ui/RehydrationModal'
import { useWorldStore } from '@/store/worldStore'
import { useUIStore } from '@/store/uiStore'
import { useAgentStore } from '@/store/agentStore'

export default function App() {
  const { godModeOpen, setGodModeOpen, loadSession } = useWorldStore()
  const { rightPanelOpen, setRightPanelOpen } = useUIStore()
  const { heartbeat } = useAgentStore()

  useEffect(() => {
    loadSession()
  }, [])

  // Sync theme class
  const theme = useUIStore((s) => s.theme)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <AppShell>
      <WorldViewport />

      {/* Top-left controls */}
      <LogoPill />
      <ThemeToggle />

      {/* Top-right controls */}
      <CameraControls />

      {/* Toggle buttons */}
      <div className="absolute top-16 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setGodModeOpen(!godModeOpen)}
          className={`glass-panel px-3 py-1.5 text-[10px] font-semibold tracking-wider transition-all
            ${godModeOpen ? 'bg-synthia-primary/20 text-synthia-primary' : 'text-gray-400 hover:text-white'}`}
        >
          GOD
        </button>
        <button
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          className={`glass-panel px-3 py-1.5 text-[10px] font-semibold tracking-wider transition-all
            ${rightPanelOpen ? 'bg-synthia-primary/20 text-synthia-primary' : 'text-gray-400 hover:text-white'}`}
        >
          BRAIN
        </button>
      </div>

      {/* Floating panels */}
      <GodModePanel />
      <AgentBrainPanel />

      {/* Overlays */}
      <ModelInputPiP />
      <PianoReward />

      {/* Status bar */}
      <StatusBar />

      {/* Modals */}
      <ExportModal />
      <RehydrationModal />
    </AppShell>
  )
}
