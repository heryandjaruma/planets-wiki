// components/CameraFollow.tsx
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

interface CameraFollowProps {
  focusedObject: THREE.Object3D | null;
  onLostFocus: () => void;
}

const CameraFollow: React.FC<CameraFollowProps> = ({ focusedObject, onLostFocus }) => {
  const { camera } = useThree();
  const [isObjectInView, setIsObjectInView] = useState(true);
  const offset = new THREE.Vector3(5, 2.1, 5); // Adjust as needed

  useEffect(() => {
    console.log('CameraFollow useEffect called with focusedObject:', focusedObject);
    if (focusedObject) {
      // Get the object's world position
      const objPosition = new THREE.Vector3();
      focusedObject.getWorldPosition(objPosition);

      // Initial camera movement when the focus changes
      const newPosition = objPosition.clone().add(offset);
      camera.position.copy(newPosition);
      camera.lookAt(objPosition);
    }
  }, [focusedObject, camera]);

  useFrame(() => {
    if (focusedObject) {
      console.log('CameraFollow useFrame called');
      // Get the object's world position
      const objPosition = new THREE.Vector3();
      focusedObject.getWorldPosition(objPosition);

      // Recalculate the camera position each frame to follow the moving object
      const newPosition = objPosition.clone().add(offset);
      camera.position.lerp(newPosition, 0.1); // Smoothly interpolate the camera's position
      camera.lookAt(objPosition); // Ensure the camera always looks at the object

      // Check if the object is in the camera's field of view
      const frustum = new THREE.Frustum();
      const matrix = new THREE.Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      );
      frustum.setFromProjectionMatrix(matrix);
      const isInView = frustum.containsPoint(objPosition);
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
