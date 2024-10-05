import React, { useRef, useMemo, forwardRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { CelestialBody } from '../model/CelestialBody';
import { Line } from '@react-three/drei';
import { Rotation } from '../model/Properties';

// Define properties for the orbit path
interface OrbitPathProps {
  radiusX: number;
  radiusZ: number;
}

const OrbitPath = ({ radiusX, radiusZ }: OrbitPathProps) => {
  const points = useMemo(() => {
    const pointsArray: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pointsArray.push(new THREE.Vector3(Math.cos(angle) * radiusX, 0, Math.sin(angle) * radiusZ));
    }
    return pointsArray;
  }, [radiusX, radiusZ]);

  return <Line points={points} color="gray" lineWidth={1} />;
};

// Define CelestialBodyComponent with forwardRef
interface CelestialBodyComponentProps {
  body: CelestialBody;
  rotation?: Rotation;
  onClick: () => void;
}

const CelestialBodyComponent = forwardRef<THREE.Mesh, CelestialBodyComponentProps>(({ body, rotation, onClick }, ref) => {
  // Type guard for checking MutableRefObject
  const planetRef = useRef<THREE.Mesh>(null);
  const resolvedRef = (ref ?? planetRef) as React.MutableRefObject<THREE.Mesh | null>;

  const texture = body.texturePath ? useLoader(THREE.TextureLoader, body.texturePath) : null;

  // Animation for the body's orbit
  useFrame(({ clock }) => {
    if (resolvedRef.current) {
      const t = clock.getElapsedTime();

      // Elliptical orbit calculation for planets
      if (body.name !== 'Sun') {
        resolvedRef.current.position.x = body.distanceFromSun * 1.2 * Math.cos(t * body.speed);
        resolvedRef.current.position.z = body.distanceFromSun * Math.sin(t * body.speed);
        resolvedRef.current.position.y = 0; // Keep the planet on the flat plane
      }

      // Proper rotation around its axis (Y and X)
      if (rotation) {
        resolvedRef.current.rotation.y += rotation.speed * rotation.axisY;
        resolvedRef.current.rotation.x += rotation.speed * rotation.axisX;
      }
    }
  });

  return (
    <>
      {body.hasOrbit && body.name !== 'Sun' && (
        <OrbitPath radiusX={body.distanceFromSun * 1.2} radiusZ={body.distanceFromSun} />
      )}
      <mesh
        ref={resolvedRef} // Use resolvedRef here, which could be the provided ref or a local one
        position={body.name === 'Sun' ? [0, 0, 0] : [body.distanceFromSun, 0, 0]}
        onClick={onClick} // Handle click event
      >
        <sphereGeometry args={[body.radius, 32, 32]} />
        <meshStandardMaterial
          color={body.color}
          map={texture ?? undefined}
          emissive={body.name === 'Sun' ? 'orange' : undefined}
          emissiveMap={body.name === 'Sun' ? texture : undefined}
          emissiveIntensity={body.name === 'Sun' ? 1 : undefined}
        />
      </mesh>
    </>
  );
});

CelestialBodyComponent.displayName = 'CelestialBodyComponent';

export default CelestialBodyComponent;
