import Forest from "../components/Forest";

const KaphaZone = () => {
  const plants = [{ position: [-2, 1.5, -5] }, { position: [2, 1.5, -3] }];

  return (
    <div style={{ height: "100vh" }}>
      <Forest zoneColor="#8ad3b8" plants={plants} />
    </div>
  );
};

export default KaphaZone;
