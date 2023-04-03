import React from 'react';
import { GoogleMap as GoogleMapComponent, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

interface GoogleMapProps {
  itineraryData: any[];
}

const GoogleMap: React.FC<GoogleMapProps> = ({ itineraryData }) => {
  // console.log("key", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map: any) => {
    console.log('Map loaded!', map);
    setMap(map);
  }, []);

  const options = {
    styles: [
      {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#FF9B26' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#FFC16B' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#424242' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#FF9B26' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#FFC16B' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#424242' }]
      },
      {
        featureType: 'transit',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit.station',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#56BEEC' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#88DBFF' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#292929' }]
      }
    ]
  };

  // <GoogleMapComponent mapContainerStyle={containerStyle} center={center} zoom={10} options={options}>
  return (
     <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
      <GoogleMapComponent mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad}>
        {/* <Marker position={center} /> */}
        <Marker key={1} position={{ lat: -3.7492883, lng: -38.5399122 }} />
      </GoogleMapComponent>
    </LoadScript>
  );
};

export default GoogleMap;
