import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import chroma from "chroma-js";
import tinycolor from "tinycolor2";
import { format, parse } from "date-fns";
import { UserAddOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Tabs, Spin, Result } from "antd";
import queryString from 'query-string';


import Navbar from "../components/Navbar";
import ItineraryTimeline from "../components/timeline/ItineraryTimeline";
import LeafletMaps from "../components/maps/LeafletMaps";
import ItineraryDateTab from "../components/itinerary/ItineraryDateTab";
import MyCalendar from "../components/calendar/Calendar";
import bangkokImg from "../assets/bangkok_img.jpeg";

import { getDetailedItinerary, getItinerary, createRecommendedItinerary } from "../services/itinerary";
import { createAndAddAgenda, deleteAgenda, editAgenda } from "../services/agenda";
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

  const location = useLocation();
  const { placeId } = queryString.parse(location.search);
  
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

  const handleDelete = async (id: number | string) => {
    try {
      setIsLoading(true);
      const result = await deleteAgenda(id, itineraryId);
      const updatedItinerary = itineraryData.filter((item) => item.id !== id);
      setItineraryData(updatedItinerary);
      console.log("delete", result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error", error)
    }
  };

  const fetchItineraryData = async () => {
    try {
      setIsLoading(true);
      const itinerary = await getItinerary(itineraryId);
      setDestination(itinerary?.destination);
      setCoTravellers([...itinerary?.co_travelers]);
      setDates([itinerary?.start_date, itinerary?.end_date]);

      const detailedItinerary: IAgenda[] = [...await getDetailedItinerary(itineraryId)];
      console.log("unsorted itinerary", detailedItinerary);
      const sortedItinerary = [...detailedItinerary].sort((a, b) => {
        const aDate = new Date(`${a.date}T${a.arrival_time}`);
        const bDate = new Date(`${b.date}T${b.arrival_time}`);
        return aDate.getTime() - bDate.getTime();
      });        
      console.log("sorted itinerary", sortedItinerary);
      setItineraryData(sortedItinerary);
      setIsLoading(false);

    } catch (error) {
      console.log("error", error);
      setError(error);
      setIsLoading(false)
    }
  };

  console.log("itineraryData", itineraryData);
  useEffect(() => {
    fetchItineraryData();
    setIsLoading(false);
  }, [itineraryId, activeTab]);

  useEffect(() => {
    if (placeId && itineraryData.length > 0) {
      setActiveTab("calendar");
      console.log("tab", activeTab);
    }
  }, [placeId, itineraryData]);

  useEffect(() => {
  }, [activeTab])

  const buttonClick = async () => {
    // const result = await deleteAgenda(621, 54);
    // const result = await editAgenda(637, "P03014001", {}, "2023-07-8", "6:00", "21:00", 54)
    // const result = await createRecommendedItinerary();
    // const result = await createAndAddAgenda("P03014001", {}, "2023-07-19", "9:00", "16:00", 54);
    // console.log("resul", result);
  }

  const updateItineraryData = async () => {
    fetchItineraryData();
  };

  return (
    <div className="itinerary-page">
      {/* <Button onClick={buttonClick}>Click</Button> */}
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
        {/* <div className="banner-button">
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
        </div> */}
      </div>
      <Tabs
        activeKey={activeTab}
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
              <div className="itinerary-content" >
                {activeTab === "timeline" && itineraryData && itineraryId && 
                  <ItineraryTimeline 
                    itineraryData={itineraryData} 
                    selectedDate={selectedDate}
                    itineraryRefs={itineraryRefs}
                    onDelete={handleDelete}
                  />
                }
                {activeTab === "calendar" && itineraryData && itineraryId && 
                  <MyCalendar 
                    itineraryData={itineraryData} 
                    selectedDate={selectedDate}
                    itineraryId={itineraryId}
                    onEdit={editAgenda}
                    onDelete={deleteAgenda}
                    updateItineraryData={updateItineraryData}
                  />
                }
                {activeTab === "map" && itineraryData && itineraryId && (
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
