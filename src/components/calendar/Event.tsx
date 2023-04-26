import React from 'react';

interface EventProps {
  event: any;
}
const Event = ({ event }: EventProps) => {
  if (!event) return null;

  return (
    <div className="event-container">
      <div>
      {/* <div className="event-info"> */}
        <p>{event.name}</p>
        <p>{`${event.startTime}-${event.endTime}`}</p>
      </div>
    </div>
  );
};

export default Event;
