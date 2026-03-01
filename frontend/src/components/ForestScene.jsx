import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Environment, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Suspense } from "react";
import * as THREE from "three";

/* ---------- Ground ---------- */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[300, 300]} />
      <meshStandardMaterial color="#3c7a4a" roughness={1} metalness={0} />
    </mesh>
  );
}

//function Player
function Player() {
  const { camera } = useThree();
  const velocity = useRef([0, 0]);
  const speed = 0.2;

  useFrame(() => {
    camera.position.x += velocity.current[0];
    camera.position.z += velocity.current[1];
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "w") velocity.current[1] = -speed;
      if (e.key === "s") velocity.current[1] = speed;
      if (e.key === "a") velocity.current[0] = -speed;
      if (e.key === "d") velocity.current[0] = speed;
    };

    const handleKeyUp = () => {
      velocity.current = [0, 0];
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return <PointerLockControls />;
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
        <meshStandardMaterial color="#2e8b57" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

/* ---------- Generate Many Trees ---------- */
function Forest() {
  const trees = [];

  for (let i = 0; i < 80; i++) {
    const scale = Math.random() * 0.8 + 0.6;

    trees.push(
      <group key={i} scale={[scale, scale, scale]}>
        <Tree
          position={[Math.random() * 200 - 100, 2, Math.random() * 200 - 100]}
        />
      </group>,
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
        <directionalLight
          position={[30, 40, 20]}
          intensity={1.5}
          color="#ffd27fcc"
          castShadow
        />

        {/* Sky */}

        {/* HDRI Environment */}
        <Environment files="/hdri/suburban_garden_4k.hdr" background />

        {/* Magical particles */}
        <Sparkles count={150} scale={[200, 30, 200]} size={3} speed={0.3} />

        {/* Bloom effect */}
        <EffectComposer>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>

        <Player />
      </Canvas>
    </div>
  );
}
