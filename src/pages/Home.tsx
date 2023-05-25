import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Carousel, 
  Col, 
  Divider, 
  Image, 
  Row, 
  Space, 
  Input, 
  DatePicker, 
  InputNumber 
} from "antd";
import type { RangePickerProps } from 'antd/es/date-picker';
import { 
  EnvironmentOutlined, 
  GiftOutlined, 
  ThunderboltOutlined, 
  UsergroupAddOutlined, 
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import Navbar from '../components/Navbar';
import QuestionModal from '../components/QuestionModal';
import { createBlankItinerary } from '../services/itinerary';

dayjs.extend(customParseFormat);
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  // return current && current <= dayjs().endOf('day');

  // Can not select days before today and today
  return current && current.isBefore(dayjs().startOf('day'), 'day');
};

const destinationData = [
  {
    title: 'Bangkok',
    image: 'https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg',
  },
  {
    title: 'Bangkok',
    image: 'https://lp-cms-production.imgix.net/2021-03/GettyRF_512268647.jpg?auto=format&q=75&w=3840'
  },
  {
    title: 'Bangkok',
    image: 'https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg',
  },
  {
    title: 'Bangkok',
    image: 'https://lp-cms-production.imgix.net/2021-03/GettyRF_512268647.jpg?auto=format&q=75&w=3840'
  },
  {
    title: 'Bangkok',
    image: 'https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg',
  },
  {
    title: 'Bangkok',
    image: 'https://lp-cms-production.imgix.net/2021-03/GettyRF_512268647.jpg?auto=format&q=75&w=3840'
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [destinations, setDestinations] = useState(['']);
  const [dateRange, setDateRange] = useState([]);
  const [numberOfTravellers, setNumberOfTravellers] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDestinationChange = (event: any, index: number) => {
    const newDestinations = [...destinations];
    newDestinations[index] = event.target.value;
    setDestinations(newDestinations);
  };
  
  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates);
  };

  const handleNumberOfTravellersChange = (value: any) => {
    setNumberOfTravellers(value);
  };

  const handleSearch = () => {
    const destinationQuery = destinations.join(', ');
    console.log(`Searching for ${destinationQuery} from ${dateRange[0]} to ${dateRange[1]} with ${numberOfTravellers} travellers`);
  };

  useEffect(() => {
    const fetchData = async() => {
      const result = await createBlankItinerary("Bangkok", [4], "2023-09-26", "2023-09-30");
      console.log("profile", result)
    }
    fetchData();
  }, [])
  
  return (
    <>
      <QuestionModal visible={isModalOpen} onCancel={handleCancel}/>
      <Navbar />
      <div className="top-home-page">
        <div className="search-box">
          <h1 style={{ marginTop: '0px', fontFamily: 'Montserrat-Bold' }}>Plan your journey</h1>
          <Input
            className="destination-input"
            style={{ marginBottom: '16px' }}
            placeholder="Destination"
            // value={destination}
          />
          <DatePicker.RangePicker
            className="date-input"
            placeholder={["Start Date", "End Date"]}
            onChange={handleDateRangeChange}
            disabledDate={disabledDate}
          />
          <Input
            className="co-traveller-input"
            style={{ marginBottom: '16px' }}
            placeholder="Co-Travellers"
            // value={email}
          />
          <Button type="primary" onClick={showModal}>
            Continue to Questions
          </Button>
          <Button style={{ marginRight: '16px', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
            Create a blank plan
          </Button>
        </div>
      </div>
      <Divider />

      <div className="home-page">
        <div className="slider-container">
          <h2>Saved Destinations</h2>
          <Carousel
            infinite={true}
            speed={1000}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay
            dots={false}
          >
            {destinationData.map((destination, index) => (
              <div>
                <Image preview={false} src={destination.image} />
                <div style={{ padding: '10px'}}>
                  <h3>{destination.title}</h3>
                  <Button type="primary" onClick={()=>{}}>
                    Book now
                  </Button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div className="feature">
              <EnvironmentOutlined className="feature-icon" />
              <h4>Explore the world</h4>
              <p>Discover new places and cultures</p>
            </div>
          </Col>
          <Col span={8}>
            <div className="feature">
              <UsergroupAddOutlined className="feature-icon" />
              {/* <GiftOutlined className="feature-icon" /> */}
              <h4>Share experiences</h4>
              <p>Cooperate with friends & co-travellers</p>
            </div>
          </Col>
          <Col span={8}>
            <div className="feature">
              <ThunderboltOutlined className="feature-icon" />
              <h4>Alternative routes</h4>
              <p>Generate alternate route based on the weather forecast</p>
            </div>
          </Col>
        </Row>
        <Divider />
        <div className="slider-container">
          <h2>Trending Destinations</h2>
          <Carousel
            infinite={true}
            speed={1000}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay
            dots={false}
          >
            {destinationData.map((destination, index) => (
              <div>
                <Image preview={false} src={destination.image} />
                <div style={{ padding: '10px'}}>
                  <h3>{destination.title}</h3>
                  <Button type="primary" onClick={()=>{}}>
                    Book now
                  </Button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div style={{ height: '80px'}} />
      </div>
    </>
  );
}
  




