import { useUIStore } from '@/store/uiStore'
import DraggablePanel from '@/components/ui/DraggablePanel'
import ThoughtBank from './ThoughtBank'
import MemoryViewer from './MemoryViewer'
import StructureViewer from './StructureViewer'
import LogViewer from './LogViewer'
import type { RightPanelTab } from '@/types'

const tabs: { key: RightPanelTab; label: string }[] = [
  { key: 'thoughts', label: 'Thoughts' },
  { key: 'memories', label: 'Memories' },
  { key: 'structure', label: 'Structure' },
  { key: 'logs', label: 'Logs' },
]

const tabComponents: Record<RightPanelTab, () => JSX.Element> = {
  thoughts: ThoughtBank,
  memories: MemoryViewer,
  structure: StructureViewer,
  logs: LogViewer,
}

export default function AgentBrainPanel() {
  const { rightPanelOpen, activeRightPanelTab, setActiveRightPanelTab, setRightPanelOpen } = useUIStore()

  if (!rightPanelOpen) return null

  const ActiveComponent = tabComponents[activeRightPanelTab]

  return (
    <DraggablePanel
      title="Agent Brain"
      defaultPosition={{ x: 500, y: 80 }}
      onClose={() => setRightPanelOpen(false)}
      width="w-80"
    >
      <div className="flex gap-1 border-b border-glass-border mb-3 flex-wrap">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveRightPanelTab(key)}
            className={`px-2 py-1 text-[10px] font-semibold tracking-wider rounded-t transition-all
              ${activeRightPanelTab === key
                ? 'text-synthia-primary border-b-2 border-synthia-primary'
                : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
      <ActiveComponent />
    </DraggablePanel>
  )
}
