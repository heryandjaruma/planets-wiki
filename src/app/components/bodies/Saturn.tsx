import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import * as THREE from 'three';
import useSettingsStore from '@/stores/useSettingsStore';

interface SaturnProps {
  onClick: (mesh: THREE.Mesh | null) => void;
}

function Saturn({ onClick }: SaturnProps) {
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);
  const advanceSeconds = useSettingsStore((state) => state.advanceSeconds);
  
  const saturnRef = useRef<THREE.Mesh>(null); // Reference for Saturn mesh
  const setSaturnRef = useSettingsStore((state) => state.setSaturnRef); // Zustand setter for Saturn reference
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (saturnRef.current) {
      setSaturnRef(saturnRef); // Store the Saturn reference in Zustand
    }
  }, [setSaturnRef]);
  
  // Load Saturn texture
  const texturePath = '/assets/materials/bodies/material-saturn.jpg';
  const texture = useLoader(THREE.TextureLoader, texturePath);

  useFrame(() => {
    const currentTime = new Date(time.getTime() + advanceSeconds);
    setTime(currentTime);

    const saturnPosition = HelioVector(Body.Saturn, currentTime);

    if (saturnRef.current) {
      saturnRef.current.position.set(
        saturnPosition.x * scalingFactor,
        saturnPosition.y * scalingFactor,
        saturnPosition.z * scalingFactor
      );
    }
  });

  return (
    <mesh ref={saturnRef} rotation={[0, Math.PI, 0]} 
      onClick={(event) => {
        event.stopPropagation();
        onClick(saturnRef.current);
      }}
    >
      <Sphere args={[2.75, 32, 32]}> {/* Saturn's size */}
        <meshStandardMaterial map={texture} />
      </Sphere>
    </mesh>
  );
}

export default Saturn;
