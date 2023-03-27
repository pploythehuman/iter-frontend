import React from "react";
import { GoogleMap as GMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const GoogleMap: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GMap mapContainerStyle={containerStyle} center={center} zoom={10} />
    </LoadScript>
  );
};

export default GoogleMap;
