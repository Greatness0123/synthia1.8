import { create } from 'zustand'
import type { WorldObject, BodyType, BodyMode, CameraMode, LightState } from '@/types'

interface WorldState {
  objects: WorldObject[]
  gravity: number
  globalFriction: number
  bodyType: BodyType
  bodyMode: BodyMode
  spawnPoint: [number, number, number]
  cameraMode: CameraMode
  godModeOpen: boolean
  simplifiedSkeleton: boolean
  showDebugJoints: boolean
  sessionName: string
  lightState: LightState
  dayNightCycleMs: number
  showFloor: boolean
  floorColor: string
  skyColor: string
  showGrid: boolean
  showAICameraHelper: boolean
  showAIPiP: boolean
  showCapsuleDebug: boolean
  movementSmoothing: number
  useMultiBodyPD: boolean
  useProcedural: boolean
  lastAIFrameForDisplay: string | null
  useMuJoCo: boolean
}

interface WorldActions {
  setUseMultiBodyPD: (enable: boolean) => void
  setUseProcedural: (enable: boolean) => void
  setGravity: (gravity: number) => void
  setGlobalFriction: (friction: number) => void
  setBodyType: (type: BodyType) => void
  setBodyMode: (mode: BodyMode) => void
  setSimplifiedSkeleton: (simplified: boolean) => void
  setShowDebugJoints: (show: boolean) => void
  setCameraMode: (mode: CameraMode) => void
  setGodModeOpen: (open: boolean) => void
  setLightState: (state: LightState) => void
  setDayNightCycleMs: (ms: number) => void
  setShowFloor: (show: boolean) => void
  setFloorColor: (color: string) => void
  setSkyColor: (color: string) => void
  setShowGrid: (show: boolean) => void
  setShowAICameraHelper: (show: boolean) => void
  setShowCapsuleDebug: (show: boolean) => void
  setShowAIPiP: (show: boolean) => void
  setMovementSmoothing: (speed: number) => void
  setLastAIFrameForDisplay: (frame: string | null) => void
  setUseMuJoCo: (enable: boolean) => void
  addObject: (obj: WorldObject) => void
  removeObject: (id: string) => void
  saveSession: () => void
  loadSession: () => void
}

const STORAGE_KEY = 'synthia_world_session'

const defaultState: WorldState = {
  objects: [],
  gravity: -9.81,
  globalFriction: 0.5,
  bodyType: 'humanoid',
  bodyMode: 'rigid',
  spawnPoint: [0, 0, 0],
  cameraMode: 'third_person',
  godModeOpen: false,
  simplifiedSkeleton: false,
  showDebugJoints: false,
  sessionName: '',
  lightState: 'day',
  dayNightCycleMs: 60000,
  showFloor: true,
  floorColor: '#333333',
  skyColor: '#1a1a2e',
  showGrid: true,
  showAICameraHelper: false,
  showAIPiP: false,
  showCapsuleDebug: false,
  movementSmoothing: 0.5,
  useMultiBodyPD: false,
  useProcedural: false,
  lastAIFrameForDisplay: null,
  useMuJoCo: true,
}

type WorldStore = WorldState & WorldActions

export const useWorldStore = create<WorldStore>((set, get) => ({
  ...defaultState,

  setUseMultiBodyPD: (enable) => set({ useMultiBodyPD: enable }),
  setUseProcedural: (enable) => set({ useProcedural: enable }),
  setGravity: (gravity) => set({ gravity }),
  setGlobalFriction: (friction) => set({ globalFriction: friction }),
  setBodyType: (type) => set({ bodyType: type }),
  setBodyMode: (mode) => set({ bodyMode: mode }),
  setSimplifiedSkeleton: (simplified) => set({ simplifiedSkeleton: simplified }),
  setShowDebugJoints: (show) => set({ showDebugJoints: show }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setGodModeOpen: (open) => set({ godModeOpen: open }),
  setLightState: (state) => set({ lightState: state }),
  setDayNightCycleMs: (ms) => set({ dayNightCycleMs: ms }),
  setShowFloor: (show) => set({ showFloor: show }),
  setFloorColor: (color) => set({ floorColor: color }),
  setSkyColor: (color) => set({ skyColor: color }),
  setShowGrid: (show) => set({ showGrid: show }),
  setShowAICameraHelper: (show) => set({ showAICameraHelper: show }),
  setShowCapsuleDebug: (show) => set({ showCapsuleDebug: show }),
  setShowAIPiP: (show) => set({ showAIPiP: show }),
  setMovementSmoothing: (speed) => set({ movementSmoothing: speed }),
  setLastAIFrameForDisplay: (frame) => set({ lastAIFrameForDisplay: frame }),
  setUseMuJoCo: (enable) => set({ useMuJoCo: enable }),

  addObject: (obj) => set((state) => ({ objects: [...state.objects, obj] })),
  removeObject: (id) => set((state) => ({ objects: state.objects.filter((o) => o.id !== id) })),

  saveSession: () => {
    const { objects, gravity, globalFriction, bodyType, bodyMode, spawnPoint,
            cameraMode, simplifiedSkeleton, showDebugJoints, lightState, dayNightCycleMs,
            showFloor, floorColor, skyColor, showGrid, showAICameraHelper,
            showCapsuleDebug, movementSmoothing, useMultiBodyPD, useProcedural } = get()
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        objects, gravity, globalFriction, bodyType, bodyMode, spawnPoint,
        cameraMode, simplifiedSkeleton, showDebugJoints, lightState, dayNightCycleMs,
        showFloor, floorColor, skyColor, showGrid, showAICameraHelper,
        showCapsuleDebug, movementSmoothing, useMultiBodyPD, useProcedural,
      }))
    } catch { /* storage unavailable */ }
  },

  loadSession: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<WorldState>
        set(parsed)
      }
    } catch { /* storage unavailable */ }
  },
}))
