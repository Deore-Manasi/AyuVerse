import { useNavigate } from "react-router-dom";

export default function PlantInfoCard({ plant, onClose }) {
  const navigate = useNavigate();

  return (
    <div style={cardStyle}>
      <h2>{plant.name}</h2>
      <p>{plant.description}</p>

      <button onClick={() => navigate(`/plant/${plant.name}`)} style={btnStyle}>
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
  bottom: "40px",
  right: "40px",
  background: "rgba(0,0,0,0.85)",
  color: "white",
  padding: "20px",
  borderRadius: "15px",
  width: "280px",
  backdropFilter: "blur(8px)",
};

const btnStyle = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  background: "gold",
  border: "none",
  cursor: "pointer",
};

const closeStyle = {
  marginTop: "8px",
  padding: "8px",
  width: "100%",
  background: "#555",
  border: "none",
  cursor: "pointer",
};
