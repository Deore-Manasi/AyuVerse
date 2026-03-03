// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Sky, Environment, Sparkles } from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { useThree, useFrame } from "@react-three/fiber";
// import { PointerLockControls } from "@react-three/drei";
// import { useRef, useEffect } from "react";
// import { Suspense } from "react";
// import * as THREE from "three";

// /* ---------- Ground ---------- */
// function Ground() {
//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
//       <planeGeometry args={[300, 300]} />
//       <meshStandardMaterial color="#3c7a4aac" roughness={1} metalness={0} />
//     </mesh>
//   );
// }

// //function Player

// function Player() {
//   const { camera } = useThree();
//   const move = useRef({
//     forward: false,
//     backward: false,
//     left: false,
//     right: false,
//   });

//   const speed = 0.15;

//   useEffect(() => {
//     const down = (e) => {
//       if (e.key === "w") move.current.forward = true;
//       if (e.key === "s") move.current.backward = true;
//       if (e.key === "a") move.current.left = true;
//       if (e.key === "d") move.current.right = true;
//     };

//     const up = (e) => {
//       if (e.key === "w") move.current.forward = false;
//       if (e.key === "s") move.current.backward = false;
//       if (e.key === "a") move.current.left = false;
//       if (e.key === "d") move.current.right = false;
//     };

//     window.addEventListener("keydown", down);
//     window.addEventListener("keyup", up);

//     return () => {
//       window.removeEventListener("keydown", down);
//       window.removeEventListener("keyup", up);
//     };
//   }, []);

//   useFrame(() => {
//     const direction = camera.getWorldDirection(new THREE.Vector3());
//     direction.y = 0;
//     direction.normalize();

//     const right = new THREE.Vector3();
//     right.crossVectors(camera.up, direction).normalize();

//     if (move.current.forward)
//       camera.position.add(direction.clone().multiplyScalar(speed));

//     if (move.current.backward)
//       camera.position.add(direction.clone().multiplyScalar(-speed));

//     if (move.current.left)
//       camera.position.add(right.clone().multiplyScalar(speed));

//     if (move.current.right)
//       camera.position.add(right.clone().multiplyScalar(-speed));
//   });

//   return (
//     <OrbitControls
//       enableZoom={false}
//       enablePan={false}
//       maxPolarAngle={Math.PI / 2.1}
//     />
//   );
// }

// /* ---------- Simple Realistic Tree (No GLB Needed Now) ---------- */
// function Tree({ position }) {
//   return (
//     <group position={position}>
//       {/* Trunk */}
//       <mesh castShadow>
//         <cylinderGeometry args={[0.3, 0.5, 4, 8]} />
//         <meshStandardMaterial color="#5c3a21" />
//       </mesh>

//       {/* Leaves */}
//       <mesh position={[0, 3, 0]} castShadow>
//         <coneGeometry args={[2, 4, 12]} />
//         <meshStandardMaterial color="#2e8b57" roughness={0.9} metalness={0} />
//       </mesh>
//     </group>
//   );
// }

// /* ---------- Generate Many Trees ---------- */
// function Forest() {
//   const trees = [];

//   for (let i = 0; i < 80; i++) {
//     const scale = Math.random() * 0.8 + 0.6;

//     trees.push(
//       <group key={i} scale={[scale, scale, scale]}>
//         <Tree
//           position={[Math.random() * 200 - 100, 2, Math.random() * 200 - 100]}
//         />
//       </group>,
//     );
//   }

//   return <>{trees}</>;
// }

// /* ---------- Scene ---------- */
// export default function ForestScene() {
//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <Canvas shadows camera={{ position: [0, 10, 30], fov: 60 }}>
//         {/* Fog for depth */}

//         {/* Lights */}
//         <ambientLight intensity={0.4} />
//         <directionalLight
//           position={[30, 40, 20]}
//           intensity={1}
//           color="#ffd27f10"
//           castShadow
//         />

//         {/* Sky */}

//         {/* HDRI Environment */}
//         <Environment files="/hdri/meadow_4k.hdr" background />

//         {/* Magical particles */}
//         <Sparkles count={150} scale={[200, 30, 200]} size={3} speed={0.3} />

//         {/* Bloom effect */}
//         <EffectComposer>
//           <Bloom
//             intensity={0.1}
//             luminanceThreshold={0.1}
//             luminanceSmoothing={0.2}
//           />
//         </EffectComposer>

//         <Player />
//       </Canvas>
//     </div>
//   );
// }

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

/* ---------- Single Plant Model ---------- */
function PlantModel({ plant, position, onClick }) {
  // 🚨 Skip if no GLB
  if (!plant?.glb3D || plant.glb3D.trim() === "") {
    return null;
  }

  const { scene } = useGLTF(plant.glb3D);
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  // Glow effect on hover
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.emissive = new THREE.Color(
        hovered ? "#4ade80" : "#000000",
      );
      child.material.emissiveIntensity = hovered ? 0.6 : 0;
    }
  });

  return (
    <group position={position}>
      <primitive
        ref={ref}
        object={scene}
        scale={8}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
          setHovered(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
          setHovered(false);
        }}
        onClick={() => onClick(plant)}
      />

      {/* 🌿 Hover Name */}
      {hovered && (
        <Html position={[0, 10, 0]} center>
          <div
            style={{
              background: "rgba(168, 235, 104, 0.65)",

              borderRadius: "10px",
              color: "#114603",
              width: "150px",
              height: "50px",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "800",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {plant.plantName}
          </div>
        </Html>
      )}
    </group>
  );
}

/* ---------- Main Scene ---------- */
export default function ForestScene({ plants = [], onPlantClick }) {
  // Only plants that actually have GLB
  const validPlants = plants.filter(
    (plant) => plant?.glb3D && plant.glb3D.trim() !== "",
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas camera={{ position: [0, 3, 10], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        {/* 🌿 HDR Environment */}
        <Environment files="/hdri/meadow_4k.hdr" background />

        <Suspense fallback={null}>
          {validPlants.map((plant, index) => {
            const radiusStep = 10; // increase for wider spread
            const angleStep = 4; // increase for more separation

            const angle = index * angleStep;
            const radius = 15 * Math.sqrt(index + 1);

            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);

            return (
              <PlantModel
                key={plant._id}
                plant={plant}
                position={[x, -2, z]}
                onClick={onPlantClick}
              />
            );
          })}
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
