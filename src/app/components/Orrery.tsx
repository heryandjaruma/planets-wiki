'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

const Orrery = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x021631) // Light blue background
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    mountRef.current.appendChild(renderer.domElement);

    // Create the Sun
    const sunTexture = new THREE.TextureLoader().load('/assets/material-sun.jpg')
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial( { map: sunTexture })
    )
    scene.add(sun);

    const createPlanet = (size, color, distance) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshStandardMaterial({ color });
      const planet = new THREE.Mesh(geometry, material);
      const planetGroup = new THREE.Group();
      planetGroup.add(planet);
      planet.position.x = distance;

      // Create orbit line
      const orbitCurve = new THREE.EllipseCurve(0, 0, distance, distance, 0, 2 * Math.PI, false, 0);
      const points = orbitCurve.getPoints(100);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;

      // Return the orbit separately
      return { planet, group: planetGroup, orbit };
    };

    const planets = [
      createPlanet(0.2, 0xff0000, 3),  // Planet 1
      createPlanet(0.4, 0x00ff00, 5),  // Planet 2
      createPlanet(0.6, 0x0000ff, 8),  // Planet 3
    ];

    planets.forEach(({ group, orbit }) => {
      scene.add(group);
      scene.add(orbit);  // Add orbit directly to the scene
    });

    // Light for the scene
    const pointLight = new THREE.PointLight(0xffffa8, 1.5, 50);
    pointLight.position.set(5, 5, 10);
    scene.add(pointLight);
    
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
    scene.add(pointLightHelper)

    // Camera position
    camera.position.set(0, 5, 15);

    // OrbitControls for camera movement
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate planets around the sun
      planets.forEach(({ planet, group }, index) => {
        group.rotation.y += 0.01 * (index + 1);
      });

      // Update controls and render scene
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default Orrery;