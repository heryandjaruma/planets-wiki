import React from 'react';


interface OrbitProps {
  innerRadius: number;
  outerRadius: number;
}

const Orbit = ({ innerRadius, outerRadius }: OrbitProps) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshBasicMaterial color="gray" side="double" />
    </mesh>
  );
};

export default Orbit