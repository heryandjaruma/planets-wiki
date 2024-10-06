import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import * as THREE from 'three';
import useSettingsStore from '@/stores/useSettingsStore';

interface UranusProps {
  onClick: (mesh: THREE.Mesh | null) => void;
}

function Uranus({ onClick }: UranusProps) {
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);
  const advanceSeconds = useSettingsStore((state) => state.advanceSeconds);
  
  const uranusRef = useRef<THREE.Mesh>(null); // Reference for Uranus mesh
  const setUranusRef = useSettingsStore((state) => state.setUranusRef); // Zustand setter for Uranus reference
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (uranusRef.current) {
      setUranusRef(uranusRef); // Store the Uranus reference in Zustand
    }
  }, [setUranusRef]);
  
  // Load Uranus texture
  const texturePath = '/assets/materials/bodies/material-uranus.jpg';
  const texture = useLoader(THREE.TextureLoader, texturePath);

  useFrame(() => {
    const currentTime = new Date(time.getTime() + advanceSeconds);
    setTime(currentTime);

    const uranusPosition = HelioVector(Body.Uranus, currentTime);

    if (uranusRef.current) {
      uranusRef.current.position.set(
        uranusPosition.x * scalingFactor,
        uranusPosition.y * scalingFactor,
        uranusPosition.z * scalingFactor
      );
    }
  });

  return (
    <mesh ref={uranusRef} rotation={[0, Math.PI, 0]} 
      onClick={(event) => {
        event.stopPropagation();
        onClick(uranusRef.current);
      }}
    >
      <Sphere args={[4, 32, 32]}> {/* Uranus is smaller than Saturn but still large */}
        <meshStandardMaterial map={texture} />
      </Sphere>
    </mesh>
  );
}

export default Uranus;
