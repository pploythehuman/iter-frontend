import React, { useState, useEffect } from "react";
import { Button, Card, Divider, Space, Spin, Menu, Dropdown, Empty } from "antd";
import { EllipsisOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { format, parseISO } from "date-fns";

import "../pages/styles/trips.scss";
import Navbar from "../components/Navbar";
import { IItinerary } from "../interfaces/IItinerary";
import { getItineraries, deleteItinerary, createItinerary } from "../services/itinerary";
import bangkokImg from "../assets/bangkok_img.jpeg";

const { Meta } = Card;

const TripCard = ({
  item,
  onDelete,
  onDuplicate,
}: {
  item: IItinerary;
  onDelete: Function;
  onDuplicate: Function;
}) => {
  const formatDate = (date: string) => {
    return format(parseISO(date), "MMMM d, yyyy");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => onDuplicate(item)}>Duplicate</Menu.Item>
      <Menu.Item key="2" onClick={() => onDelete(item.id?.toString())}>Delete</Menu.Item>
    </Menu>
  );

  return (
    <Card
      cover={ 
        <img alt={item.destination} src={bangkokImg} />
      }
      style={{ width: 300, minHeight: 280 }}
      hoverable
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <Meta
          title={
            <a
              href={`/itinerary/${item.id}`}
              style={{ textDecoration: "none", fontWeight: 600 }}
            >
              {item.destination}
            </a>
          }
          description={`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`}
        />
        <div style={{ marginTop: '-10px' }}>
          <Dropdown overlay={menu}>
            <Button type="ghost">
              <EllipsisOutlined style={{ fontSize: "22px" }} />
            </Button>
          </Dropdown>
        </div>
      </div>
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
  };

  const handleDeleteItinerary = async (itineraryId: string) => {
    await deleteItinerary(itineraryId);
    const updatedItinerary = itineraries.filter(
(itinerary) => itinerary.id?.toString() !== itineraryId
    );
    setItineraries(updatedItinerary);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await getItineraries();
        result.sort((a: IItinerary, b: IItinerary) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

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
              <Card className="create-trip-card" style={{ width: 300, minHeight: 280 }}>
                <Button type="primary" icon={<PlusCircleOutlined />}>Create New Trip</Button>
              </Card>
              {itineraries
                  .filter((item) => new Date(item.end_date) >= new Date())
                  .map((item) => (
                    <TripCard
                      item={item}
                      onDelete={handleDeleteItinerary}
                      onDuplicate={handleDuplicateItinerary}
                    />
                  ))}

              {itineraries.filter((item) => new Date(item.end_date) >= new Date()).length === 0 && 
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No current trips available." />
                }
            </Space>
          </div>
          <Divider />
          <h1>Past trips</h1>
          <div className="cards-container">
            <Space wrap size={[20, 20]}>
              {itineraries
                  .filter((item) => new Date(item.end_date) < new Date())
                  .map((item) => (
                    <TripCard
                      item={item}
                      onDelete={handleDeleteItinerary}
                      onDuplicate={handleDuplicateItinerary}
                    />
                  ))}

              {itineraries.filter((item) => new Date(item.end_date) < new Date()).length === 0 && 
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No past trips available." />
                }
            </Space>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default MyTrips;
