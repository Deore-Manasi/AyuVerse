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

// import { Canvas, useFrame } from "@react-three/fiber";
// import { Environment, OrbitControls, useGLTF, Html } from "@react-three/drei";
// import { Suspense, useRef, useState } from "react";
// import * as THREE from "three";

// /* ---------- Single Plant Model ---------- */
// function PlantModel({ plant, position, onClick }) {
//   // 🚨 Skip if no GLB
//   if (!plant?.glb3D || plant.glb3D.trim() === "") {
//     return null;
//   }

//   const { scene } = useGLTF(plant.glb3D);
//   const ref = useRef();
//   const [hovered, setHovered] = useState(false);

//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.002;
//     }
//   });

//   // Glow effect on hover
//   scene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.emissive = new THREE.Color(
//         hovered ? "#4ade80" : "#000000",
//       );
//       child.material.emissiveIntensity = hovered ? 0.6 : 0;
//     }
//   });

//   return (
//     <group position={position}>
//       <primitive
//         ref={ref}
//         object={scene}
//         scale={8}
//         onPointerOver={() => {
//           document.body.style.cursor = "pointer";
//           setHovered(true);
//         }}
//         onPointerOut={() => {
//           document.body.style.cursor = "default";
//           setHovered(false);
//         }}
//         onClick={() => onClick(plant)}
//       />

//       {/* 🌿 Hover Name */}
//       {hovered && (
//         <Html position={[0, 10, 0]} center>
//           <div
//             style={{
//               background: "rgba(106, 235, 244, 0.66)",

//               borderRadius: "10px ",
//               border: "2px dashed #043060",
//               color: "rgb(4, 48, 96)",
//               width: "150px",
//               height: "50px",
//               fontSize: "18px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               textAlign: "center",
//               fontWeight: "800",
//               whiteSpace: "nowrap",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//             }}
//           >
//             {plant.plantName}
//           </div>
//         </Html>
//       )}
//     </group>
//   );
// }

// /* ---------- Main Scene ---------- */
// export default function ForestScene({ plants = [], onPlantClick }) {
//   // Only plants that actually have GLB
//   const validPlants = plants.filter(
//     (plant) => plant?.glb3D && plant.glb3D.trim() !== "",
//   );

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <Canvas camera={{ position: [0, 3, 10], fov: 60 }}>
//         <ambientLight intensity={0.6} />
//         <directionalLight position={[5, 10, 5]} intensity={1} />

//         {/* 🌿 HDR Environment */}
//         <Environment files="/hdri/meadow_4k.hdr" background />

//         <Suspense fallback={null}>
//           {validPlants.map((plant, index) => {
//             const radiusStep = 10; // increase for wider spread
//             const angleStep = 4; // increase for more separation

//             const angle = index * angleStep;
//             const radius = 15 * Math.sqrt(index + 1);

//             const x = radius * Math.cos(angle);
//             const z = radius * Math.sin(angle);

//             return (
//               <PlantModel
//                 key={plant._id}
//                 plant={plant}
//                 position={[x, -2, z]}
//                 onClick={onPlantClick}
//               />
//             );
//           })}
//         </Suspense>

//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// }

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

/* ---------- Real progress tracker ---------- */
function Loader({ onProgress, onReady, baseProgress }) {
  const { active } = useProgress();

  useEffect(() => {
    let current = baseProgress;
    onProgress(current);

    // Smoothly tick from baseProgress to 90% while loading
    const interval = setInterval(() => {
      current += 1;
      onProgress(Math.min(current, 90));
      if (current >= 90) clearInterval(interval);
    }, 120); // ticks every 120ms → reaches 90% in ~(90-baseProgress)*120ms

    return () => clearInterval(interval);
  }, [baseProgress]);

  // When Three.js finishes — jump to 100% and reveal scene
  useEffect(() => {
    if (!active) {
      onProgress(100);
      setTimeout(() => onReady(), 600);
    }
  }, [active]);

  return null;
}
/* ---------- Single Plant Model ---------- */
function PlantModel({ plant, position, onClick }) {
  if (!plant?.glb3D || plant.glb3D.trim() === "") return null;

  const { scene } = useGLTF(plant.glb3D);
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.002;
  });

  // ✅ No clone — just traverse materials directly
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(
          hovered ? "#4ade80" : "#000000",
        );
        child.material.emissiveIntensity = hovered ? 0.6 : 0;
      }
    });
  }, [hovered, scene]);

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
      {hovered && (
        <Html position={[0, 10, 0]} center>
          <div
            style={{
              background: "rgba(106, 235, 244, 0.66)",
              borderRadius: "10px",
              border: "2px dashed #043060",
              color: "rgb(4, 48, 96)",
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
export default function ForestScene({
  plants = [],
  onPlantClick,
  baseProgress = 0,
  zoneName = "",
}) {
  const [progress, setProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);

  const validPlants = plants.filter(
    (plant) => plant?.glb3D && plant.glb3D.trim() !== "",
  );

  const getLoadingText = (p) => {
    if (p < 20) return "Loading forest environment...";
    if (p < 50) return "Fetching 3D plants...";
    if (p < 80) return "Building forest scene...";
    if (p < 99) return "Almost ready...";
    return "Entering the forest...";
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      {/* ── Loading overlay ── */}
      {!sceneReady && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a1a0a",
            gap: "20px",
            pointerEvents: "none",
          }}
        >
          <div style={{ fontSize: "48px" }}>
            {zoneName === "Vata Zone"
              ? "💨"
              : zoneName === "Pitta Zone"
                ? "🔥"
                : "🌊"}
          </div>
          <h3
            style={{
              color: "#7eba6a",
              margin: 0,
              fontSize: "22px",
              letterSpacing: "0.05em",
            }}
          >
            {zoneName}
          </h3>
          <p style={{ color: "#555", fontSize: "14px", margin: 0 }}>
            {getLoadingText(progress)}
          </p>

          <div style={{ width: "320px" }}>
            <div
              style={{
                width: "100%",
                height: "8px",
                background: "#1a2e1a",
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid #2a4a2a",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #2d6a3f, #4a9e6b, #7eba6a)",
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                  boxShadow: "0 0 8px rgba(74,158,107,0.6)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  color: "#4a9e6b",
                  fontSize: "12px",
                  fontFamily: "monospace",
                }}
              >
                LOADING
              </span>
              <span
                style={{
                  color: "#4a9e6b",
                  fontSize: "12px",
                  fontFamily: "monospace",
                }}
              >
                {progress}%
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: "28px",
                  height: "4px",
                  borderRadius: "2px",
                  background:
                    progress >= (i + 1) * 12.5 ? "#4a9e6b" : "#1a2e1a",
                  transition: "background 0.3s ease",
                }}
              />
            ))}
          </div>

          <p style={{ color: "#333", fontSize: "12px", margin: 0 }}>
            {validPlants.length} plants to load
          </p>
        </div>
      )}

      {/* ── Canvas — always mounted, fades in when ready ── */}
      <Canvas
        camera={{ position: [0, 3, 10], fov: 60 }}
        style={{
          opacity: sceneReady ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
        // ✅ Prevents WebGL context loss with many models
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            console.warn("WebGL context lost — will restore");
          });
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        {/* ✅ Forest HDRI restored — no resolution limit */}
        <Environment files="/hdri/meadow_4k.hdr" background />

        {/* ✅ Real progress from drei */}
        <Suspense fallback={null}>
          <Loader
            onProgress={setProgress}
            onReady={() => setSceneReady(true)}
            baseProgress={baseProgress}
          />
          {validPlants.map((plant, index) => {
            const angle = index * 4;
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
