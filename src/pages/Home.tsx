import React, { useEffect, useState } from 'react';
import { Button, Carousel, Col, Divider, Image, Row } from "antd";
import { EnvironmentOutlined, GiftOutlined, ThunderboltOutlined } from "@ant-design/icons";

import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <Navbar />
      <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", position: "relative" }}>
      <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", zIndex: "-1", bottom: 0 }}>
        <path fill="#56BEEC" fillOpacity="1" d="M0,64L48,90.7C96,117,192,171,288,192C384,213,480,203,576,176C672,149,768,107,864,96C960,85,1056,107,1152,122.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
        <div style={{ textAlign: "center", padding: "64px 0" }}>
          <h4 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>
            An organized way to plan a trip with your friends!
          </h4>
          <Button type="primary" size="large" style={{ borderRadius: "24px" }}>
            Start Planning!
          </Button>
        </div>
        <Divider style={{ margin: "32px 0" }} />
        <Row gutter={[32, 32]} justify="center">
          <Col xs={20} sm={10} md={8} lg={6} xl={4}>
            <div style={{ textAlign: "center", backgroundColor: "#56BEEC", padding: "16px", borderRadius: "16px" }}>
              <EnvironmentOutlined style={{ fontSize: "48px", color: "#fff" }} />
              <h5 style={{ fontSize: "24px", fontWeight: "bold", margin: "16px 0", color: "#fff" }}>Cooperate with friends & co-travellers</h5>
            </div>
          </Col>
          <Col xs={20} sm={10} md={8} lg={6} xl={4}>
            <div style={{ textAlign: "center", backgroundColor: "#56BEEC", padding: "16px", borderRadius: "16px" }}>
              <GiftOutlined style={{ fontSize: "48px", color: "#fff" }} />
              <h5 style={{ fontSize: "24px", fontWeight: "bold", margin: "16px 0", color: "#fff" }}>Earn from travelling by completing a quest</h5>
            </div>
          </Col>
          <Col xs={20} sm={10} md={8} lg={6} xl={4}>
            <div style={{ textAlign: "center", backgroundColor: "#56BEEC", padding: "16px", borderRadius: "16px" }}>
              <ThunderboltOutlined style={{ fontSize: "48px", color: "#fff" }} />
              <h5 style={{ fontSize: "24px", fontWeight: "bold", margin: "16px 0", color: "#fff" }}>Get quick access to travel essentials & recommendations</h5>
            </div>
          </Col>
        </Row>
        <Divider style={{ margin: "32px 0" }} />
      <div style={{ textAlign: "center", padding: "64px 0" }}>
          <h4 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>
            Experience the world with your loved ones!
          </h4>
          <Carousel autoplay style={{ width: "80%" }}>
            <Image src="https://a.cdn-hotels.com/gdcs/production172/d459/3af9262b-3d8b-40c6-b61d-e37ae1aa90aa.jpg" alt="travel image" />
            <Image src="https://a.cdn-hotels.com/gdcs/production172/d459/3af9262b-3d8b-40c6-b61d-e37ae1aa90aa.jpg" alt="travel image" />
            <Image src="https://a.cdn-hotels.com/gdcs/production172/d459/3af9262b-3d8b-40c6-b61d-e37ae1aa90aa.jpg" alt="travel image" />
            <Image src="https://a.cdn-hotels.com/gdcs/production172/d459/3af9262b-3d8b-40c6-b61d-e37ae1aa90aa.jpg" alt="travel image" />
          </Carousel>
        </div>
      </div> */}
    </>
  );
}
