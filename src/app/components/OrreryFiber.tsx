// components/SolarSystem.tsx
'use client'

import React, { Suspense, useRef, useState } from 'react';
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

interface OrreryFiberProps {
  className?: string; // Optional className prop
}

const OrreryFiber: React.FC<OrreryFiberProps> = ({ className }) => {
  const initialCameraPosition = new THREE.Vector3(0, 0, 100); // Initial camera position
  const [focusedObject, setFocusedObject] = useState<THREE.Mesh | null>(null); // Currently focused object
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
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
        camera={{ position: initialCameraPosition.toArray(), fov: 75, near: 0.1, far: 5000 }}
        // camera={{ position: initialCameraPosition.toArray(), fov: 75 }}
        gl={{ alpha: false }}
        style={{ width: '100vw', height: '100vh'}}
        onCreated={({ gl, camera }) => {
          gl.setClearColor('#000'); // Set the background color here
          camera.lookAt(new THREE.Vector3(50, 0, 0)); // Look away from the Sun
        }}
        onPointerMissed={() => setFocusedObject(null)}
      >

      <ambientLight intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={1} />

      {/* Background */}
      <Suspense fallback={null}>
        <SpaceBackground />
      </Suspense>

      {/* Camera Follow Component */}
      {/* {selectedBodyRef && <CameraFollow targetRef={selectedBodyRef} />} */}
      
      
      <Sun />
      <Earth onClick={(mesh) => setFocusedObject(mesh)} />
      <Moon />
      <Mars />
      
      <EarthOrbit />
      <MarsOrbit />   

      {/* Stars background */}
      <Stars
        radius={300}  // Radius of star field
        depth={100}    // Star field depth
        count={5000}  // Number of stars
        factor={7}    // Star size factor
        saturation={0} // Stars' color saturation
        fade          // Smooth fade to the edges of the canvas
      />
      
      {focusedObject && (
        <CameraFollow
          focusedObject={focusedObject}
          // onLostFocus={() => setFocusedObject(null)}
        />
      )}

      {/* Controls */}
      <OrbitControls target={[50, 0, 0]} />
      {/* <OrbitControls enabled={!focusedObject} target={[50, 0, 0]} /> */}

    </Canvas>
  );
};

export default OrreryFiber;
