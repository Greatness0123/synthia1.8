import { useState } from 'react'
import { Gear, Clock, User, Plug } from '@phosphor-icons/react'
import DraggablePanel from '@/components/ui/DraggablePanel'
import PhysicsControls from './PhysicsControls'
import BodyControls from './BodyControls'
import DirectivePanel from './DirectivePanel'
import ConnectionPanel from './ConnectionPanel'
import { useWorldStore } from '@/store/worldStore'

const tabs = [
  { key: 'physics', label: 'Physics', icon: Gear },
  { key: 'body', label: 'Body', icon: User },
  { key: 'directives', label: 'Directives', icon: Clock },
  { key: 'connection', label: 'Connection', icon: Plug },
] as const

type TabKey = (typeof tabs)[number]['key']

const tabComponents: Record<TabKey, () => JSX.Element> = {
  physics: PhysicsControls,
  body: BodyControls,
  directives: DirectivePanel,
  connection: ConnectionPanel,
}

export default function GodModePanel() {
  const { godModeOpen, setGodModeOpen } = useWorldStore()
  const [activeTab, setActiveTab] = useState<TabKey>('physics')

  if (!godModeOpen) return null

  const ActiveComponent = tabComponents[activeTab]

  return (
    <DraggablePanel
      title="God Mode"
      defaultPosition={{ x: 20, y: 80 }}
      onClose={() => setGodModeOpen(false)}
      width="w-72"
    >
      {/* Tab bar */}
      <div className="flex border-b border-glass-border mb-3">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold tracking-wider border-b-2 transition-all
              ${activeTab === key
                ? 'border-synthia-primary text-synthia-primary'
                : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>
      <ActiveComponent />
    </DraggablePanel>
  )
}
