import React from 'react';
import { Layout } from 'antd';
import '../pages/styles/layout.scss';

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
  return (
    <Footer className="footer">
      <div className="footer-content">
        <div>
          <h3>About Us</h3>
          <p>Travel planning application that allows you to cooperate with friend in the most easy ways as possible</p>
        </div>
        <div>
          <h3>Browse</h3>
          <ul>
            <li><a href="/">Get started</a></li>
            <li><a href="/">Promotions</a></li>
            <li><a href="/">Quests</a></li>
          </ul>
        </div>
        <div>
          <h3>Become our Partner</h3>
          <ul>
            <li><a href="/">Become our partner</a></li>
            <li><a href="/">Our partners</a></li>
          </ul>
        </div>
        <div>
          <h3>Help</h3>
          <ul>
            <li><a href="/">Privacy policy</a></li>
            <li><a href="/">Cookie policy</a></li>
            <li><a href="/">Copyright policy</a></li>
            <li><a href="/">Terms of use</a></li>
          </ul>
        </div>
        <div>
          <h3>Contact Us</h3>
          <ul>
            <li><a href="/">FAQ</a></li>
            <li>Phone no: 999-999-9999</li>
            <li>Email: contact@iter.com</li>
          </ul>
        </div>
      </div>
    </Footer>

  );
};

export default FooterComponent;
