import React, { useState, useRef } from "react";
import { useParams } from 'react-router-dom';

import chroma from "chroma-js";
import tinycolor from 'tinycolor2';

import ItineraryNavbar from '../components/itinerary/ItineraryNavbar';
import ItineraryCard from '../components/itinerary/ItineraryCard'
import GoogleMap from "../components/maps/GoogleMaps";
import ItineraryDateTab from '../components/itinerary/ItineraryDateTab';
import whiteImg from "../assets/white_img.png";
import bangkokImg from "../assets/bangkok_img.jpeg";


import { Card, Tabs } from "antd";

const { TabPane } = Tabs;

const itineraryData = [
  {
    id: 1,
    name: "Eiffel Tower",
    imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
    description: "A dd-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.",
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
  const date = new Date('2023-04-02')

  const { itineraryId } = useParams();
  const [textColor, setTextColor] = useState("var(--color-white)");
  const [itinerary, setItineraryData] = useState(itineraryData);
  const [activeTab, setActiveTab] = useState("timeline");
  const [activeIndex, setActiveIndex] = useState(0);

  const thirdItineraryCardRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (event: any) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = event.target;
    canvas.width = img.width;
    canvas.height = img.height;
    if(context) {
      context.drawImage(img, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const rgba = `rgba(${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]}, ${imageData.data[3]})`;
      const hex = tinycolor(rgba).toHexString();
      const color = chroma(hex);
      const isBright = color.luminance() < 0.009;
      setTextColor(isBright ? "var(--color-black)" : "var(--color-white)");
    }
  };
  
  const handleDelete = (id: number) => {
    console.log(date.getMonth() + 1)
    const updatedItinerary = itinerary.filter((item) => item.id !== id);
    setItineraryData(updatedItinerary);
  };

  const scrollToThirdCard = () => {
    if (thirdItineraryCardRef.current) {
      thirdItineraryCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  
      const yOffset = -70; // Set the offset
      const yCoordinate = thirdItineraryCardRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yCoordinate, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="itinerary-page">
      <ItineraryNavbar />
      <div className="banner">
        <img 
          src={bangkokImg}
          // src="https://planetofhotels.com/guide/sites/default/files/styles/node__blog_post__bp_banner__blog_post_banner/public/2020-12/Yaowarat-road-Bangkok.jpg" 
          alt="Destination" 
          onLoad={handleImageLoad}
          onError={(e) => console.log("Error loading image:", e)}
        />
        <div className="banner-text">
          <h1 style={{ color: textColor, fontFamily: 'Montserrat-Bold' }}>Bangkok</h1>
          <h5 style={{ color: textColor, fontFamily: 'Montserrat-SemiBold', marginTop: '10px' }}>Dates: April 1, 2023 - April 5, 2023</h5>
        </div>
      </div>
      <Tabs defaultActiveKey="timeline" onChange={(key) => setActiveTab(key)} centered style={{ width: '100%'}}>
        <TabPane tab="Timeline" key="timeline" />
        <TabPane tab="Calendar" key="calendar" />
        <TabPane tab="Map" key="map" >
          <div style={{ borderRadius: '10px', padding: '25px'}}> 
            <GoogleMap />
          </div>
        </TabPane>
      </Tabs>
      <div className="itinerary-wrapper">
        <div className="itinerary-date-tab-container">
          <ItineraryDateTab dates={itineraryData} onFirstOptionClick={scrollToThirdCard}/>
        </div>
        <div className="itinerary-content">
          {activeTab === "timeline" && (
            itinerary.map((itinerary, index) => (
              <div key={index} style={{ margin: "20px" }} ref={index === 2 ? thirdItineraryCardRef : null}>
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
          )))}
        </div>
      </div>
    </div>

  );
};

export default Itinerary;
