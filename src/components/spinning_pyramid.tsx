import { useEffect, useRef } from "react";
import * as THREE from "three";

export function SpinningPyramid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref) return;
    if (ref.current?.children.length) return;

    const width = 400;
    const height = 400;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      1,
      0.1,
      2000,
    );

    camera.position.set(0, 1.5, 3); // Adjust camera to look slightly down on the pyramid
    camera.lookAt(0, 0.5, 0);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Set background to transparent
    ref?.current?.appendChild(renderer.domElement);

    const geometry = new THREE.ConeGeometry(1, 1.25, 4);
    const material = new THREE.MeshStandardMaterial({
      color: 0xFFD700, // Gold color
      metalness: 1, // Make it metallic
      roughness: 0.3, // Reduce roughness for a shinier surface
    });
    const pyramid = new THREE.Mesh(geometry, material);
    pyramid.scale.set(1.15, 1.15, 1.15);
    pyramid.position.y = 0.6;
    scene.add(pyramid);

    // Add lighting
    const light = new THREE.DirectionalLight(0x1f1f1f, 10);
    light.position.set(100, 300, 0).normalize();
    scene.add(light);

    const sun = new THREE.PointLight(0xf1f1f1, 100, 1000);
    sun.position.set(1, 10, 0);
    scene.add(sun);

    const ambientLight = new THREE.AmbientLight(0xffffff, 100); // Add ambient light to enhance reflections
    ambientLight.position.set(0, 5, 0);
    scene.add(ambientLight);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      pyramid.rotation.y -= 0.003; // Slower and linear rotation
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      ref.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} />;
}
