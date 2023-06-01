import React, { useState } from 'react';
import { Tag, Button, Menu, Dropdown, message } from 'antd';
import { EllipsisOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import noImg from '../assets/no_img.jpeg';
import '../../src/index.scss'
import { useLocation } from 'react-router-dom';



const PlaceCard: React.FC<any> = ({
  id,
  place_id,
  place_name,
  description,
  contact,
  category_description,
  tags,
  fullAddress,
  images,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showMore, setShowMore] = useState(false);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAddAgenda = searchParams.get('action') === 'addAgenda';
  const itineraryId = searchParams.get('itineraryId');
  const eventStart = searchParams.get('eventStart');
  const eventEnd = searchParams.get('eventEnd');


  const info = () => {
    messageApi.success('Booked Successfully');
  };

  console.log("place_id", id);
  const renderDescription = () => {
    if (description?.length > 150) {
      return showMore
        ? (
          <>
            {description}
            <p 
              className="show-more-less-button"
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
    <div 
      className={`itinerary-card ${showMore ? 'column-direction' : ''}`}
      // style={{ maxHeight: '300px'}}
    >
      <div className="card-image">
        <img
          style={{ maxHeight: '100%'}}
          alt={place_name}
          // src={(images && images?.length > 0) ? images[0] : noImg}
          src={(images?.[0]? images?.[0] : noImg)}
        />
      </div>
      <div className="card-content">
        <div className="card-header">
          <div className="header-top">
            <h3>{place_name}</h3>
            {/* <Dropdown overlay={menu}>
              <Button type="ghost">
                <EllipsisOutlined className="ellipsis" />
              </Button>
            </Dropdown> */}
          </div>
          <div className="tags">
                <a href='/'>
                  <Tag color="var(--color-secondary-light)">{category_description}</Tag>
                </a>
              {/* {tags && tags.map((tag: any, index: any) => (
                <a key={index} href='/'>
                  <Tag color="var(--color-secondary-light)">{tag}</Tag>
                </a>
              ))} */}
            </div>
          </div>
          <p className="date-time">
            {fullAddress}
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

          {isAddAgenda && <Button href={`/itinerary/${itineraryId}/?modal=true&placeId=${id}&eventStart=${eventStart}&eventEnd=${eventEnd}`} type="primary" className="book-button" onClick={info}
          >
            Book Now
          </Button>}
        </div>
      </div>
    );
};

export default PlaceCard;
