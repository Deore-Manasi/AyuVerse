// import Forest from "../components/Forest";

// const PittaZone = () => {
//   const plants = [{ position: [-3, 1.5, -4] }, { position: [4, 1.5, -3] }];

//   return (
//     <div style={{ height: "100vh" }}>
//       <Forest zoneColor="#ffc77d" plants={plants} />
//     </div>
//   );
// };

// export default PittaZone;

import { useEffect, useState } from "react";
import ForestScene from "../components/ForestScene";
import PlantInfoCard from "../components/PlantInfoCard";

export default function PittaZone() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/listings/tour/pitta")
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
