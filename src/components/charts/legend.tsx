import React from "react";

export default function Legend({ keys, colors }) {
  const getColor = (index) => colors[index % colors.length];
  return (
    <div
      className="legend"
      style={{
        marginTop: "0.25rem",
        textAlign: "left",
        textTransform: "capitalize",
        padding: "1rem"
      }}
    >
      {keys.map((k, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: getColor(i), marginRight: "0.5rem" }}>&#9632;</span>
          <small>
            {k.Name} - {k.Value}
          </small>
        </div>
      ))}
    </div>
  );
}
