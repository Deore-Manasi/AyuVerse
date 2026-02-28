import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PlantModel = ({ position }) => {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={ref} position={position}>
      <coneGeometry args={[1, 3, 8]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

export default PlantModel;
