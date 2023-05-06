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
      style={{ zIndex: 999}} // make event span multiple rows but not beyond navbar
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
        <div style={{ textAlign: 'left', padding: '8px'}}>
          <p style={{ margin: '0px', fontSize: 12 }}>{event.name}</p>
          <p style={{ margin: '0px', fontSize: 12  }}>{`${event.startTime}-${event.endTime}`}</p>
        </div>
      </div>
    </Resizable>
  );
};

export default Event;
