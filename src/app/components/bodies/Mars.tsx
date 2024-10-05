import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import * as THREE from 'three';
import useSettingsStore from '@/stores/useSettingsStore';

function Mars() {
  // states
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);
  const advanceSeconds = useSettingsStore((state) => state.advanceSeconds);
  
  
  const marsRef = useRef<THREE.Mesh>(null); // Create a ref for Mars
  const setMarsRef = useSettingsStore((state) => state.setMarsRef); // Getter for setMarsRef from Zustand
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    if (marsRef.current) {
      setMarsRef(marsRef); // Correctly set the marsRef in the store
    }
  }, [setMarsRef]);
  
  // Use useFrame to update Mars' position based on time
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
    <mesh ref={marsRef}>
      <Sphere args={[1.5, 32, 32]}>
        <meshStandardMaterial color="red" />
      </Sphere>
    </mesh>
  );
}

export default Mars;
