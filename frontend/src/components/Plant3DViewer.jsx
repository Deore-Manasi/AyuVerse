// import { Suspense, useRef, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Environment, useGLTF, Html } from "@react-three/drei";
// import * as THREE from "three";

// function Model({ url, onLoad }) {
//   const { scene } = useGLTF(url);
//   const meshRef = useRef();

//   useEffect(() => {
//     if (onLoad && scene) {
//       onLoad();
//     }
//   }, [scene, onLoad]);

//   // Calculate bounding box and center the model
//   useEffect(() => {
//     if (scene) {
//       const box = new THREE.Box3().setFromObject(scene);
//       const center = box.getCenter(new THREE.Vector3());
//       const size = box.getSize(new THREE.Vector3());

//       // Center the model
//       scene.position.x = -center.x;
//       scene.position.y = -center.y;
//       scene.position.z = -center.z;

//       // Scale to fit if needed
//       const maxDim = Math.max(size.x, size.y, size.z);
//       if (maxDim > 3) {
//         scene.scale.setScalar(3 / maxDim);
//       }
//     }
//   }, [scene]);

//   return <primitive ref={meshRef} object={scene} scale={1} />;
// }

// function LoadingSpinner() {
//   return (
//     <Html center>
//       <div
//         style={{
//           color: "#ffffff",
//           fontSize: "14px",
//           fontFamily: "system-ui",
//           padding: "20px",
//           background: "rgba(0, 0, 0, 0.5)",
//           borderRadius: "8px",
//         }}
//       >
//         Loading 3D model...
//       </div>
//     </Html>
//   );
// }

// function Plant3DViewer({ modelUrl }) {
//   const [isLoading, setIsLoading] = useState(true);

//   if (!modelUrl) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100%",
//           width: "100%",
//           color: "#ffffff",
//           fontWeight: "normal",
//           background: "rgb(0, 0, 0)",
//           fontSize: "1.2rem",
//           fontFamily: "system-ui",
//         }}
//       >
//         3D model unavailable !!
//       </div>
//     );
//   }

//   const handleModelLoad = () => {
//     setIsLoading(false);
//   };

//   return (
//     <Canvas
//       camera={{ position: [0, 0, 2], fov: 50 }}
//       style={{ width: "100%", height: "100%", background: "#000000" }}
//       gl={{
//         antialias: true,
//         alpha: false,
//         powerPreference: "high-performance",
//       }}
//       dpr={[1, 2]}
//     >
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[5, 5, 5]} intensity={1.2} />
//       <directionalLight position={[-5, -5, -5]} intensity={0.4} />
//       <pointLight position={[0, 10, 0]} intensity={0.5} />

//       <Suspense fallback={<LoadingSpinner />}>
//         <Model url={modelUrl} onLoad={handleModelLoad} />
//         <OrbitControls
//           enableZoom={true}
//           enablePan={false}
//           enableRotate={true}
//           minDistance={1}
//           maxDistance={15}
//           autoRotate={true}
//           autoRotateSpeed={1.5}
//           dampingFactor={0.05}
//           enableDamping={true}
//           rotateSpeed={0.5}
//           zoomSpeed={0.8}
//         />
//         <Environment preset="sunset" />
//       </Suspense>
//       {isLoading && <LoadingSpinner />}
//     </Canvas>
//   );
// }

// export default Plant3DViewer;

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

// ✅ Error boundary to catch useGLTF failures
import { Component } from "react";

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    // ✅ Tell parent the model failed
    this.props.onError?.();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function Model({ url, onLoad }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef();

  useEffect(() => {
    if (onLoad && scene) onLoad();
  }, [scene, onLoad]);

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      scene.position.x = -center.x;
      scene.position.y = -center.y;
      scene.position.z = -center.z;

      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 3) {
        scene.scale.setScalar(3 / maxDim);
      }
    }
  }, [scene]);

  return <primitive ref={meshRef} object={scene} scale={1} />;
}

function LoadingSpinner() {
  return (
    <Html center>
      <div
        style={{
          color: "#ffffff",
          fontSize: "14px",
          fontFamily: "system-ui",
          padding: "20px",
          background: "rgba(0,0,0,0.5)",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            border: "3px solid rgba(74,158,107,0.3)",
            borderTopColor: "#4a9e6b",
            borderRadius: "50%",
            animation: "spin 0.9s linear infinite",
            margin: "0 auto 10px",
          }}
        />
        Loading 3D model...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

// ✅ Fallback shown inside the canvas when model errors
function CanvasErrorFallback() {
  return (
    <Html center>
      <div
        style={{
          color: "#fff",
          fontSize: "14px",
          fontFamily: "system-ui",
          padding: "24px",
          background: "rgba(0,0,0,0.7)",
          borderRadius: "12px",
          textAlign: "center",
          maxWidth: "220px",
        }}
      >
        <div style={{ fontSize: "36px", marginBottom: "10px" }}>🌱</div>
        <p style={{ margin: "0 0 6px", fontWeight: 500 }}>
          3D model unavailable
        </p>
        <p style={{ margin: 0, fontSize: "12px", color: "#aaa" }}>
          {navigator.onLine ? "Couldn't load from storage." : "You're offline."}
        </p>
      </div>
    </Html>
  );
}

function Plant3DViewer({ modelUrl, onError }) {
  const [isLoading, setIsLoading] = useState(true);
  const [modelFailed, setModelFailed] = useState(false);

  // ✅ Reset states when modelUrl changes (navigating between plants)
  useEffect(() => {
    setIsLoading(true);
    setModelFailed(false);
  }, [modelUrl]);

  const handleModelLoad = () => setIsLoading(false);

  const handleModelError = () => {
    setIsLoading(false);
    setModelFailed(true);
    onError?.(); // ✅ Notify parent (PlantDetail)
  };

  // ✅ No URL — show fallback immediately, no Canvas needed
  if (!modelUrl) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          background: "#000000",
          gap: "12px",
        }}
      >
        <div style={{ fontSize: "40px" }}>🌱</div>
        <p style={{ color: "#fff", fontSize: "15px", margin: 0 }}>
          3D model unavailable
        </p>
        <p style={{ color: "#666", fontSize: "13px", margin: 0 }}>
          No model found for this plant.
        </p>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 50 }}
      style={{ width: "100%", height: "100%", background: "#000000" }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      // ✅ Catch Canvas-level errors
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", handleModelError);
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} />
      <pointLight position={[0, 10, 0]} intensity={0.5} />

      <Suspense fallback={<LoadingSpinner />}>
        {/* ✅ ErrorBoundary wraps Model — catches useGLTF crash */}
        <ModelErrorBoundary onError={handleModelError}>
          {modelFailed ? (
            <CanvasErrorFallback />
          ) : (
            <Model url={modelUrl} onLoad={handleModelLoad} />
          )}
        </ModelErrorBoundary>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          minDistance={1}
          maxDistance={15}
          autoRotate={!modelFailed}
          autoRotateSpeed={1.5}
          dampingFactor={0.05}
          enableDamping={true}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
        />
        {!modelFailed && <Environment preset="sunset" />}
      </Suspense>

      {/* ✅ Show spinner only while loading and no error yet */}
      {isLoading && !modelFailed && <LoadingSpinner />}
    </Canvas>
  );
}

export default Plant3DViewer;
