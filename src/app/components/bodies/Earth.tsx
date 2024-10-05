import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import * as THREE from 'three';
import useSettingsStore from '@/stores/useSettingsStore';

interface EarthProps {
  onClick: (mesh: THREE.Mesh | null) => void;
}

function Earth({ onClick }: EarthProps) {
  // states
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);
  const advanceSeconds = useSettingsStore((state) => state.advanceSeconds);
  
  // refs
  const earthRef = useRef<THREE.Mesh>(null);
  const setEarthRef = useSettingsStore((state) => state.setEarthRef);
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (earthRef.current) {
      setEarthRef(earthRef);
    }
  }, [setEarthRef]);
  
  // texture
  const texturePath = '/assets/materials/bodies/material-earth.jpg';
  const texture = useLoader(THREE.TextureLoader, texturePath);

  useFrame(() => {
    const currentTime = new Date(time.getTime() + advanceSeconds);
    setTime(currentTime);

    const earthPosition = HelioVector(Body.Earth, currentTime);

    if (earthRef.current) {
      earthRef.current.position.set(
        earthPosition.x * scalingFactor,
        earthPosition.y * scalingFactor,
        earthPosition.z * scalingFactor
      );
    }
  });

  return (
    <mesh ref={earthRef} rotation={[0, Math.PI, 0]} 
    onClick={(event) => {
      event.stopPropagation();
      onClick(earthRef.current);
    }}
    >
      <Sphere args={[2, 32, 32]}>
        <meshStandardMaterial map={texture} />
      </Sphere>
    </mesh>
  );
}

export default Earth