// ============================================================
// Core Type Definitions for Synthia
// ============================================================

// --- World Types ---
export interface WorldObject {
  id: string
  type: 'box' | 'sphere' | 'cylinder' | 'capsule' | 'custom'
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  mass: number
  isCustom?: boolean
  meshUrl?: string
}

export type BodyType = 'humanoid'
export type BodyMode = 'rigid' | 'ragdoll'
export type CameraMode = 'third_person' | 'first_person' | 'model_input'
export type LightState = 'day' | 'night'

// --- UI Types ---
export type RightPanelTab = 'thoughts' | 'memories' | 'structure' | 'logs'
export type Theme = 'dark' | 'light'

// --- Agent Types ---
export interface Thought {
  id: string
  text: string
  heartbeat: number
  injected: boolean
  timestamp: number
}

export interface Memory {
  id: string
  heartbeat: number
  tier: number
  summary: string
  actions: string
  reward: number
  goal: string
  timestamp: number
}

export type DirectiveMode = 'free_will' | 'training'
export type AgentStatus = 'idle' | 'walking' | 'falling' | 'thinking' | 'sleeping'

// --- Connection Types ---
export type ProviderType = 'kaggle' | 'gemini' | 'groq' | 'openai' | 'anthropic'
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error'

export interface ConnectionMetrics {
  rtt: number
  inferenceTime: number
  frameSize: number
  fps: number
  heartbeat: number
}
