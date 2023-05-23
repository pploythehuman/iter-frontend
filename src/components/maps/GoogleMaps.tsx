import React, { useState, useEffect } from 'react';
import { GoogleMap as GoogleMapComponent, LoadScript, Marker } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 13.7563,
  lng: 100.5018
};

interface GoogleMapProps {
  itineraryData: any[];
  selectedDate: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ itineraryData, selectedDate }) => {
  console.log("key", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [filteredMarkers, setFilteredMarkers] = useState<any[]>([]);

  // const filteredMarkers = selectedDate
  // ? itineraryData.filter((item) => item.date === selectedDate)
  // : itineraryData;


  const onLoad = React.useCallback((map: any) => {
    // console.log('Map loaded!', map);
    setMap(map);
  }, []);

  const options = {
    styles: [
      {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }]
      },
      // {
      //   featureType: 'road',
      //   elementType: 'geometry',
      //   stylers: [{ color: '#FF9B26' }]
      // },
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
      // {
      //   featureType: 'road.highway',
      //   elementType: 'geometry',
      //   stylers: [{ color: '#FF9B26' }]
      // },
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

  const fitBounds = () => {
    if (map) {
      if (filteredMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        filteredMarkers.forEach((marker) => {
          bounds.extend(new window.google.maps.LatLng(marker.location[0], marker.location[1]));
        });
        map.fitBounds(bounds);
      } else if (map){
        map.setCenter(center);
        map.setZoom(8);
      }
    }
  };

  useEffect(() => {
    setFilteredMarkers(
      selectedDate
        ? itineraryData.filter((item) => item.date === selectedDate)
        : itineraryData
    );
  }, [selectedDate, itineraryData]);
  
  useEffect(() => {
    fitBounds();
  }, [selectedDate, itineraryData, filteredMarkers, map]); 
  
  useEffect(() => {
    fitBounds();
  }, [selectedDate, itineraryData]);  

  // <GoogleMapComponent mapContainerStyle={containerStyle} center={center} zoom={10} options={options}>
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
      <GoogleMapComponent mapContainerStyle={containerStyle} center={center} zoom={9} onLoad={onLoad} options={options}>
        {/* <MarkerF key={1} position={{ lat: 13.7462, lng: 100.5347 }} /> */}
        {filteredMarkers.map((marker, index) => (
          <MarkerF key={index} position={{ lat: marker.location[0], lng: marker.location[1] }} />
        ))}
      </GoogleMapComponent>
    </LoadScript>
  );
};

export default GoogleMap;
