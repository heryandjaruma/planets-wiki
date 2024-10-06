import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import * as THREE from 'three';
import useSettingsStore from '@/stores/useSettingsStore';

interface VenusProps {
  onClick: (mesh: THREE.Mesh | null) => void;
}

function Venus({ onClick }: VenusProps) {
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);
  const advanceSeconds = useSettingsStore((state) => state.advanceSeconds);
  
  const venusRef = useRef<THREE.Mesh>(null); // Reference for Venus mesh
  const setVenusRef = useSettingsStore((state) => state.setVenusRef); // Setter for Venus reference in Zustand
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (venusRef.current) {
      setVenusRef(venusRef); // Store the Venus reference in Zustand
    }
  }, [setVenusRef]);
  
  // Load Venus texture
  const texturePath = '/assets/materials/bodies/material-venus.jpg';
  const texture = useLoader(THREE.TextureLoader, texturePath);

  useFrame(() => {
    const currentTime = new Date(time.getTime() + advanceSeconds);
    setTime(currentTime);

    const venusPosition = HelioVector(Body.Venus, currentTime);

    if (venusRef.current) {
      venusRef.current.position.set(
        venusPosition.x * scalingFactor,
        venusPosition.y * scalingFactor,
        venusPosition.z * scalingFactor
      );
    }
  });

  return (
    <mesh ref={venusRef} rotation={[0, Math.PI, 0]} 
      onClick={(event) => {
        event.stopPropagation();
        onClick(venusRef.current);
      }}
    >
      <Sphere args={[4, 32, 32]}>
        <meshStandardMaterial map={texture} />
      </Sphere>
    </mesh>
  );
}

export default Venus;
