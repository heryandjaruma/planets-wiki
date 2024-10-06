'use client'

import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Sun = () => {
  const sunTexture = useLoader(TextureLoader, '/assets/materials/bodies/material-sun-2.jpg');

  return (
    // sun's position
    <mesh position={[0, 0, 0]}> 
      <sphereGeometry args={[10, 32, 32]} />
      <meshStandardMaterial map={sunTexture} emissiveMap={sunTexture} emissive="orange" emissiveIntensity={1} color={'#d9d2b4'} />
    </mesh>
  );
};

export default Sun
