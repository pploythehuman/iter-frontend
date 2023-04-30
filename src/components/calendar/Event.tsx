import React from 'react';

interface EventProps {
  event: any;
  highlight: boolean;
}

const Event = ({ event, highlight }: EventProps) => {
  if (!event) return null;

  const eventClass = highlight ? 'event-container highlight' : 'event-container';

  return (
    <div className={eventClass}>
      <div>
        <p>{event.name}</p>
        <p>{`${event.startTime}-${event.endTime}`}</p>
      </div>
    </div>
  );
};

export default Event;
