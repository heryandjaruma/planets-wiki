import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { CelestialBody } from '../model/CelestiaBody';

// Define properties for the orbit path
interface OrbitPathProps {
  radius: number;
}

const OrbitPath: React.FC<OrbitPathProps> = ({ radius }) => {
  const points = useMemo(() => {
    const pointsArray: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pointsArray.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pointsArray;
  }, [radius]);

  const orbitGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={orbitGeometry}>
      <lineBasicMaterial color="gray" linewidth={1} />
    </line>
  );
};

// Define CelestialBodyComponent
interface CelestialBodyComponentProps {
  body: CelestialBody;
}

const CelestialBodyComponent: React.FC<CelestialBodyComponentProps> = ({ body }) => {
  const planetRef = useRef<THREE.Mesh>(null);

  // Load Sun texture if the body is the Sun
  const sunTexture = useLoader(THREE.TextureLoader, '/assets/material-sun.jpg');

  // Animation for the body's orbit
  useFrame(({ clock }) => {
    if (planetRef.current && body.name !== 'Sun') {
      const t = clock.getElapsedTime() * body.speed;
      planetRef.current.position.x = body.distanceFromSun * Math.cos(t);
      planetRef.current.position.z = body.distanceFromSun * Math.sin(t);
    }
  });

  return (
    <>
      {body.hasOrbit && body.name !== 'Sun' && <OrbitPath radius={body.distanceFromSun} />}
      <mesh ref={planetRef} position={body.name === 'Sun' ? [0, 0, 0] : [body.distanceFromSun, 0, 0]}>
        <sphereGeometry args={[body.radius, 32, 32]} />
        <meshStandardMaterial
          color={body.name === 'Sun' ? undefined : body.color}
          map={body.name === 'Sun' ? sunTexture : undefined}
          emissive={body.name === 'Sun' ? 'orange' : undefined}
          emissiveMap={body.name === 'Sun' ? sunTexture : undefined}
          emissiveIntensity={body.name === 'Sun' ? 1 : undefined}
        />
      </mesh>
    </>
  );
};

export default CelestialBodyComponent