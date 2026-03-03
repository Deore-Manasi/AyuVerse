// import Forest from "../components/Forest";

// const KaphaZone = () => {
//   const plants = [{ position: [-2, 1.5, -5] }, { position: [2, 1.5, -3] }];

//   return (
//     <div style={{ height: "100vh" }}>
//       <Forest zoneColor="#8ad3b8" plants={plants} />
//     </div>
//   );
// };

// export default KaphaZone;

import { useEffect, useState } from "react";
import ForestScene from "../components/ForestScene";
import PlantInfoCard from "../components/PlantInfoCard";

export default function KaphaZone() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/listings/tour/kapha")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched plants:", data); // Debugging
        setPlants(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* 🌳 Forest Scene handles its own Canvas */}
      <ForestScene plants={plants} onPlantClick={setSelectedPlant} />

      {/* 🌿 Floating UI Card OUTSIDE 3D Canvas */}
      {selectedPlant && (
        <PlantInfoCard
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </div>
  );
}
