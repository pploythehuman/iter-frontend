import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import chroma from "chroma-js";
import tinycolor from "tinycolor2";
import { format, parse } from "date-fns";
import { UserAddOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Tabs, Spin, Result } from "antd";

import Navbar from "../components/Navbar";
import ItineraryTimeline from "../components/timeline/ItineraryTimeline";
import LeafletMaps from "../components/maps/LeafletMaps";
import ItineraryDateTab from "../components/itinerary/ItineraryDateTab";
import MyCalendar from "../components/calendar/Calendar";
import bangkokImg from "../assets/bangkok_img.jpeg";

import { getDetailedItinerary, getItinerary } from "../services/itinerary";
import { createAndAddAgenda } from "../services/agenda";
import { IAgenda } from "../interfaces/IItinerary";

const { TabPane } = Tabs;

const Itinerary = () => {
  const { itineraryId } = useParams();
  const [textColor, setTextColor] = useState("var(--color-white)");
  const [itineraryData, setItineraryData] = useState<IAgenda[]>([]);
  const [activeTab, setActiveTab] = useState("timeline");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null | unknown>(null);

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

  const handleDelete = (id: number | string) => {
    const updatedItinerary = itineraryData.filter((item) => item.id !== id);
    setItineraryData(updatedItinerary);
  };
  console.log("itineraryData", itineraryData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const itinerary = await getItinerary(itineraryId);
        setDestination(itinerary?.destination);
        setCoTravellers([...itinerary?.co_travelers]);
        setDates([itinerary?.start_date, itinerary?.end_date]);

        const detailedItinerary: IAgenda[] = [...await getDetailedItinerary(itineraryId)];
        setItineraryData(detailedItinerary);
        setIsLoading(false);

      } catch (error) {
        console.log("error", error);
        setError(error);
        setIsLoading(false)
      }
    };

    fetchData();
    setIsLoading(false);
  }, [itineraryId]);

  useEffect(() => {
    const fetchData = async () => {
      const travel_time = {};
      // const result = await createAndAddAgenda("P02000168", travel_time, "2023-07-11", "11:00", "20:00", 54);
      // console.log("resul", result);
    }
    fetchData();
  }, [])

  return (
    <div className="itinerary-page">
      <Navbar />
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
        <div>
          {error ? (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button type="primary" href="/">Back Home</Button>}
            />
          ) : (
            <div className="itinerary-wrapper">
              <div className="itinerary-date-tab-container">
                <ItineraryDateTab
                  dates={uniqueDates}
                  onDateTabClick={(date) => setSelectedDate(date)}
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
                  <LeafletMaps
                  itineraryData={itineraryData}
                  selectedDate={selectedDate}
                  activeTab={activeTab}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default Itinerary;
