// components/SolarSystem.tsx
'use client'

import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Sun from '../bodies/Sun';
import { CelestialBody } from '../model/CelestiaBody';
import CelestialBodyComponent from './CelestialBodyComponents';


const OrreryFiber = () => {
  
  const sun = new CelestialBody('Sun', 5, 'yellow', 0, 0, false, '/assets/materials/bodies/material-sun.jpg');
  const mercury = new CelestialBody('Mercury', 0.5, 'white', 10, 0.24, true, '/assets/materials/bodies/material-mercury.jpg');
  const venus = new CelestialBody('Venus', 0.8, 'white', 15, 0.18, true, '/assets/materials/bodies/material-venus.jpg');
  const earth = new CelestialBody('Earth', 1, 'white', 20, 0.1, true, '/assets/materials/bodies/material-earth.jpg');
  const mars = new CelestialBody('Mars', 0.6, 'white', 30, 0.08, true, '/assets/materials/bodies/material-mars.jpg');
  const jupiter = new CelestialBody('Jupiter', 3, 'white', 70, 0.05, true, '/assets/materials/bodies/material-jupiter.jpg');
  const saturn = new CelestialBody('Saturn', 0.46, 'white', 120, 0.03, true, '/assets/materials/bodies/material-saturn.jpg');
  const uranus = new CelestialBody('Uranus', 0.8, 'white', 180, 0.02, true, '/assets/materials/bodies/material-uranus.jpg');
  const neptune = new CelestialBody('Neptune', 0.19, 'white', 230, 0.01, true, '/assets/materials/bodies/material-neptune.jpg');
  
  const celestialBodies: CelestialBody[] = [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
  
  return (
    <Canvas 
    camera={{ position: [0, 50, 100], fov: 60 }}
    gl={{ alpha: false }}
    style={{ width: '100vw', height: '100vh'}}
    onCreated={({ gl }) => {
      gl.setClearColor('#021631'); // Set the background color here (black in this example)
    }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1} />
      
      {/* Background */}
      <Suspense fallback={null}>
        <SpaceBackground />
      </Suspense>
      
      {/* Sun */}
      <Sun />
      
      {/* Planets */}
      {/* <Planet name="mercury" radius={10} speed={0.24} color="gray" size={0.5} />
      <Planet name="venus" radius={15} speed={0.62} color="goldenrod" size={1.2} />
      <Planet name="earth" radius={20} speed={1} color="blue" size={1.3} />
      <Planet name="mars" radius={25} speed={1.88} color="red" size={0.7} /> */}
      {/* Add the other planets here */}
      
      {celestialBodies.map((body) => (
        <CelestialBodyComponent key={body.name} body={body} />
      ))}

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
      <OrbitControls />
    </Canvas>
  );
};

const SpaceBackground = () => {
  const texture = useLoader(THREE.TextureLoader, '/assets/bg-space.jpg');

  // Increase texture quality
  texture.anisotropy = 16; // Maximum anisotropy for better quality (use renderer.capabilities.getMaxAnisotropy())
  texture.magFilter = THREE.LinearFilter; // Use linear filtering for magnification
  texture.minFilter = THREE.LinearMipMapLinearFilter; // Use linear mipmap filtering for minification
  texture.wrapS = THREE.RepeatWrapping; // Optional: repeat wrapping for larger scenes
  texture.wrapT = THREE.RepeatWrapping;

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 60]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        color="#949494"
      />
    </mesh>
  );
};

export default OrreryFiber;
