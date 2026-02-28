import Forest from "../components/Forest";

const PittaZone = () => {
  const plants = [{ position: [-3, 1.5, -4] }, { position: [4, 1.5, -3] }];

  return (
    <div style={{ height: "100vh" }}>
      <Forest zoneColor="#ffc77d" plants={plants} />
    </div>
  );
};

export default PittaZone;
