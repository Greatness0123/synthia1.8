import { create } from 'zustand'
import type { RightPanelTab, Theme } from '@/types'

interface UIState {
  activeRightPanelTab: RightPanelTab
  rightPanelOpen: boolean
  theme: Theme
  exportModalOpen: boolean
  objectSpawnerOpen: boolean
  rehydrationModalOpen: boolean
  exportProgress: number
  selectedEntityId: string | null
}

interface UIActions {
  setActiveRightPanelTab: (tab: RightPanelTab) => void
  setRightPanelOpen: (open: boolean) => void
  toggleTheme: () => void
  setSelectedEntityId: (id: string | null) => void
  setExportModalOpen: (open: boolean) => void
  setObjectSpawnerOpen: (open: boolean) => void
  setRehydrationModalOpen: (open: boolean) => void
  setExportProgress: (progress: number) => void
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  activeRightPanelTab: 'thoughts',
  rightPanelOpen: false,
  theme: 'dark',
  exportModalOpen: false,
  objectSpawnerOpen: false,
  rehydrationModalOpen: false,
  exportProgress: 0,
  selectedEntityId: null,

  setActiveRightPanelTab: (tab) => set({ activeRightPanelTab: tab }),
  setRightPanelOpen: (open) => set({ rightPanelOpen: open }),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
  setSelectedEntityId: (id) => set({ selectedEntityId: id }),
  setExportModalOpen: (open) => set({ exportModalOpen: open }),
  setObjectSpawnerOpen: (open) => set({ objectSpawnerOpen: open }),
  setRehydrationModalOpen: (open) => set({ rehydrationModalOpen: open }),
  setExportProgress: (progress) => set({ exportProgress: progress }),
}))
