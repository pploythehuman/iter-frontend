import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import ItineraryNavbar from '../components/itinerary/ItineraryNavbar';
import ItineraryCard from '../components/itinerary/ItineraryCard'
import GoogleMap from "../components/maps/GoogleMaps";
import ItineraryDateTab from '../components/itinerary/ItineraryDateTab';

import { Card, Tabs } from "antd";

const { TabPane } = Tabs;

const itineraryData = [
  {
    id: 1,
    name: "Eiffel Tower",
    imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
    description: "A wrought-iron lattice tower on the Champ de Mars in Paris, France.",
    rating: 4.5,
    tags: ["landmark", "architecture"],
    date: "2023-04-01",
    time: "10:00 AM",
  },
  {
    id: 2,
    name: "Louvre Museum",
    imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
    description: "The world's largest art museum and a historic monument in Paris, France.",
    rating: 4.7,
    tags: ["museum", "art"],
    date: "2023-04-01",
    time: "2:00 PM",
  },
  {
    id: 3,
    name: "Notre-Dame Cathedral",
    imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
    description: "A medieval Catholic cathedral on the Île de la Cité in Paris, France.",
    rating: 4.6,
    tags: ["cathedral", "architecture"],
    date: "2023-04-02",
    time: "10:00 AM",
  },
  {
    id: 4,
    name: "Arc de Triomphe",
    imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
    description: "One of the most famous monuments in Paris, France.",
    rating: 4.4,
    tags: ["monument", "history"],
    date: "2023-04-02",
    time: "2:00 PM",
  },
];

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
} 

const Itinerary = () => {
  const { itineraryId } = useParams();
  const [itinerary, setItineraryData] = useState(itineraryData);
  const [activeTab, setActiveTab] = useState("timeline");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDelete = (id: number) => {
    const updatedItinerary = itinerary.filter((item) => item.id !== id);
    setItineraryData(updatedItinerary);
  };


  return (
    <div className="itinerary-page">
      <ItineraryNavbar />
      <div className="banner">
        <img src="https://planetofhotels.com/guide/sites/default/files/styles/node__blog_post__bp_banner__blog_post_banner/public/2020-12/Yaowarat-road-Bangkok.jpg" alt="Destination" />
        <div className="banner-text">
          <h1 style={{ color: 'var(--color-white)', fontFamily: 'Montserrat-Bold' }}>Destination Name</h1>
          <h5 style={{ color: 'var(--color-white)', fontFamily: 'Montserrat-SemiBold', marginTop: '10px' }}>Dates: April 1, 2023 - April 5, 2023</h5>
        </div>
      </div>
      <Tabs defaultActiveKey="timeline" onChange={(key) => setActiveTab(key)} centered style={{ width: '100%'}}>
        <TabPane tab="Timeline" key="timeline" />
        <TabPane tab="Calendar" key="calendar" />
        <TabPane tab="Map View" key="map" >
          <div style={{ borderRadius: '10px', padding: '25px'}}> 
            <GoogleMap />
          </div>

        </TabPane>
      </Tabs>
      <div className="itinerary-content">
        {activeTab === "timeline" &&
          itinerary.map((itinerary, index) => (
            <div key={index} style={{ margin: "20px" }}>
              <ItineraryCard
                name={itinerary.name}
                imageUrl={itinerary.imageUrl}
                description={itinerary.description}
                rating={itinerary.rating}
                tags={itinerary.tags}
                date={itinerary.date}
                time={itinerary.time}
                itineraryId={itinerary.id}
                onDelete={handleDelete}
              />
            </div>
        ))}

      </div>
    </div>
  );
};

export default Itinerary;
