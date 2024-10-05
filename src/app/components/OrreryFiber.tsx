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

interface OrreryFiberProps {
  className?: string; // Optional className prop
}

const OrreryFiber: React.FC<OrreryFiberProps> = ({ className }) => {
  // Reference for each celestial body's mesh to track its position
  const [selectedBodyRef, setSelectedBodyRef] = useState<React.RefObject<THREE.Mesh> | null>(null);

  const sunRef = useRef<THREE.Mesh>(null);
  const mercuryRef = useRef<THREE.Mesh>(null);
  const venusRef = useRef<THREE.Mesh>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const marsRef = useRef<THREE.Mesh>(null);
  const jupiterRef = useRef<THREE.Mesh>(null);
  const saturnRef = useRef<THREE.Mesh>(null);
  const uranusRef = useRef<THREE.Mesh>(null);
  const neptuneRef = useRef<THREE.Mesh>(null);

  const sun = new CelestialBody('Sun', 5, 'yellow', 0, 0, false, '/assets/materials/bodies/material-sun-2.jpg');
  const mercury = new CelestialBody('Mercury', 0.5, 'white', 10, 0.24, true, '/assets/materials/bodies/material-mercury.jpg');
  const venus = new CelestialBody('Venus', 0.8, 'white', 15, 0.18, true, '/assets/materials/bodies/material-venus.jpg');
  const earth = new CelestialBody('Earth', 1, 'white', 20, 0.1, true, '/assets/materials/bodies/material-earth.jpg');
  const mars = new CelestialBody('Mars', 0.6, 'white', 30, 0.08, true, '/assets/materials/bodies/material-mars-2.jpg');
  const jupiter = new CelestialBody('Jupiter', 3, 'white', 70, 0.05, true, '/assets/materials/bodies/material-jupiter-2.jpg');
  const saturn = new CelestialBody('Saturn', 0.46, 'white', 120, 0.03, true, '/assets/materials/bodies/material-saturn.jpg');
  const uranus = new CelestialBody('Uranus', 0.8, 'white', 180, 0.02, true, '/assets/materials/bodies/material-uranus.jpg');
  const neptune = new CelestialBody('Neptune', 0.19, 'white', 230, 0.01, true, '/assets/materials/bodies/material-neptune.jpg');

  return (
<Canvas 
  camera={{ position: [50, 75, 100], fov: 60 }}
  gl={{ alpha: false }}
  style={{ width: '100vw', height: '100vh'}}
  onCreated={({ gl, camera }) => {
    gl.setClearColor('#000'); // Set the background color here
    camera.lookAt(new THREE.Vector3(50, 0, 0)); // Look away from the Sun
  }}
>

      <ambientLight intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={1} />

      {/* Background */}
      <Suspense fallback={null}>
        <SpaceBackground />
      </Suspense>

      {/* Camera Follow Component */}
      {selectedBodyRef && <CameraFollow targetRef={selectedBodyRef} />}

      {/* Celestial Bodies with click handlers to set the camera target */}
      <CelestialBodyComponent key={sun.name} body={sun} ref={sunRef} onClick={() => setSelectedBodyRef(sunRef)} />
      <CelestialBodyComponent key={mercury.name} body={mercury} ref={mercuryRef} onClick={() => setSelectedBodyRef(mercuryRef)} />
      <CelestialBodyComponent key={venus.name} body={venus} ref={venusRef} onClick={() => setSelectedBodyRef(venusRef)} />
      <CelestialBodyComponent key={earth.name} body={earth} ref={earthRef} onClick={() => setSelectedBodyRef(earthRef)} rotation={{ speed: 0.01, axisY: 1, axisX: 0 }} />
      <CelestialBodyComponent key={mars.name} body={mars} ref={marsRef} onClick={() => setSelectedBodyRef(marsRef)} />
      <CelestialBodyComponent key={jupiter.name} body={jupiter} ref={jupiterRef} onClick={() => setSelectedBodyRef(jupiterRef)} />
      <CelestialBodyComponent key={saturn.name} body={saturn} ref={saturnRef} onClick={() => setSelectedBodyRef(saturnRef)} />
      <CelestialBodyComponent key={uranus.name} body={uranus} ref={uranusRef} onClick={() => setSelectedBodyRef(uranusRef)} />
      <CelestialBodyComponent key={neptune.name} body={neptune} ref={neptuneRef} onClick={() => setSelectedBodyRef(neptuneRef)} />

      {/* Stars background */}
      <Stars
        radius={300}  // Radius of star field
        depth={60}    // Star field depth
        count={5000}  // Number of stars
        factor={7}    // Star size factor
        saturation={0} // Stars' color saturation
        fade          // Smooth fade to the edges of the canvas
      />

      {/* Controls */}
      <OrbitControls target={[50, 0, 0]} />
    </Canvas>
  );
};

export default OrreryFiber;
