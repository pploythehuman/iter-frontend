import React, { MutableRefObject, useEffect } from "react";

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

  return (
    <>
      {itineraryData.map((placeItem, index) => (
        <div
          key={index}
          style={{ margin: "20px" }}
          ref={(el) => (itineraryRefs.current[index] = el)}
        >
          <ItineraryCard
            id={placeItem.id}
            name={placeItem.name}
            imageUrl={placeItem.imageUrl}
            description={placeItem.description}
            contact={placeItem.contact}
            tags={placeItem.tags}
            date={placeItem.date}
            arrival_time={placeItem.arrival_time}
            leave_time={placeItem.leave_time}
            location={[0, 0]} // change later
            onDelete={onDelete}
          />
        </div>
      ))}
    </>
  );
};

export default ItineraryTimeline;
