'use client'

import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Text } from '@react-three/drei';

const Sun = () => {
  const sunTexture = useLoader(TextureLoader, '/assets/materials/bodies/material-sun-2.jpg');

  return (
    // sun's position
    <mesh position={[0, 0, 0]}> 
      <sphereGeometry args={[10, 32, 32]} />
      <meshStandardMaterial map={sunTexture} emissiveMap={sunTexture} emissive="orange" emissiveIntensity={1} color={'#d9d2b4'} />
      <Text
          position={[0, 1.5, 0]} // Position the text above the sphere
          fontSize={0.5}
          color="white"
          anchorX="center" // Align horizontally
          anchorY="middle" // Align vertically
        >
          Hello Sphere
        </Text>
    </mesh>
  );
};

export default Sun
