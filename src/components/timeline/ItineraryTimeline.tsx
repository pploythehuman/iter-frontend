import React, { MutableRefObject, useEffect, useState } from "react";
import { FloatButton } from 'antd';
import { CarOutlined, CalendarOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

import ItineraryCard from './ItineraryCard';

interface ItineraryTimelineProps {
  itineraryData: any[];
  selectedDate: string;
  itineraryRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  onDelete: Function;
}

const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ 
  itineraryData, 
  selectedDate,
  itineraryRefs,
  onDelete,
}) => {

  const dateItems =(dateString: string) => {
    const tempDate = new Date(dateString);  
    const formattedDate = format(tempDate, 'EEEE, MMMM do');
    return formattedDate
  };

  const scrollToCard = (date: string) => {
    const index = itineraryData.findIndex((item) => item.date === date);
    if (index !== -1 && itineraryRefs.current[index]) {
      itineraryRefs?.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      const yOffset = -70;
      const yCoordinate =
        (itineraryRefs?.current[index]?.getBoundingClientRect().top ?? 0) +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: yCoordinate, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToCard(selectedDate)
  }, [selectedDate, itineraryData, itineraryRefs]);

  const displayedDates: {[key: string]: boolean} = {};

  return (
    <>
      <FloatButton.BackTop
          shape="circle"
          type="primary"
          style={{ right: 20 }}
      />
      {itineraryData.map((placeItem, index) => {
        const shouldDisplayDate = !displayedDates[placeItem.date];
        displayedDates[placeItem.date] = true;

        return (
          <div
            key={index}
            style={{ margin: "20px" }}
            ref={(el) => (itineraryRefs.current[index] = el)}
          >
            {shouldDisplayDate && (
              <h5 className="itinerary-date-header">
                <CalendarOutlined style={{ marginRight: '5px'}} />
                {dateItems(placeItem.date)}
              </h5>
            )}
            <ItineraryCard
              id={placeItem.id}
              place_id={placeItem.place_id}
              place_name={placeItem.place_name}
              web_picture_urls={placeItem.web_picture_urls}
              description={placeItem.description}
              contact={placeItem.contact}
              tags={placeItem.tags}
              date={placeItem.date}
              arrival_time={placeItem.arrival_time}
              leave_time={placeItem.leave_time}
              onDelete={onDelete}
              travel_time={placeItem.travel_time}
            />
           {/* {Object.values(placeItem.travel_time)[0] !== undefined && 
    <p className="itinerary-travel-time">
        <CarOutlined style={{ marginRight: '5px' }}/>
        {"Travel time: " + Object.values(placeItem.travel_time)[0]}
    </p>
} */}

          </div>
        );
      })}
    </>
  );
};

export default ItineraryTimeline;
