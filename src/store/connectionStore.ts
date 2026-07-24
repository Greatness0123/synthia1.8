import { create } from 'zustand'
import type { ProviderType, ConnectionStatus, ConnectionMetrics } from '@/types'

interface ConnectionState {
  endpoint: string
  inferenceEndpoint: string
  provider: ProviderType
  providerModel: string
  providerApiKey: string
  supabaseUrl: string
  supabaseKey: string
  status: ConnectionStatus
  metrics: ConnectionMetrics
  cycleMs: number
}

interface ConnectionActions {
  setEndpoint: (url: string) => void
  setInferenceEndpoint: (url: string) => void
  setProvider: (provider: ProviderType) => void
  setProviderModel: (model: string) => void
  setProviderApiKey: (key: string) => void
  setCycleMs: (ms: number) => void
  setSupabaseConfig: (url: string, key: string) => void
  setStatus: (status: ConnectionStatus) => void
  setMetrics: (metrics: Partial<ConnectionMetrics>) => void
}

export const useConnectionStore = create<ConnectionState & ConnectionActions>((set) => ({
  endpoint: 'ws://localhost:3001/ws',
  inferenceEndpoint: '',
  provider: 'kaggle',
  providerModel: '',
  providerApiKey: '',
  supabaseUrl: '',
  supabaseKey: '',
  status: 'disconnected',
  cycleMs: 100,
  metrics: {
    rtt: 0,
    inferenceTime: 0,
    frameSize: 0,
    fps: 0,
    heartbeat: 0,
  },

  setEndpoint: (url) => set({ endpoint: url }),
  setInferenceEndpoint: (url) => set({ inferenceEndpoint: url }),
  setProvider: (provider) => set({ provider }),
  setProviderModel: (model) => set({ providerModel: model }),
  setProviderApiKey: (key) => set({ providerApiKey: key }),
  setCycleMs: (ms) => set({ cycleMs: ms }),
  setSupabaseConfig: (url, key) => set({ supabaseUrl: url, supabaseKey: key }),
  setStatus: (status) => set({ status }),
  setMetrics: (metrics) => set((s) => ({
    metrics: { ...s.metrics, ...metrics },
  })),
}))
