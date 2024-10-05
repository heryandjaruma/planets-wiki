import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { CelestialBody } from '../model/CelestiaBody';
import { Line } from '@react-three/drei';

// Define properties for the orbit path
interface OrbitPathProps {
  radius: number;
}

const OrbitPath = ({ radius }: OrbitPathProps) => {
  const points = useMemo(() => {
    const pointsArray: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pointsArray.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pointsArray;
  }, [radius]);

  return <Line points={points} color="gray" lineWidth={1} />;
};

// Define CelestialBodyComponent
interface CelestialBodyComponentProps {
  body: CelestialBody;
}

const CelestialBodyComponent: React.FC<CelestialBodyComponentProps> = ({ body }) => {
  const planetRef = useRef<THREE.Mesh>(null);

  // Always call useLoader, but conditionally provide the texturePath
  const texturePath = body.texturePath ?? ''; // Use an empty string if there's no texturePath
  const texture = useLoader(THREE.TextureLoader, texturePath);

  const finalTexture = body.texturePath ? texture : null;

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
          color={body.color}
          map={finalTexture ?? undefined}
          emissive={body.name === 'Sun' ? 'orange' : undefined}
          emissiveMap={body.name === 'Sun' ? finalTexture : undefined}
          emissiveIntensity={body.name === 'Sun' ? 1 : undefined}
        />
      </mesh>
    </>
  );
};

export default CelestialBodyComponent;
