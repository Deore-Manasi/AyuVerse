import { useNavigate } from "react-router-dom";

export default function PlantInfoCard({ plant, onClose }) {
  const navigate = useNavigate();

  return (
    <div style={cardStyle}>
      <h1>{plant.plantName}</h1>
      <p>{plant.voiceDesc}</p>

      <button
        onClick={() => navigate(`/plant/${plant.plantName}`)}
        style={btnStyle}
      >
        Explore More 🌿
      </button>

      <button onClick={onClose} style={closeStyle}>
        Close
      </button>
    </div>
  );
}

const cardStyle = {
  position: "absolute",
  top: "40px",
  right: "40px",
  background: "rgba(0,0,0,0.85)",
  color: "white",
  padding: "20px",
  borderRadius: "15px",
  width: "280px",
  backdropFilter: "blur(8px)",
  textAlign: "center",
};

const btnStyle = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  background: "gold",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const closeStyle = {
  marginTop: "8px",
  padding: "8px",
  width: "100%",
  background: "#e9e2e2",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
};
