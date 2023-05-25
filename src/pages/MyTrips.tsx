import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Card, Divider, Space, Spin, Menu, Dropdown } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import { format, parseISO } from 'date-fns';

import "../pages/styles/trips.scss";
import Navbar from "../components/Navbar";
import { IItinerary } from "../interfaces/IItinerary";
import { getItineraries, deleteItinerary, createItinerary } from "../services/itinerary";

const TripCard = ({item, onDelete, onDuplicate}: {item: IItinerary, onDelete: Function, onDuplicate: Function}) => {

  const formatDate = (date: string) => {
    return format(parseISO(date), 'MMMM d, yyyy')
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => onDuplicate(item)}>Duplicate</Menu.Item> 
      <Menu.Item key="2" onClick={() => onDelete(item.id?.toString())}>Delete</Menu.Item>
    </Menu>
  );
  
  return (
    <Card
      title={
        <a 
          href={`/itinerary/${item.id}`}
          style={{ textDecoration: 'none', fontWeight: 600 }}
        >
          {item.destination}
        </a>
      }
      extra={
        <Dropdown overlay={menu}>
          <Button type="ghost">
            <EllipsisOutlined style={{ fontSize: '22px'}} />
          </Button>
        </Dropdown>}
      style={{ width: 300, minHeight: 240 }}
      hoverable
    >
      <p>{`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`}</p>
    </Card>
  );
};

const MyTrips = () => {
  const [itineraries, setItineraries] = useState<IItinerary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDuplicateItinerary = async (itineraryItem: IItinerary) => {
    // did not remove id when create
    const result = await createItinerary(itineraryItem);
    setItineraries([...itineraries, result]);
  }

  const handleDeleteItinerary = async (itineraryId: string) => {
    await deleteItinerary(itineraryId);
    const updatedItinerary = itineraries.filter(itinerary => itinerary.id?.toString() !== itineraryId);
    setItineraries(updatedItinerary);
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await getItineraries();
        setItineraries(result);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="trips-page">
      <Navbar />
      <Spin tip="Loading" spinning={isLoading}>
        <div className="trips-container">
          <h1>Current trips</h1>
          <div className="cards-container">
            <Space wrap size={[20, 20]}>
              {itineraries.length !== 0 && itineraries
                .filter((item) => new Date(item.end_date) >= new Date())
                .map((item) => <TripCard item={item} onDelete={handleDeleteItinerary} onDuplicate={handleDuplicateItinerary}/>)}
            </Space>
          </div>
          <Divider />
          <h1>Past trips</h1>
          <div className="cards-container">
            <Space wrap size={[20, 20]}>
              {itineraries.length !== 0 && itineraries
                .filter((item) => new Date(item.end_date) < new Date())
                .map((item) => <TripCard item={item} onDelete={handleDeleteItinerary} onDuplicate={handleDuplicateItinerary} />)}
            </Space>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default MyTrips;
