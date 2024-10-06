// src/stores/useSettingsStore.ts
import { create } from 'zustand';
import * as THREE from 'three';

interface SettingsState {
  cameraRef: React.RefObject<THREE.PerspectiveCamera> | null;
  setCameraRef: (ref: React.RefObject<THREE.PerspectiveCamera>) => void;
  
  focusedObject: THREE.Mesh | null;
  setFocusedObject: (object: THREE.Mesh | null) => void;

  scalingFactor: number;
  setScalingFactor: (factor: number) => void;

  advanceSeconds: number;
  setAdvanceSeconds: (seconds: number) => void;
  
  // planets
  mercuryRef: React.RefObject<THREE.Mesh> | null;
  setMercuryRef: (ref: React.RefObject<THREE.Mesh>) => void;

  venusRef: React.RefObject<THREE.Mesh> | null;
  setVenusRef: (ref: React.RefObject<THREE.Mesh>) => void;

  earthRef: React.RefObject<THREE.Mesh> | null;
  setEarthRef: (ref: React.RefObject<THREE.Mesh>) => void;

  marsRef: React.RefObject<THREE.Mesh> | null;
  setMarsRef: (ref: React.RefObject<THREE.Mesh>) => void;

  jupiterRef: React.RefObject<THREE.Mesh> | null;
  setJupiterRef: (ref: React.RefObject<THREE.Mesh>) => void;

  saturnRef: React.RefObject<THREE.Mesh> | null;
  setSaturnRef: (ref: React.RefObject<THREE.Mesh>) => void;

  uranusRef: React.RefObject<THREE.Mesh> | null; // Uranus reference
  setUranusRef: (ref: React.RefObject<THREE.Mesh>) => void;

  neptuneRef: React.RefObject<THREE.Mesh> | null;
  setNeptuneRef: (ref: React.RefObject<THREE.Mesh>) => void;
  
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
  cameraRef: null,
  setCameraRef: (ref) => set({ cameraRef: ref }),

  scalingFactor: 100,
  setScalingFactor: (factor: number) => set(() => ({ scalingFactor: factor })),

  advanceSeconds: 86400,
  setAdvanceSeconds: (seconds: number) => set(() => ({ advanceSeconds: seconds })),

  mercuryRef: null,
  setMercuryRef: (ref) => set({ mercuryRef: ref }),

  venusRef: null,
  setVenusRef: (ref) => set({ venusRef: ref }),

  earthRef: null,
  setEarthRef: (ref) => set({ earthRef: ref }),

  marsRef: null,
  setMarsRef: (ref) => set({ marsRef: ref }),

  jupiterRef: null,
  setJupiterRef: (ref) => set({ jupiterRef: ref }),

  saturnRef: null,
  setSaturnRef: (ref) => set({ saturnRef: ref }),

  uranusRef: null, // Initialize Uranus reference as null
  setUranusRef: (ref) => set({ uranusRef: ref }),

  neptuneRef: null,
  setNeptuneRef: (ref) => set({ neptuneRef: ref }),
  
  focusedObject: null,
  setFocusedObject: (object) => set({ focusedObject: object }),
  
  currentStep: 1, // Initialize step to 1
  setCurrentStep: (step) => set({ currentStep: step }), // Setter for step
}));

export default useSettingsStore;
