import React from 'react';
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
  const info = () => {
    messageApi.success('Booked Successfully');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Edit</Menu.Item>
      <Menu.Item key="2" onClick={() => onDelete(itineraryId)}>Delete</Menu.Item>
    </Menu>
  );

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
        <Rate value={rating} />
        <div className="tags">
          {tags.map((tag, index) => (
            <a href='/'>
              <Tag key={index} color="var(--color-secondary-light)">{tag}</Tag>
            </a>
          ))}
        </div>
        <p className="date-time">{date} - {time}</p>
        <p>{description}</p>
        
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
