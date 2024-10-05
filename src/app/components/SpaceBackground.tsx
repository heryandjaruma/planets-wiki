import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';

const SpaceBackground = () => {
  const texture = useLoader(THREE.TextureLoader, '/assets/bg-space.jpg');

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 60]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        color="#949494"
      />
    </mesh>
  );
};

export default SpaceBackground