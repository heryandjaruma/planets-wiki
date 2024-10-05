import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';

const SpaceBackground = () => {
  const texture = useLoader(THREE.TextureLoader, '/assets/bg-space-2.jpg');

  return (
    <mesh>
      <sphereGeometry args={[800, 60, 60]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        color="#fff"
      />
    </mesh>
  );
};

export default SpaceBackground