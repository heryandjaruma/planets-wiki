import React, { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraFollowProps {
  targetRef: React.RefObject<THREE.Mesh>;
}

const CameraFollow = ({ targetRef }: CameraFollowProps) => {
  const { camera } = useThree();

  useEffect(() => {
    if (targetRef.current) {
      const initialPosition = targetRef.current.position;
      // Set the initial position of the camera relative to Earth
      camera.position.set(initialPosition.x + 10, initialPosition.y + 5, initialPosition.z + 20);
      camera.lookAt(initialPosition);
    }
  }, [targetRef, camera]);

  useFrame(() => {
    if (targetRef.current) {
      // Get the target position (Earth's position)
      const targetPosition = targetRef.current.position;
      // Smoothly move the camera to follow the target
      camera.position.lerp(
        new THREE.Vector3(targetPosition.x + 10, targetPosition.y + 5, targetPosition.z + 20),
        0.1
      );
      // Make the camera look at the target
      camera.lookAt(targetPosition);
    }
  });

  return null;
};

export default CameraFollow;
