import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Environment, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import * as THREE from "three";

/* ---------- Ground ---------- */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[300, 300]} />
      <meshStandardMaterial color="#2f5d3a" />
    </mesh>
  );
}

/* ---------- Simple Realistic Tree (No GLB Needed Now) ---------- */
function Tree({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.5, 4, 8]} />
        <meshStandardMaterial color="#5c3a21" />
      </mesh>

      {/* Leaves */}
      <mesh position={[0, 3, 0]} castShadow>
        <coneGeometry args={[2, 4, 12]} />
        <meshStandardMaterial color="#1f7a3f" />
      </mesh>
    </group>
  );
}

/* ---------- Generate Many Trees ---------- */
function Forest() {
  const trees = [];

  for (let i = 0; i < 80; i++) {
    trees.push(
      <Tree
        key={i}
        position={[Math.random() * 200 - 100, 2, Math.random() * 200 - 100]}
      />,
    );
  }

  return <>{trees}</>;
}

/* ---------- Scene ---------- */
export default function ForestScene() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas shadows camera={{ position: [0, 10, 30], fov: 60 }}>
        {/* Fog for depth */}
        <fog attach="fog" args={["#1b2e1f", 20, 150]} />

        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />

        {/* Sky */}
        <Sky sunPosition={[100, 20, 100]} />

        {/* HDRI Environment */}
        <Environment preset="forest" />

        <Suspense fallback={null}>
          <Ground />
          <Forest />
        </Suspense>

        {/* Magical particles */}
        <Sparkles count={150} scale={[200, 30, 200]} size={3} speed={0.3} />

        {/* Bloom effect */}
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>

        <OrbitControls enableZoom maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}
