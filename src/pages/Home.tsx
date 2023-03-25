import React, { useState } from 'react';
import { 
  Button, 
  Carousel, 
  Col, 
  Divider, 
  Image, 
  Row, 
  Slider, 
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
import MultiCarousel from '../components/MultiCarousel';

dayjs.extend(customParseFormat);
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  // return current && current <= dayjs().endOf('day');

  // Can not select days before today and today
  return current && current.isBefore(dayjs().startOf('day'), 'day');
};

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
  
  return (
    <>
      <QuestionModal visible={isModalOpen} onCancel={handleCancel}/>
      <Navbar />
      <div className="top-home-page">
        <div className="search-box">
          <h1 style={{ marginTop: '0px', fontFamily: 'Montserrat-Bold' }}>Plan your journey</h1>
          {destinations.map((destination, index) => (
            <Input
              key={index}
              placeholder="Destination"
              value={destination}
              onChange={(event) => handleDestinationChange(event, index)}
            />
          ))}
          <Button 
            type="link"
            style={{ margin: '0px 0px 16px 0px', padding: '0px', width: '100%', textAlign:'left' }}
            onClick={() => setDestinations([...destinations, ''])}
          >
            <h5 style={{ margin: '0px', fontSize: '13px' }}>
              + Add destination
            </h5>
          </Button>

          <DatePicker.RangePicker
            placeholder={["Start Date", "End Date"]}
            onChange={handleDateRangeChange}
            disabledDate={disabledDate}
          />
          <InputNumber
            placeholder="Number of Travellers"
            min={1}
            value={numberOfTravellers}
            onChange={handleNumberOfTravellersChange}
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
              <div>
                <Image
                  preview={false}
                  src="https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg"
                />
                <h3>Bangkok</h3>
                <Button type="primary" onClick={showModal}>
                  Book now
                </Button>
              </div>
              <div>
                <Image
                  preview={false}
                  src="https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg"
                />
                <h3>Bangkok</h3>
                <Button type="primary" onClick={showModal}>
                  Book now
                </Button>
              </div>
              <div>
                <Image
                  preview={false}
                  src="https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg"
                />
                <h3>Bangkok</h3>
                <Button type="primary" onClick={showModal}>
                  Book now
                </Button>
              </div>
              <div>
                <Image 
                  preview={false} 
                  src="https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg" />
                <h3>Bangkok</h3>
                <Button type="primary" onClick={showModal}>
                  Book now
                </Button>
              </div>
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
          <h2>Featured Destinations</h2>
          <Carousel
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
          >
            <div>
              <Image
                preview={false}
                src="https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg"
              />
              <h3>Bangkok</h3>
              <Button type="primary" onClick={showModal}>
                Book now
              </Button>
            </div>
            <div>
              <Image
                preview={false}
                src="https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg"
              />
              <h3>Bangkok</h3>
              <Button type="primary" onClick={showModal}>
                Book now
              </Button>
            </div>
            <div>
              <Image
                preview={false}
                src="https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg"
              />
              <h3>Bangkok</h3>
              <Button type="primary" onClick={showModal}>
                Book now
              </Button>
            </div>
            <div>
              <Image 
                preview={false} 
                src="https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg" />
              <h3>Bangkok</h3>
              <Button type="primary" onClick={showModal}>
                Book now
              </Button>
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
}
  




