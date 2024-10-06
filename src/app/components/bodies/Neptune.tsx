import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import * as THREE from 'three';
import useSettingsStore from '@/stores/useSettingsStore';

interface NeptuneProps {
  onClick: (mesh: THREE.Mesh | null) => void;
}

function Neptune({ onClick }: NeptuneProps) {
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);
  const advanceSeconds = useSettingsStore((state) => state.advanceSeconds);
  
  const neptuneRef = useRef<THREE.Mesh>(null); // Reference for Neptune mesh
  const setNeptuneRef = useSettingsStore((state) => state.setNeptuneRef); // Zustand setter for Neptune reference
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (neptuneRef.current) {
      setNeptuneRef(neptuneRef); // Store the Neptune reference in Zustand
    }
  }, [setNeptuneRef]);
  
  // Load Neptune texture
  const texturePath = '/assets/materials/bodies/material-neptune.jpg';
  const texture = useLoader(THREE.TextureLoader, texturePath);

  useFrame(() => {
    const currentTime = new Date(time.getTime() + advanceSeconds);
    setTime(currentTime);

    const neptunePosition = HelioVector(Body.Neptune, currentTime);

    if (neptuneRef.current) {
      neptuneRef.current.position.set(
        neptunePosition.x * scalingFactor,
        neptunePosition.y * scalingFactor,
        neptunePosition.z * scalingFactor
      );
    }
  });

  return (
    <mesh ref={neptuneRef} rotation={[0, Math.PI, 0]} 
      onClick={(event) => {
        event.stopPropagation();
        onClick(neptuneRef.current);
      }}
    >
      <Sphere args={[4, 32, 32]}> {/* Neptune is large, so increase the sphere size */}
        <meshStandardMaterial map={texture} />
      </Sphere>
    </mesh>
  );
}

export default Neptune;
