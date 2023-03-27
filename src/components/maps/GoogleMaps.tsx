import React from 'react';
import { GoogleMap as GoogleMapComponent, LoadScript, Marker } from '@react-google-maps/api';
require("dotenv").config();

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

interface GoogleMapProps {}

const GoogleMap: React.FC<GoogleMapProps> = () => {
  console.log("key", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
     {/* <LoadScript googleMapsApiKey={"AIzaSyC4w4El8szxw-8l_05Dvc7hlZjdEtiQsOE"}>  */}
      <GoogleMapComponent mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMapComponent>
    </LoadScript>
  );
};

export default GoogleMap;
