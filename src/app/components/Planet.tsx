// components/Planet.tsx

'use client'

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetProps {
  name: string;
  radius: number;
  speed: number;
  color: string;
  size: number;
}

const Planet: React.FC<PlanetProps> = ({ radius, speed, color, size }) => {
  const planetRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = speed * (elapsedTime / 100); // Scaled for better visual looping
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    
    if (planetRef.current) {
      planetRef.current.position.set(x, 0, z);
      planetRef.current.rotation.y += 0.01; // Planet rotation on its own axis
    }
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Planet;
