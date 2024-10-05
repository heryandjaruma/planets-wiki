import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import * as THREE from 'three';
import useSettingsStore from '@/stores/useSettingsStore';

interface MarsProps {
  onClick: (mesh: THREE.Mesh | null) => void;
}

function Mars({ onClick }: MarsProps) {
  // states
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);
  const advanceSeconds = useSettingsStore((state) => state.advanceSeconds);
  
  // refs
  const marsRef = useRef<THREE.Mesh>(null);
  const setMarsRef = useSettingsStore((state) => state.setMarsRef);
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (marsRef.current) {
      setMarsRef(marsRef);
    }
  }, [setMarsRef]);
  
  // texture
  const texturePath = '/assets/materials/bodies/material-mars.jpg';
  const texture = useLoader(THREE.TextureLoader, texturePath);
  
  useFrame(() => {
    const currentTime = new Date(time.getTime() + advanceSeconds);
    setTime(currentTime);

    const marsPosition = HelioVector(Body.Mars, currentTime);

    if (marsRef.current) {
      marsRef.current.position.set(
        marsPosition.x * scalingFactor,
        marsPosition.y * scalingFactor,
        marsPosition.z * scalingFactor
      );
    }
  });

  return (
    <mesh ref={marsRef}
    onClick={(event) => {
      event.stopPropagation();
      onClick(marsRef.current);
    }}
    >
      <Sphere args={[1.5, 32, 32]}>
        <meshStandardMaterial map={texture} />
      </Sphere>
    </mesh>
  );
}

export default Mars;
