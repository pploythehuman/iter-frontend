import React from 'react';
import { useDrag } from 'react-dnd';
import { Resizable } from 're-resizable';

interface DropResult {
  startTime: string;
  endTime: string;
  day: string;
}

interface EventProps {
  id: string;
  startTime: string;
  endTime: string;
  children?: React.ReactNode;
  onDrop: (id: string, startTime: string, endTime: string, day: number) => void;
}

const Event: React.FC<EventProps> = ({ id, startTime, endTime, onDrop, children }) => {
  const [, drag] = useDrag(() => ({
    type: 'event',
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        onDrop(item.id, dropResult.startTime, dropResult.endTime, parseInt(dropResult.day, 10));
      }      
    },
  }));
  
  return (
    <div
      ref={drag}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text', JSON.stringify({ id }))}
      onDragEnd={(e) => e.dataTransfer.clearData()}
      style={{ cursor: 'move', background: 'lightblue', padding: '4px', borderRadius: '4px' }}
    >
      <Resizable
        defaultSize={{ width: '100%', height: 'auto' }}
        minWidth="100%"
        maxWidth="100%"
        enable={{ top: false, right: false, bottom: true, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
      >
        {children}
      </Resizable>
    </div>
  );
};

export default Event;
