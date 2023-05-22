import React, { MutableRefObject } from "react";

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
  return (
    <>
      {itineraryData.map((placeItem, index) => (
        <div
          key={index}
          style={{ margin: "20px" }}
          ref={(el) => (itineraryRefs.current[index] = el)}
        >
          <ItineraryCard
            name={placeItem.name}
            imageUrl={placeItem.imageUrl[0]}
            description={placeItem.description}
            rating={placeItem.rating}
            tags={placeItem.tags}
            date={placeItem.date}
            time={placeItem.arrival_time}
            placeId={placeItem.id}
            onDelete={onDelete}
          />
        </div>
      ))}
    </>
  );
};

export default ItineraryTimeline;
