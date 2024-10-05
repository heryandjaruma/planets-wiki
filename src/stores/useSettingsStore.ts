// src/stores/useSettingsStore.ts
import { create } from 'zustand';

interface SettingsState {
  scalingFactor: number;
  setScalingFactor: (factor: number) => void;
  
  advanceSeconds: number;
  setAdvanceSeconds: (seconds: number) => void;
}

// Using Zustand's create function to create the store
const useSettingsStore = create<SettingsState>((set) => ({
  scalingFactor: 100, // Default value
  setScalingFactor: (factor: number) => set(() => ({ scalingFactor: factor })),
  
  advanceSeconds: 3600,
  setAdvanceSeconds: (seconds: number) => set(() => ({ advanceSeconds: seconds}))
  
}));

export default useSettingsStore;
