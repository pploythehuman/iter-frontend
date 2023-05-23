import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import chroma from "chroma-js";
import tinycolor from "tinycolor2";
import { format, parse } from "date-fns";
import {
  UserAddOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Tabs, Spin } from "antd";

import ItineraryNavbar from "../components/itinerary/ItineraryNavbar";
import ItineraryTimeline from "../components/timeline/ItineraryTimeline";
import GoogleMap from "../components/maps/GoogleMaps";
import ItineraryDateTab from "../components/itinerary/ItineraryDateTab";
import MyCalendar from "../components/calendar/Calendar";
// import whiteImg from "../assets/white_img.png";
import bangkokImg from "../assets/bangkok_img.jpeg";

import { getItinerary, getPlace } from "../services/itinerary";

const { TabPane } = Tabs;

interface ItineraryInterface {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  rating: number;
  location: number[];
  tags: string[];
  date: string;
  arrival_time: string;
  leave_time: string;
}

const Itinerary = () => {
  const { itineraryId } = useParams();
  const [textColor, setTextColor] = useState("var(--color-white)");
  const [itineraryData, setItineraryData] = useState<ItineraryInterface[]>([]);
  const [activeTab, setActiveTab] = useState("timeline");
  // const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const uniqueDates = Array.from(
    new Set(itineraryData.map((item) => item.date))
  );
  const itineraryRefs = useRef<(HTMLDivElement | null)[]>(
    Array.from({ length: uniqueDates.length }, () => null)
  );

  const [selectedDate, setSelectedDate] = useState("");

  const [destination, setDestination] = useState<string>("");
  const [coTravellers, setCoTravellers] = useState<any[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  const convertDateFormat = (date: string) => {
    return date
      ? format(parse(date, "yyyy-MM-dd", new Date()), "MMMM d, yyyy")
      : "";
  };

  const handleImageLoad = (event: any) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = event.target;
    canvas.width = img.width;
    canvas.height = img.height;
    if (context) {
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
    const updatedItinerary = itineraryData.filter((item) => item.id !== id);
    setItineraryData(updatedItinerary);
  };

  const scrollToCard = (date: string) => {
    setSelectedDate(date);

    const index = itineraryData.findIndex((item) => item.date === date);
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

  // console.log("itineraryData", itineraryData);
  useEffect(() => {
    const fetchData = async () => {
      const itinerary = await getItinerary(itineraryId);
      setDestination(itinerary?.data?.destination);
      setCoTravellers([...itinerary?.data?.co_travelers]);
      setDates([itinerary?.data?.start_date, itinerary?.data?.end_date]);

      let plans = itinerary.data.plan;
      for (const plan of plans) {
        const place: any = await getPlace(plan.place_id);
        const newPlace = {
          id: plan.place_id,
          name: place.data.place_name,
          imageUrl: place.data.web_picture_urls,
          description: `${place.data.introduction} ${place.data.detail}`,
          rating: 4.7,
          location: [place.data.latitude, place.data.longitude],
          tags: [place.data.category_description],
          date: plan.date,
          arrival_time: plan.arrival_time,
          leave_time: plan.leave_time,
        };
        setItineraryData((prevData) => [...prevData, newPlace]);
      }
    };

    fetchData();
    setIsLoading(false);
  }, [itineraryId]);

  useEffect(() => {
    // setSelectedDate("");
  }, [activeTab]);

  return (
    <div className="itinerary-page">
      <ItineraryNavbar />
      <div className="banner">
        <img
          src={bangkokImg}
          alt="Destination"
          onLoad={handleImageLoad}
          onError={(e) => console.log("Error loading image:", e)}
        />
        <div className="banner-text">
          <h1 style={{ color: textColor, fontFamily: "Montserrat-Bold" }}>
            {destination}
          </h1>
          <h5
            style={{
              color: textColor,
              fontFamily: "Montserrat-SemiBold",
              marginTop: "10px",
            }}
          >
            {`Dates: ${convertDateFormat(dates[0])} - ${convertDateFormat(
              dates[1]
            )}`}
          </h5>
        </div>
        <div className="banner-button">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="small"
            style={{ color: textColor }}
          >
            Add place
          </Button>
          <Button
            type="link"
            icon={<UserAddOutlined />}
            style={{ color: textColor, fontSize: "20px" }}
          />
          <Button
            type="link"
            icon={<SettingOutlined />}
            style={{ color: textColor, fontSize: "20px" }}
          />
        </div>
      </div>
      <Tabs
        defaultActiveKey="timeline"
        onChange={(key) => setActiveTab(key)}
        centered
        style={{ width: "100%", fontFamily: "Asap-Medium" }}
      >
        <TabPane tab="Timeline" key="timeline" />
        <TabPane tab="Calendar" key="calendar" />
        <TabPane tab="Map" key="map" />
      </Tabs>

      <Spin tip="Loading" spinning={isLoading}>
      <div className="itinerary-wrapper">
        <div className="itinerary-date-tab-container">
          <ItineraryDateTab
            dates={uniqueDates}
            onDateTabClick={(date) => scrollToCard(date)}
          />
        </div>
        <div className="itinerary-content">
          {activeTab === "timeline" &&
            <ItineraryTimeline 
              itineraryData={itineraryData} 
              selectedDate={selectedDate}
              itineraryRefs={itineraryRefs}
              onDelete={handleDelete}
            />
          }
          {activeTab === "calendar" && 
            <MyCalendar 
              itineraryData={itineraryData} 
              selectedDate={selectedDate}
            />
          }
          {activeTab === "map" && (
            <GoogleMap
              itineraryData={itineraryData}
              selectedDate={selectedDate}
            />
          )}
        </div>
      </div>
      </Spin>
    </div>
  );
};

export default Itinerary;
