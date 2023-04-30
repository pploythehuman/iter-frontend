import React, { useState } from 'react';
import { Rate, Tag, Button, Menu, Dropdown, message } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

interface ItineraryCardProps {
  name: string;
  imageUrl: string;
  description: string;
  rating: number;
  tags: string[];
  date: string;
  time: string;
  onDelete: Function; 
  itineraryId: number; 
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
  itineraryId,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showMore, setShowMore] = useState(false);
  
  const info = () => {
    messageApi.success('Booked Successfully');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Edit</Menu.Item>
      <Menu.Item key="2" onClick={() => onDelete(itineraryId)}>Delete</Menu.Item>
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
            {description.substring(0, 120)}
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

  return (
    <div className="itinerary-card">
      <div className="card-image">
        <img alt={name} src={imageUrl} />
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
        <Rate allowHalf disabled value={rating} />
        <div className="tags">
          {tags.map((tag, index) => (
            <a href='/'>
              <Tag key={index} color="var(--color-secondary-light)">{tag}</Tag>
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
