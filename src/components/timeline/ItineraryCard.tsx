import React, { useState } from 'react';
import { Rate, Tag, Button, Menu, Dropdown, message } from 'antd';
import { EllipsisOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

import noImg from '../../assets/no_img.jpeg';
import { IAgenda } from '../../interfaces/IItinerary';

interface ItineraryCardProps extends IAgenda {
  contact: any;
  onDelete: Function; 
  travel_time: any;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  id,
  place_id,
  place_name,
  web_picture_urls,
  description,
  contact,
  tags,
  date,
  arrival_time,
  leave_time,
  onDelete,
  travel_time
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showMore, setShowMore] = useState(false);
  
  const info = () => {
    messageApi.success('Booked Successfully');
  };

  const menu = (
    <Menu>
      {/* <Menu.Item key="1">Edit</Menu.Item> */}
      <Menu.Item key="2" onClick={() => onDelete(id)}>Delete</Menu.Item>
    </Menu>
  );

  const renderDescription = () => {
    if (description?.length > 150) {
      return showMore
        ? (
          <>
            {description}
            <p 
              className="show-more-less-button"
              // type="link" 
              onClick={() => setShowMore(!showMore)}
            > 
              Show less
            </p>
          </>
        )
        : (
          <>
            {description?.substring(0, getDeviceType() === 'mobile'? 120 : 350)}
            <p 
              className="show-more-less-button"
              onClick={() => setShowMore(!showMore)}
            > 
              ... Show more
            </p>
          </>
        );
    } else {
      return description;
    }
  };

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(ua)) {
      return "mobile";
    }
    return "desktop";
  }

  const PhoneNumber: React.FC<{ number: string }> = ({ number }) => (
    <a href={`tel:${number}`}>{number}</a>
  );

  const Email: React.FC<{ email: string }> = ({ email }) => (
    <a href={`mailto:${email}`}>{email}</a>
  );
  
  return (
    <div className={`itinerary-card ${showMore ? 'column-direction' : ''}`}>
      <div className="card-image">
        <img
          alt={place_name}
          src={web_picture_urls[0]? web_picture_urls[0] : noImg}
        />
      </div>
      <div className="card-content">
        <div className="card-header">
          <div className="header-top">
            <h3>{place_name}</h3>
            <Dropdown overlay={menu}>
              <Button type="ghost">
                <EllipsisOutlined className="ellipsis" />
              </Button>
            </Dropdown>
          </div>
          <div className="tags">
          {tags && tags.map((tag, index) => (
            <a key={index} href='/'>
              <Tag color="var(--color-secondary-light)">{tag}</Tag>
            </a>
          ))}
        </div>
        </div>
        <p className="date-time">
          {`${date} ${arrival_time?.substring(0, 5)}-${leave_time?.substring(0, 5)}`}
        </p>
        <p style={{ marginTop: '0px', marginBottom: '0px' }}>
          {renderDescription()}
        </p>
        {contextHolder}
          
        <p className="contact">
          {contact.mobile_number?.concat(contact.phone_number)?.length > 0 && (
            <>
              <Button type="primary" shape="circle" size="small">
                <PhoneOutlined />
              </Button>
              {contact.mobile_number.concat(contact.phone_number).map((number: string, index: number) => 
                <PhoneNumber key={index} number={number} />
              )}
            </>
          )}
          
          {contact?.emails?.length > 0 && (
            <>
              <Button type="primary" shape="circle" size="small">
                <MailOutlined />
              </Button>
              {contact.emails.map((email: string, index: number) => 
                <Email key={index} email={email} />
              )}
            </>
          )}
          
        </p>
        {/* <Button type="primary" className="book-button" onClick={info}
        >
          Book Now
        </Button> */}
      </div>
    </div>
  );
};

export default ItineraryCard;

