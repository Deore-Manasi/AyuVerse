import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Sky } from "@react-three/drei";
import PlantModel from "./PlantModel";

const Forest = ({ zoneColor, plants }) => {
  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        color={zoneColor}
      />

      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="forest" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#4c8c4a" />
      </mesh>

      {/* Plants */}
      {plants.map((plant, index) => (
        <PlantModel key={index} position={plant.position} />
      ))}

      <OrbitControls enableZoom />
    </Canvas>
  );
};

export default Forest;
