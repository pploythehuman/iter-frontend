import React, { useState } from 'react';
import { Resizable } from 're-resizable';

import { IEvent } from '../../interfaces/ICalendar';

interface EventProps {
  event: IEvent;
  highlight: boolean;
  isResizing: boolean;
  setIsResizing: Function;
}

const Event = ({ event, highlight, isResizing, setIsResizing }: EventProps) => {
  const [containerHeight, setContainerHeight] = useState('auto');
  if (!event) return null;

  const eventClass = highlight ? 'event-container highlight' : 'event-container';

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleResizeStop = (e: any, direction: any, ref: any) => {
    setIsResizing(false);
    setContainerHeight(ref.style.height);
  };

  return (
    <Resizable
      defaultSize={{
        width: "100%",
        height: containerHeight,
      }}
      minHeight="40px"
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      enable={{
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div className={eventClass} style={{ height: '100%' }}>
        <div style={{ marginLeft: '5px'}}>
          <p>{event.name}</p>
          <p>{`${event.startTime}-${event.endTime}`}</p>
        </div>
      </div>
    </Resizable>
  );
};

export default Event;
