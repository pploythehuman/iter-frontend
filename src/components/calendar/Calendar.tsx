import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Table } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../../pages/styles/calendar.scss';

// drag and drop
import { DndProvider, useDrop, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Event from './Event';
// import CalendarTable from './CalendarTable';

interface DragItem {
  id: string;
}

interface CalendarTableProps {
  columns: any;
  dataSource: any;
  handleDrop: any;
  drop: any;
}

type CalendarItem = {
  time: string;
  id: number;
  [key: string]: string | number | EventItem[];
};

type EventItem = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  day: number;
};

const MyCalendar = () => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      width: 80,
    },
    {
      title: 'Day 1',
      dataIndex: 'day1',
      key: 'day1',
      render: (events: EventItem[]) =>
        events.map((event: EventItem) => (
          <Event
            key={event.id}
            {...event}
            onDrop={handleEventDrop}
          />
        )),
    },
    {
      title: 'Day 2',
      dataIndex: 'day2',
      key: 'day2',
      render: (events: EventItem[]) =>
        events.map((event: EventItem) => (
          <Event
            key={event.id}
            {...event}
            onDrop={handleEventDrop}
          />
        )),
    },
    {
      title: 'Day 3',
      dataIndex: 'day3',
      key: 'day3',
      render: (events: EventItem[]) =>
        events.map((event: EventItem) => (
          <Event
            key={event.id}
            {...event}
            onDrop={handleEventDrop}
          />
        )),
    },
    {
      title: 'Day 4',
      dataIndex: 'day4',
      key: 'day4',
      render: (events: EventItem[]) =>
        events.map((event: EventItem) => (
          <Event
            key={event.id}
            {...event}
            onDrop={handleEventDrop}
          />
        )),
    },
  ];
  
  const generateTimeSlots = (interval: number) => {
    const timeSlots = [];
    let currentMinutes = 0;
    while (currentMinutes < 24 * 60) {
      const hours = Math.floor(currentMinutes / 60);
      const minutes = currentMinutes % 60;
      timeSlots.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
      currentMinutes += interval;
    }
    return timeSlots;
  };
  
  const [calendarData, setCalendarData] = useState<CalendarItem[]>(
    generateTimeSlots(30).map((time, i) => ({
      time,
      id: i,
      day1: [],
      day2: [],
      day3: [],
      day4: [],
    }))
  );
  
  const [eventsData, setEventsData] = useState<EventItem[]>([
    {
      id: 'event1',
      title: 'Event 1',
      startTime: '2:30 PM',
      endTime: '3:30 PM',
      day: 1,
    },
    {
      id: 'event2',
      title: 'Event 2',
      startTime: '4:00 PM',
      endTime: '5:00 PM',
      day: 2, 
    },
    {
      id: 'event3',
      title: 'Event 3',
      startTime: '1:00 PM',
      endTime: '2:00 PM',
      day: 3,
    },
  ]);

  // Convert time
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Drag and drop
  function getDayEvents(calendarItem: CalendarItem, day: string): EventItem[] {
    const events = calendarItem[day];
    if (Array.isArray(events)) {
      return events;
    }
    return [];
  }

  const handleEventDrop = (id: string, startTime: string, endTime: string, day: number) => {
    setEventsData((prevEventsData) =>
      prevEventsData.map((event) => (event.id === id ? { ...event, startTime, endTime, day } : event))
    );
  };
  
  const [, calendarDrop] = useDrop(() => ({
    accept: 'event',
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const offset = monitor.getSourceClientOffset();
      if (!offset) return null;
      return { x: offset.x, y: offset.y, id: item.id };
    },
  }));

  const [, drop] = useDrop(() => ({
    accept: 'event',
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const offset = monitor.getSourceClientOffset();
      if (!offset) return null;
      return { x: offset.x, y: offset.y, id: item.id };
    },
  }));

  const rowHeight = 40;
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, item: DragItem) => {
    const { id } = item; // Extract the id from the item object
    const { x, y } = JSON.parse(e.dataTransfer.getData('text/plain'));
    const droppedEvent = eventsData.find((event) => event.id === id);
    if (!droppedEvent) return;
  
    const duration = timeToMinutes(droppedEvent.endTime) - timeToMinutes(droppedEvent.startTime);
  
    const calendarRect = e.currentTarget.getBoundingClientRect();
    const dropY = y - calendarRect.top;
    const dropRow = Math.floor(dropY / rowHeight);
    const newStartTimeIndex = Math.max(0, Math.min(calendarData.length - 1, dropRow));
  
    const dropX = x - calendarRect.left;
    const dayWidth = calendarRect.width / 4;
    const newDay = Math.min(4, Math.max(1, Math.ceil(dropX / dayWidth)));
  
    const newStartTime = calendarData[newStartTimeIndex].time;
    const newEndTime = minutesToTime(timeToMinutes(newStartTime) + duration);
  
    handleEventDrop(id, newStartTime, newEndTime, newDay); // Pass the id to handleEventDrop
  };
   
  
  useEffect(() => {
    const newCalendarData = calendarData.map((item) => ({ ...item, day1: [], day2: [], day3: [], day4: [] }));
    eventsData.forEach((event) => {
      const startTimeIndex = newCalendarData.findIndex((item) => item.time === event.startTime);
      if (startTimeIndex !== -1) {
        getDayEvents(newCalendarData[startTimeIndex], `day${event.day}`).push(event);
      }
    });
    setCalendarData(newCalendarData);
  }, [eventsData]);
  
  return (
    <div className="calendar-container">
      <Card
        className="calendar-card"
        title={
          <div className="calendar-header">
            <Button type="link" icon={<LeftOutlined />} />
            <span>April 1 - April 4</span>
            <Button type="link" icon={<RightOutlined />} />
          </div>
        }
      >
        <CalendarTable
          columns={columns}
          dataSource={calendarData}
          handleDrop={handleDrop}
          drop={drop} 
        />
      </Card>
    </div>
  );
};

export default MyCalendar;

const CalendarTable: React.FC<CalendarTableProps> = ({ columns, dataSource, handleDrop, drop }) => {
  return (
    <div ref={drop}>
      <Table
        className="calendar-table"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ y: 1000 }}
        bordered
        size="small"
        onRow={(record: CalendarItem) => ({
          onDrop: (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            const item = JSON.parse(e.dataTransfer.getData('text')) as DragItem;
            handleDrop(e, item); // Pass the item with id property to handleDrop
          },
          onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
          },
        })}        
      />
    </div>
  );
};



