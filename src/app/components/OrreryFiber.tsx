// components/SolarSystem.tsx
'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { CelestialBody } from '../model/CelestialBody';
import CelestialBodyComponent from './CelestialBodyComponents';
import CameraFollow from './CameraFollow';
import SpaceBackground from './SpaceBackground';
import Earth from './bodies/Earth';
import EarthOrbit from './orbits/EarthOrbit';
import Mars from './bodies/Mars';
import MarsOrbit from './orbits/MarsOrbit';
import Moon from './bodies/Moon';
import Sun from './bodies/Sun';
import useSettingsStore from '@/stores/useSettingsStore';
import Mercury from './bodies/Mercury';
import MercuryOrbit from './orbits/MercuryOrbit';
import Venus from './bodies/Venus';
import VenusOrbit from './orbits/VenusOrbit';
import Jupiter from './bodies/Jupiter';
import JupiterOrbit from './orbits/JupiterOrbit';
import Neptune from './bodies/Neptune';
import NeptuneOrbit from './orbits/NeptuneOrbit';
import Saturn from './bodies/Saturn';
import SaturnOrbit from './orbits/SaturnOrbit';
import Uranus from './bodies/Uranus';
import UranusOrbit from './orbits/UranusOrbit';

interface OrreryFiberProps {
  className?: string; // Optional className prop
}

const OrreryFiber: React.FC<OrreryFiberProps> = ({ className }) => {
  const initialCameraPosition = new THREE.Vector3(0, 0, 100);
  const [focusedObject, setFocusedObject] = useState<THREE.Mesh | null>(null);
  
  // camera ref
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const setCameraRef = useSettingsStore((state) => state.setCameraRef);
  
  useEffect(() => {
    if (cameraRef.current) {
      setCameraRef(cameraRef);
    }
  }, [setCameraRef]);
  
  // Reset camera to initial position
  const resetCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.position.copy(initialCameraPosition);
      cameraRef.current.lookAt(new THREE.Vector3(0, 0, 0)); // Reset look direction
    }
    setFocusedObject(null); // Clear focused object
  };
  
  return (
      <Canvas 
        camera={{ position: initialCameraPosition.toArray(), fov: 75, near: 0.1, far: 100000 }}
        gl={{ alpha: false }}
        style={{ width: '100vw', height: '100vh'}}
        onCreated={({ gl, camera }) => {
          gl.setClearColor('#000');
          camera.lookAt(new THREE.Vector3(0, 0, 0)); // Look away from the Sun
        }}
        onPointerMissed={() => setFocusedObject(null)}
      >
      <ambientLight intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={1} />
      
      <Suspense fallback={null}>
        <SpaceBackground />
      </Suspense>
      
      <Sun />
      <Mercury onClick={(mesh) => setFocusedObject(mesh)} />
      <Venus onClick={(mesh) => setFocusedObject(mesh)} />
      <Earth onClick={(mesh) => setFocusedObject(mesh)} />
      <Moon />
      <Jupiter onClick={(mesh) => setFocusedObject(mesh)} />
      <Mars onClick={(mesh) => setFocusedObject(mesh)}/>
      <Neptune onClick={(mesh) => setFocusedObject(mesh)} />
      <Saturn onClick={(mesh) => setFocusedObject(mesh)} />
      <Uranus onClick={(mesh) => setFocusedObject(mesh)} />
      
      <MercuryOrbit />
      <VenusOrbit />
      <EarthOrbit />
      <MarsOrbit />   
      <JupiterOrbit />
      <NeptuneOrbit />
      <SaturnOrbit />
      <UranusOrbit />
      
      {focusedObject && (
        <CameraFollow
          focusedObject={focusedObject}
          // onLostFocus={() => setFocusedObject(null)}
        />
      )}

      {/* Controls */}
      <OrbitControls target={[50, 0, 0]} />

    </Canvas>
  );
};

export default OrreryFiber;
