import { useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Plantview({ plant, position, onClick }) {
  const { scene } = useGLTF(plant.glb_url);
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.emissive = new THREE.Color(
        hovered ? "#FFD700" : "#000000",
      );
      child.material.emissiveIntensity = hovered ? 0.8 : 0;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={2}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    />
  );
}
