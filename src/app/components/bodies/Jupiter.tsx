import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import * as THREE from 'three';
import useSettingsStore from '@/stores/useSettingsStore';

interface JupiterProps {
  onClick: (mesh: THREE.Mesh | null) => void;
}

function Jupiter({ onClick }: JupiterProps) {
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);
  const advanceSeconds = useSettingsStore((state) => state.advanceSeconds);
  
  const jupiterRef = useRef<THREE.Mesh>(null); // Reference for Jupiter mesh
  const setJupiterRef = useSettingsStore((state) => state.setJupiterRef); // Zustand setter for Jupiter reference
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (jupiterRef.current) {
      setJupiterRef(jupiterRef); // Store the Jupiter reference in Zustand
    }
  }, [setJupiterRef]);
  
  // Load Jupiter texture
  const texturePath = '/assets/materials/bodies/material-jupiter.jpg';
  const texture = useLoader(THREE.TextureLoader, texturePath);

  useFrame(() => {
    const currentTime = new Date(time.getTime() + advanceSeconds);
    setTime(currentTime);

    const jupiterPosition = HelioVector(Body.Jupiter, currentTime);

    if (jupiterRef.current) {
      jupiterRef.current.position.set(
        jupiterPosition.x * scalingFactor,
        jupiterPosition.y * scalingFactor,
        jupiterPosition.z * scalingFactor
      );
    }
  });

  return (
    <mesh ref={jupiterRef} rotation={[0, Math.PI, 0]} 
      onClick={(event) => {
        event.stopPropagation();
        onClick(jupiterRef.current);
      }}
    >
      <Sphere args={[3, 32, 32]}> {/* Jupiter is larger, so increase the sphere size */}
        <meshStandardMaterial map={texture} />
      </Sphere>
    </mesh>
  );
}

export default Jupiter;
