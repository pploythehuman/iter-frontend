import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Table } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../../pages/styles/calendar.scss';

import Event from './Event';

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
  

  const [calendarData, setCalendarData] = useState<CalendarItem[]>(
    Array.from({ length: 48 }, (_, i) => ({
      time: `${(i / 2) % 12 === 0 ? 12 : (i / 2) % 12}${i % 2 === 0 ? ':00' : ':30'} ${i < 24 ? 'AM' : 'PM'}`,
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
      day: 1, // Add day property
    },
    {
      id: 'event2',
      title: 'Event 2',
      startTime: '4:00 PM',
      endTime: '5:00 PM',
      day: 2, // Add day property
    },
  ]);
  
  function getDayEvents(calendarItem: CalendarItem, day: string): EventItem[] {
    const events = calendarItem[day];
    if (Array.isArray(events)) {
      return events;
    }
    return [];
  }

  // Drag and drop
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleEventDrop = (id: string, startTime: string, endTime: string, day: number) => {
    console.log(`Event ${id} dropped at startTime: ${startTime}, day: ${day}`);
  
    setEventsData((prevEventsData) =>
      prevEventsData.map((event) => (event.id === id ? { ...event, startTime, day } : event))
    );
  };

  const rowHeight = 40; // Calendar row height
  const drop = (e: React.DragEvent, item: { id: string }) => {
    if (!calendarRef.current) return;
  
    const droppedEvent = eventsData.find((event) => event.id === item.id);
    if (!droppedEvent) return;
  
    const calendarRect = calendarRef.current.getBoundingClientRect();
    const dropY = e.clientY - calendarRect.top;
    const dropRow = Math.floor(dropY / rowHeight);
    const newStartTimeIndex = Math.max(0, Math.min(calendarData.length - 1, dropRow));
  
    const dropX = e.clientX - calendarRect.left;
    const dayWidth = calendarRect.width / 4;
    const newDay = Math.min(4, Math.max(1, Math.ceil(dropX / dayWidth)));
  
    const newStartTime = calendarData[newStartTimeIndex].time;
    const newEndTime = calendarData[newStartTimeIndex].time;
  
    handleEventDrop(item.id, newStartTime, newEndTime, newDay);
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
        <Table
          className="calendar-table"
          columns={columns}
          dataSource={calendarData}
          pagination={false}
          // scroll={{ y: 240 }}
          scroll={{ y: 1000 }}
          bordered
          size="small"
          expandable={{
            expandedRowRender: (record: CalendarItem) => (
              <div
                ref={calendarRef}
                onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  drop(e, JSON.parse(e.dataTransfer.getData('text')));
                }}
                onDragOver={(e) => e.preventDefault()}
                style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
              >
                <div style={{ position: 'absolute', top: '-10px', left: '0', fontWeight: 'bold' }}>{record.time}</div>
                {['day1', 'day2', 'day3', 'day4'].map((day, index) => (
                  <>
                    {getDayEvents(record, day).map((event: EventItem) => (
                      <Event key={event.id} id={event.id} startTime={event.startTime} endTime={event.endTime} onDrop={(id, startTime, endTime) => handleEventDrop(id, startTime, endTime, index + 1)}>
                        {event.title}
                      </Event>
                    ))}
                  </>
                ))}
              </div>
            ),            
          }}          
        />
      </Card>
    </div>
  );
};

export default MyCalendar;
