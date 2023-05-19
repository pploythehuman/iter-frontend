import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom';

import chroma from "chroma-js";
import tinycolor from 'tinycolor2';

import ItineraryNavbar from '../components/itinerary/ItineraryNavbar';
import ItineraryCard from '../components/itinerary/ItineraryCard'
import GoogleMap from "../components/maps/GoogleMaps";
import ItineraryDateTab from '../components/itinerary/ItineraryDateTab';
// import { MyCalendar }  from '../components/itinerary/WeeklyCalendarTab';
import MyCalendar  from '../components/calendar/Calendar';
import whiteImg from "../assets/white_img.png";
import bangkokImg from "../assets/bangkok_img.jpeg";
import { getItinerary } from "../services/itinerary";

import {
  UserAddOutlined,
  PlusOutlined,
  SettingOutlined
} from '@ant-design/icons';

import { Button, Card, Tabs } from "antd";

const { TabPane } = Tabs;

interface ItineraryInterface{
  id: number,
  name: string,
  imageUrl: string,
  description: string,
  rating: number,
  location: number[],
  tags: string[],
  date: string,
  time: string,
}

const Itinerary = () => {
  const { itineraryId } = useParams();
  const [textColor, setTextColor] = useState("var(--color-white)");
  const [itinerary, setItineraryData] = useState<ItineraryInterface[]>([]);
  const [activeTab, setActiveTab] = useState("timeline");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [uniqueDates, setUniqueDates] = useState<any[]>([]);
  const itineraryRefs = useRef<(HTMLDivElement | null)[]>(Array.from({ length: uniqueDates.length }, () => null));

  const [selectedDate, setSelectedDate] = useState("");

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
    const updatedItinerary = itinerary.filter((item) => item.id !== id);
    setItineraryData(updatedItinerary);
  };

  const scrollToCard = (date: string) => {
    setSelectedDate(date);

    const index = itinerary.findIndex((item) => item.date === date);
    if (index !== -1 && itineraryRefs.current[index]) {
      itineraryRefs?.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  
      const yOffset = -70;
      const yCoordinate =
        (itineraryRefs?.current[index]?.getBoundingClientRect().top ?? 0) +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: yCoordinate, behavior: "smooth" });
    }
  };

  useEffect(() => {
    console.log(itinerary)
    console.log(uniqueDates)
    getItinerary(itineraryId)
    .then( res => {
        let itineraryData:ItineraryInterface[] = JSON.parse(res.data)
        setItineraryData(itineraryData);
        setUniqueDates(Array.from(new Set(itineraryData.map(item => item.date))))
        
      }
    )
  }, [])

  useEffect(() => {
    setIsLoading(false)
    console.log(itinerary)
    console.log(uniqueDates)
  }, [itinerary, uniqueDates])

  useEffect(() => {
    setSelectedDate("")
  }, [activeTab])
  
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
        <div className="banner-button">
          <Button type="primary" icon={<PlusOutlined />} size="small" style={{ color: textColor }}>
            Add place
          </Button>
          <Button type="link" icon={<UserAddOutlined />} style={{ color: textColor, fontSize: '20px' }} />
          <Button type="link" icon={<SettingOutlined />} style={{ color: textColor, fontSize: '20px' }} />
        </div>
      </div>
      <Tabs defaultActiveKey="timeline" onChange={(key) => setActiveTab(key)} centered style={{ width: '100%', fontFamily: "Asap-Medium"}}>
        <TabPane tab="Timeline" key="timeline" />
        <TabPane tab="Calendar" key="calendar" />
        <TabPane tab="Map" key="map" >
          {/* <div style={{ borderRadius: '10px', padding: '25px'}}> 
            <GoogleMap />
          </div> */}
        </TabPane>
      </Tabs>
      
      <div className="itinerary-wrapper">
        <div className="itinerary-date-tab-container">
          <ItineraryDateTab dates={uniqueDates} onDateTabClick={(date) => scrollToCard(date)} />
        </div>
        <div className="itinerary-content">
        {!isLoading && activeTab === "timeline" &&
          itinerary.map((iti, index) => (
            <div
              key={index}
              style={{ margin: "20px" }}
              ref={(el) => (itineraryRefs.current[index] = el)}
            >
              <ItineraryCard
                name={iti.name}
                imageUrl={iti.imageUrl}
                description={iti.description}
                rating={iti.rating}
                tags={iti.tags}
                date={iti.date}
                time={iti.time}
                itineraryId={iti.id}
                onDelete={handleDelete}
              />
            </div>
        ))}
        {activeTab === "calendar" && (
          // <div className="itinerary-content">
            <MyCalendar />
          // </div>
        )}
        {activeTab === "map" && (
          <>
            <GoogleMap itineraryData={itinerary} selectedDate={selectedDate} />
          </>
        )}
        
      </div>
    </div>
    </div>
  );
};

export default Itinerary;
