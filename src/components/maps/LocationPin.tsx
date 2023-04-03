import React from "react";

const LocationPin: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  return (
    <div style={{ position: "relative", transform: "translate(-50%, -100%)" }}>
      <img src="https://i.imgur.com/bQq7i3M.png" style={{ width: "32px", height: "32px" }} alt="location pin" />
      <div style={{ position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)" }}>
        <span style={{ backgroundColor: "white", borderRadius: "10px", padding: "5px" }}>Custom Location Name</span>
      </div>
    </div>
  );
};

export default LocationPin;
