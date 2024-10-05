import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import * as THREE from 'three';



function OrbitingEarth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(new Date());

  // Scaling factor to manage astronomical units (AU)
  const scalingFactor = 100;

  // Use useFrame to update Earth's position based on time
  useFrame(() => {
    const currentTime = new Date(time.getTime() + 86400000); // Advance one day
    setTime(currentTime);

    const earthPosition = HelioVector(Body.Earth, currentTime);
    if (earthRef.current) {  // Ensure it's not null or undefined
      earthRef.current.position.set(
        earthPosition.x * scalingFactor,
        earthPosition.y * scalingFactor,
        earthPosition.z * scalingFactor
      );
    }
  });

  return (
    <mesh ref={earthRef}>
      <Sphere args={[2, 32, 32]}>
        <meshStandardMaterial color="blue" />
      </Sphere>
    </mesh>
  );
}

export default OrbitingEarth