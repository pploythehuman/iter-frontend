import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const ItineraryNavbar: React.FC = () => {
  return (
    <nav className="navbar">
    <Layout>
      <Layout.Header className="nav-header">
        <div className="logo">
          <a className="brand-font" href="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: 10, color: 'var(--color-black)', fontFamily: 'Montserrat-ExtraBold' }}>
              ITER
            </h2>
          </a>
        </div>
        <div className="navbar-menu">
          <Menu mode='horizontal'>
            <Menu.Item key="explore">Explore</Menu.Item>
            <Menu.Item key="create">Create</Menu.Item>
            <Menu.Item key="itinerary">My Itinerary</Menu.Item>
          </Menu>
        </div>
      </Layout.Header>
    </Layout>
  </nav>

  );
};

export default ItineraryNavbar;
