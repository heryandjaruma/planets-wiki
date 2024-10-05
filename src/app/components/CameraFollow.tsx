// components/CameraFollow.tsx
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

interface CameraFollowProps {
  focusedObject: THREE.Object3D | null;
  onLostFocus: () => void;
}

const CameraFollow: React.FC<CameraFollowProps> = ({ focusedObject, onLostFocus }) => {
  const { camera } = useThree();
  const [isObjectInView, setIsObjectInView] = useState(true);

  useEffect(() => {
    if (focusedObject) {
      const offset = new THREE.Vector3(5, 2.1, 5);
      const newPosition = focusedObject.position.clone().add(offset);
      gsap.to(camera.position, {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: 1, // 1 second duration
        onUpdate: () => {
          camera.lookAt(focusedObject.position);
        },
      });
    }
  }, [focusedObject, camera]);

  useFrame(() => {
    if (focusedObject) {
      // Check if the object is in the camera's field of view
      const frustum = new THREE.Frustum();
      const matrix = new THREE.Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      );
      frustum.setFromProjectionMatrix(matrix);
      const isInView = frustum.containsPoint(focusedObject.position);
      if (!isInView && isObjectInView) {
        setIsObjectInView(false);
        onLostFocus();
      } else if (isInView && !isObjectInView) {
        setIsObjectInView(true);
      }
    }
  });

  return null;
};

export default CameraFollow;
