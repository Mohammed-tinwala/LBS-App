import { Html } from "@react-three/drei";

const BedLabel = ({ position, name, isMine }) => {
    return (
        <Html position={position} center distanceFactor={8}>
            <div
                style={{
                    padding: "6px 12px",
                    borderRadius: "10px",
                    background: isMine
                        ? "linear-gradient(135deg, #22c55e, #16a34a)"
                        : "rgba(0,0,0,0.7)",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    border: isMine ? "2px solid #bbf7d0" : "1px solid #ccc",
                }}
            >
                {isMine ? "⭐ " : ""}
                {name}
            </div>
        </Html>
    );
};

export default BedLabel;