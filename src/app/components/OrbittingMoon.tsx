import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import useSettingsStore from '@/stores/useSettingsStore';

const OrbitingMoon: React.FC = () => {
  const moonRef = useRef<THREE.Mesh>(null);
  const earthRef = useSettingsStore((state) => state.earthRef); // Access the Earth reference from the store
  const scalingFactor = useSettingsStore((state) => state.scalingFactor); // Scaling factor
  const advanceSeconds = useSettingsStore((state) => state.advanceSeconds); // Time advancement (in seconds per frame)

  const moonOrbitRadius = 10; // Scaled distance between Earth and Moon
  const moonOrbitalPeriod = 27.3 * 86400; // Moon's orbital period (27.3 days in seconds)
  const moonAngularVelocity = (2 * Math.PI) / moonOrbitalPeriod; // Angular velocity for Moon

  const [time, setTime] = useState(0); // Time elapsed in seconds

  useFrame((state, delta) => {
    if (earthRef?.current && moonRef.current) {
      // Increment time by the advanced seconds
      const timeElapsedInSeconds = time + advanceSeconds * delta;
      setTime(timeElapsedInSeconds);

      // Calculate the angle of the Moon relative to Earth
      const moonAngle = (timeElapsedInSeconds * moonAngularVelocity) % (2 * Math.PI);

      // Calculate the Moon's position around Earth
      const moonX = earthRef.current.position.x + moonOrbitRadius * Math.cos(moonAngle);
      const moonY = earthRef.current.position.y; // Keep Moon on the same Y-plane
      const moonZ = earthRef.current.position.z + moonOrbitRadius * Math.sin(moonAngle);

      // Update the Moon's position
      moonRef.current.position.set(moonX, moonY, moonZ);
    }
  });

  return (
    <mesh ref={moonRef}>
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color="gray" />
      </Sphere>
    </mesh>
  );
};

export default OrbitingMoon;
