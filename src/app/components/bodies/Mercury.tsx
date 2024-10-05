import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import * as THREE from 'three';
import useSettingsStore from '@/stores/useSettingsStore';

interface MercuryProps {
  onClick: (mesh: THREE.Mesh | null) => void;
}

function Mercury({ onClick }: MercuryProps) {
  // states
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);
  const advanceSeconds = useSettingsStore((state) => state.advanceSeconds);
  
  // refs
  const mercuryRef = useRef<THREE.Mesh>(null);
  const setMercuryRef = useSettingsStore((state) => state.setMercuryRef);
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (mercuryRef.current) {
      setMercuryRef(mercuryRef);
    }
  }, [setMercuryRef]);
  
  // texture
  const texturePath = '/assets/materials/bodies/material-mercury-2.jpg';
  const texture = useLoader(THREE.TextureLoader, texturePath);

  useFrame(() => {
    const currentTime = new Date(time.getTime() + advanceSeconds);
    setTime(currentTime);

    const mercuryPosition = HelioVector(Body.Mercury, currentTime);

    if (mercuryRef.current) {
      mercuryRef.current.position.set(
        mercuryPosition.x * scalingFactor,
        mercuryPosition.y * scalingFactor,
        mercuryPosition.z * scalingFactor
      );
    }
  });

  return (
    <mesh ref={mercuryRef} rotation={[0, Math.PI, 0]} 
    onClick={(event) => {
      event.stopPropagation();
      onClick(mercuryRef.current);
    }}
    >
      <Sphere args={[2, 32, 32]}>
        <meshStandardMaterial map={texture} />
      </Sphere>
    </mesh>
  );
}

export default Mercury