import React, { useState } from 'react';
import { Rate, Tag, Button, Menu, Dropdown, message } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import noImg from '../../assets/no_img.jpeg';

interface ItineraryCardProps {
  name: string;
  imageUrl: string;
  description: string;
  rating: number;
  tags: string[];
  date: string;
  time: string;
  onDelete: Function; 
  placeId: number; 
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  name,
  imageUrl,
  description,
  rating,
  tags,
  date,
  time,
  onDelete,
  placeId,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showMore, setShowMore] = useState(false);
  
  const info = () => {
    messageApi.success('Booked Successfully');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Edit</Menu.Item>
      <Menu.Item key="2" onClick={() => onDelete(placeId)}>Delete</Menu.Item>
    </Menu>
  );

  const renderDescription = () => {
    if (description.length > 150) {
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
            {description.substring(0, getDeviceType() === 'mobile'? 120 : 400)}
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

  return (
    <div className={`itinerary-card ${showMore ? 'column-direction' : ''}`}>
      <div className="card-image">
        <img
          alt={name}
          src={imageUrl? imageUrl : noImg}
        />
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3>{name}</h3>
          <Dropdown overlay={menu}>
            <Button type="ghost">
              <EllipsisOutlined className="ellipsis" />
            </Button>
          </Dropdown>
        </div>
        {/* <Rate allowHalf disabled value={rating} /> */}
        <div className="tags">
          {tags.map((tag, index) => (
            <a key={index} href='/'>
              <Tag color="var(--color-secondary-light)">{tag}</Tag>
            </a>
          ))}
        </div>
        <p className="date-time">{date} - {time}</p>
        <p style={{ marginTop: '0px' }}>
          {renderDescription()}
        </p>
        
        {contextHolder}
        <Button type="primary" className="book-button" onClick={info}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default ItineraryCard;
