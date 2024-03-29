import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import placeholder from '../../assets/placeholder.png';
import L, { LatLngExpression } from "leaflet";
import { getDirection } from "../../services/direction";
import { GeoJsonObject } from "geojson";
import '../../../src/index.scss';

const icon = L.icon({
  iconUrl: placeholder,
  iconSize: [38, 38],
});

const defaultCenter = {
    lat: 13.7563,
    lng: 100.5018
}

interface Position {
    lat: number; lng: number;
}

interface LeafletMapProps {
    itineraryData: any[];
    selectedDate: string;
    activeTab: string;
}

function createArrivalTime( agenda:any ) {
    let date = new Date(agenda.date)
    let [hours, mins, secs] = agenda.arrival_time.split(":");
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(mins, 10));
    date.setSeconds(parseInt(secs, 10));
    return date;
}

function calculateCenter( markers:any[] ) {
    let lats = markers.map((marker) => marker.location[0])
    let lngs = markers.map((marker) => marker.location[1])
    
    return { lat: Math.min(...lats) + ((Math.max(...lats) - Math.min(...lats)) / 2),
            lng: Math.min(...lngs) + ((Math.max(...lngs) - Math.min(...lngs)) / 2)}
}

function compareArrivalTime( agenda1:any , agenda2:any) {
    var time1 = createArrivalTime(agenda1);
    var time2 = createArrivalTime(agenda2);
    if (time1 < time2) {
        return -1;
    }
    if (time1 > time2) {
        return 1;
    }
    return 0;
}

function ResetDirection({dir, filteredMarkers}: { dir: GeoJsonObject, filteredMarkers: any[]}) {
    const map = useMap();
  
    useEffect(() => {
        let coordinates: LatLngExpression[] = filteredMarkers.map((marker) => marker.location)

        L.geoJSON(dir).addTo(map)
        map.fitBounds(L.latLngBounds(coordinates));

    }, [dir, filteredMarkers, map]);
  
    return null;
}

const LeafletMaps: React.FC<LeafletMapProps> = ({itineraryData, selectedDate, activeTab}) => {
    const [tab, setTab] = useState(activeTab);
    const [itinerary, setItinerary] = useState(itineraryData);
    const [date, setDate] = useState(selectedDate);
    const [filteredMarkers, setFilteredMarkers] = useState<any[]>([])
    const [directionJSON, setDirectionJSON] = useState<GeoJsonObject>()

    const [center, setCenter] = useState<Position>(defaultCenter)

    function ResetCenterView({pos}: {pos: Position}) {
      const map = useMap();
        console.log('POS', pos)
      useEffect(() => {
        if (pos.lat && pos.lng) {
          map.setView(
            L.latLng(pos.lat, pos.lng),
            map.getZoom(),
            {
              animate: true
            }
          )
        }
      }, [pos, map, tab]);
    
      return null;
    }

    useEffect(() => {
        let tempFilteredMarkers = selectedDate ? 
            itineraryData.filter((item) => item.date === selectedDate)
            : itineraryData
        setFilteredMarkers(
            tempFilteredMarkers.sort(compareArrivalTime)
        );
    }, [selectedDate, itineraryData]);

    useEffect(() => {
      const fetchData = async () => {
          let coordList = filteredMarkers.map((marker) => [marker.location[1], marker.location[0]])
          
          if (coordList.length >= 2) {
              const directions = await getDirection(coordList);
              console.log(directions)
              setDirectionJSON(directions.data)
          }
          else {
              setDirectionJSON(undefined)
          }
      };
      fetchData();
    
      setCenter(calculateCenter(filteredMarkers))
    }, [filteredMarkers]);
    

  useEffect(() => {
    setTab(activeTab);
}, [activeTab]);
  

    return (
        <div className="map-container">
          <MapContainer
            center={center}
            zoom={15}
            style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {filteredMarkers.map((marker, index) => (
                    <Marker position={marker.location} icon={icon}>
                        <Popup>
                            <center>
                            <b>{marker.place_name}</b> <br/>
                            {new Date(marker.date).toDateString()} <br/>
                            {marker.arrival_time}-{marker.leave_time}
                            </center>
                            
                        </Popup>
                    </Marker>
                ))}

            <ResetCenterView pos={center}/>
            {directionJSON !== undefined && (<ResetDirection dir={directionJSON} filteredMarkers={filteredMarkers}/>)}
            
            </MapContainer>
        </div>
        
    );
}

export default LeafletMaps;