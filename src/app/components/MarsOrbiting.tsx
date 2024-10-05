import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import * as THREE from 'three';

function OrbitingMars() {
  const marsRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(new Date());

  // Scaling factor to manage astronomical units (AU)
  const scalingFactor = 100;

  // Use useFrame to update Mars' position based on time
  useFrame(() => {
    const currentTime = new Date(time.getTime() + 86400000); // Advance one day
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

export default OrbitingMars;
