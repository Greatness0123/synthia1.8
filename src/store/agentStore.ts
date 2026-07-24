import { create } from 'zustand'
import type { Thought, Memory, DirectiveMode, AgentStatus } from '@/types'

interface AgentState {
  thoughts: Thought[]
  memories: Memory[]
  skills: string[]
  currentRung: number
  currentGoal: string | null
  directiveMode: DirectiveMode
  heartbeat: number
  status: AgentStatus
  pendingInjection: string | null
  currentThought: string
  rehydrationSummary: string
  hasRehydrated: boolean
  masteredSkills: string[]
  injectionQueue: string[]
  injectionQueueCount: number
}

interface AgentActions {
  addThought: (thought: Thought) => void
  addMemory: (memory: Memory) => void
  setDirectiveMode: (mode: DirectiveMode) => void
  setCurrentGoal: (goal: string | null) => void
  setPendingInjection: (text: string | null) => void
  setStatus: (status: AgentStatus) => void
  setCurrentThought: (text: string) => void
  appendThoughtToken: (token: string) => void
  setRehydrationSummary: (text: string) => void
  appendRehydrationToken: (token: string) => void
  setHasRehydrated: (val: boolean) => void
  addMasteredSkill: (skill: string) => void
  setInjectionQueue: (queue: string[]) => void
  setInjectionQueueCount: (count: number) => void
  incrementInjectionQueueCount: () => void
  decrementInjectionQueueCount: () => void
  setRung: (rung: number) => void
  incrementHeartbeat: () => void
  setHeartbeat: (hb: number) => void
}

export const useAgentStore = create<AgentState & AgentActions>((set) => ({
  thoughts: [],
  memories: [],
  skills: [],
  currentRung: 0,
  currentGoal: null,
  directiveMode: 'free_will',
  heartbeat: 0,
  status: 'idle',
  pendingInjection: null,
  currentThought: '',
  rehydrationSummary: '',
  hasRehydrated: false,
  masteredSkills: [],
  injectionQueue: [],
  injectionQueueCount: 0,

  addThought: (thought) => set((s) => ({ thoughts: [...s.thoughts, thought] })),
  addMemory: (memory) => set((s) => ({ memories: [...s.memories, memory] })),
  setDirectiveMode: (mode) => set({ directiveMode: mode }),
  setCurrentGoal: (goal) => set({ currentGoal: goal }),
  setPendingInjection: (text) => set({ pendingInjection: text }),
  setStatus: (status) => set({ status }),
  setCurrentThought: (text) => set({ currentThought: text }),
  appendThoughtToken: (token) => set((s) => ({ currentThought: s.currentThought + token })),
  setRehydrationSummary: (text) => set({ rehydrationSummary: text }),
  appendRehydrationToken: (token) => set((s) => ({ rehydrationSummary: s.rehydrationSummary + token })),
  setHasRehydrated: (val) => set({ hasRehydrated: val }),
  addMasteredSkill: (skill) => set((s) => ({ masteredSkills: [...s.masteredSkills, skill] })),
  setInjectionQueue: (queue) => set({ injectionQueue: queue }),
  setInjectionQueueCount: (count) => set({ injectionQueueCount: count }),
  incrementInjectionQueueCount: () => set((s) => ({ injectionQueueCount: s.injectionQueueCount + 1 })),
  decrementInjectionQueueCount: () => set((s) => ({ injectionQueueCount: Math.max(0, s.injectionQueueCount - 1) })),
  setRung: (rung) => set({ currentRung: rung }),
  incrementHeartbeat: () => set((s) => ({ heartbeat: s.heartbeat + 1 })),
  setHeartbeat: (hb) => set({ heartbeat: hb }),
}))
