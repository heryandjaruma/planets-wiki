// src/stores/useSettingsStore.ts
import { create } from 'zustand';
import * as THREE from 'three';

interface SettingsState {
  scalingFactor: number;
  setScalingFactor: (factor: number) => void;
  
  advanceSeconds: number;
  setAdvanceSeconds: (seconds: number) => void;
  
  earthRef: React.RefObject<THREE.Mesh> | null;
  setEarthRef: (ref: React.RefObject<THREE.Mesh>) => void;
}

// Using Zustand's create function to create the store
const useSettingsStore = create<SettingsState>((set) => ({
  scalingFactor: 100, // Default value
  setScalingFactor: (factor: number) => set(() => ({ scalingFactor: factor })),
  
  advanceSeconds: 86400,
  setAdvanceSeconds: (seconds: number) => set(() => ({ advanceSeconds: seconds})),
  
  earthRef: null, // Initially, the Earth reference is null
  setEarthRef: (ref) => set({ earthRef: ref }),
  
}));

export default useSettingsStore;
