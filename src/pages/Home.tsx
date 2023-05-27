import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Carousel,
  Col,
  Divider,
  Image,
  Row,
  Input,
  DatePicker,
  Form,
  AutoComplete,
  Tag,
  message,
} from "antd";
import type { RangePickerProps } from "antd/es/date-picker";

import {
  EnvironmentOutlined,
  GiftOutlined,
  ThunderboltOutlined,
  UsergroupAddOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import Navbar from "../components/Navbar";
import QuestionModal from "../components/QuestionModal";
import { createBlankItinerary } from "../services/itinerary";
import { IItinerary } from "../interfaces/IItinerary";

dayjs.extend(customParseFormat);
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  // return current && current <= dayjs().endOf('day');

  // Can not select days before today and today
  return current && current.isBefore(dayjs().startOf("day"), "day");
};

const destinationData = [
  {
    title: "Bangkok",
    image:
      "https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg",
  },
  {
    title: "Bangkok",
    image:
      "https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg",
  },
  {
    title: "Bangkok",
    image:
      "https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg",
  },
  {
    title: "Bangkok",
    image:
      "https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg",
  },
];

const options = [
  { value: "Bangkok" },
  { value: "London" },
  { value: "Paris" },
  { value: "New York" },
  { value: "Tokyo" },
];

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emails, setEmails] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = useState(false);


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const handleInputChange = (event: any) => {
    if (event.key === "Enter" || event.target.value.includes(',')) {
      let newEmail = event.target.value.replace(',', '');  // remove comma if any
      if (emailPattern.test(newEmail)) {
        setEmails([...emails, newEmail]);
        form.setFieldsValue({ coTravellerEmails: '' });  // clear the input field
      } else {
        message.error("Input email is incorrect");
      }
    }
  };  

  const handleClose = (removedEmail: string) => {
    const newEmails = emails.filter((email) => email !== removedEmail);
    setEmails(newEmails);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleContinueQuestionButton = async () => {
    try {
      setHasFormBeenSubmitted(true);
      const values = await form.validateFields();
      console.log(values);
      showModal();
      form.resetFields();
      setEmails([]);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const handleCreateBlankPlanButton = async () => {
    try {
      setHasFormBeenSubmitted(true);
      const values = await form.validateFields();
      const startDate = dayjs(values.dateRange[0]).format("YYYY-MM-DD");
      const endDate = dayjs(values.dateRange[1]).format("YYYY-MM-DD");

      const blankItinerary: IItinerary = await createBlankItinerary(
        values.destination,
        [4],
        startDate,
        endDate
      );
      console.log("blankItinerary", blankItinerary);
      navigate(`itinerary/${blankItinerary.id}`);
      form.resetFields();
      setEmails([]);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  return (
    <>
      <QuestionModal visible={isModalOpen} onCancel={handleCancel} />
      <Navbar />
      <div className="top-home-page">
        <div className="search-box">
          <h1 style={{ marginTop: "0px", fontFamily: "Montserrat-Bold" }}>
            Plan your journey
          </h1>
          <Form style={{ width: "100%" }} form={form} onFinish={submitForm}>
            <Form.Item
              className="destination-input"
              name="destination"
              rules={[
                { required: true, message: "Please input your destination!" },
              ]}
            >
              <AutoComplete
                className="destination-input"
                options={options}
                style={{ textAlign: "left" }}
                // value={destination}
                // onSelect={(e) => { setDestination(e)}}
                placeholder="Destination"
              />
            </Form.Item>
            <div className="date-co-traveller-wrapper">
              <Form.Item
                className="date-input"
                name="dateRange"
                rules={[
                  { required: true, message: "Please select the date range!" },
                ]}
              >
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  placeholder={["Start Date", "End Date"]}
                  disabledDate={disabledDate}
                />
              </Form.Item>
              <Form.Item
                className="co-traveller-input"
                name="coTravellerEmails"
                rules={[
                  {
                    validator: (_, value, callback) => {
                      if (emails.length === 0  && hasFormBeenSubmitted) {
                        return Promise.reject(new Error('Please input co-travellers\' emails!'));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  value={emails.join(', ')}
                  onChange={handleInputChange}
                  placeholder="Input email and press Enter"
                  onPressEnter={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </Form.Item>

            </div>

            <div style={{ marginBottom: '16px', width: '100%' }}>
              {emails.map((email) => (
                <Tag closable onClose={() => handleClose(email)}>
                  {email}
                </Tag>
              ))}
            </div>
            <div className="button-wrapper">
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleContinueQuestionButton}
              >
                Continue to Questions
              </Button>
              <Button
                style={{
                  color: "var(--color-primary)",
                  borderColor: "var(--color-primary)",
                }}
                htmlType="submit"
                onClick={handleCreateBlankPlanButton}
              >
                Create a blank plan
              </Button>
            </div>
          </Form>
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
                <div style={{ padding: "10px" }}>
                  <h3>{destination.title}</h3>
                  <Button type="primary" onClick={() => {}}>
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
                <div style={{ padding: "10px" }}>
                  <h3>{destination.title}</h3>
                  <Button type="primary" onClick={() => {}}>
                    Book now
                  </Button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div style={{ height: "80px" }} />
      </div>
    </>
  );
}
