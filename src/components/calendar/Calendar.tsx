import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import Event from './Event';
import '../../pages/styles/calendar.scss';

const itineraryData = [
  {
    id: 1,
    name: "Eiffel Tower",
    imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
    description: "A dd-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.A wrought-iron lattice tower on the Champ de Mars in Paris, France.",
    rating: 4.5,
    location: [13.7494, 100.5282],
    tags: ["landmark", "architecture"],
    date: "2023-04-01",
    startTime: "10:00 AM",
    endTime: "10:00 AM",

  },
  {
    id: 2,
    name: "Louvre Museum",
    imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
    description: "The world's largest art museum and a historic monument in Paris, France.",
    rating: 4.7,
    location: [13.7441, 100.4941],
    tags: ["museum", "art"],
    date: "2023-04-01",
    startTime: "2:00 PM",
    endTime: "10:00 AM",
  },
  {
    id: 3,
    name: "Notre-Dame Cathedral",
    imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
    description: "A medieval Catholic cathedral on the Île de la Cité in Paris, France.",
    rating: 4.6,
    location: [13.7581, 100.4917],
    tags: ["cathedral", "architecture"],
    date: "2023-04-02",
    startTime: "10:00 AM",
    endTime: "11:00 AM",

  },
  {
    id: 4,
    name: "Arc de Triomphe",
    imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
    description: "One of the most famous monuments in Paris, France.",
    rating: 4.4,
    location: [13.7641, 100.4991],
    tags: ["monument", "history"],
    date: "2023-04-02",
    startTime: "5:00 PM",
    endTime: "10:00 AM",

  },
  {
    id: 5,
    name: "Place 5",
    imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
    description: "One of the most famous monuments in Paris, France.",
    rating: 4.4,
    location: [13.7499, 100.4916],
    tags: ["monument", "history"],
    date: "2023-04-09",
    startTime: "2:00 PM", 
    endTime: "10:00 AM",

  },
  {
    id: 6,
    name: "Place 6",
    imageUrl: "https://www.fodors.com/assets/destinations/21/grand-palace-night-bangkok-thailand_980x650.jpg",
    description: "One of the most famous monuments in Paris, France.",
    rating: 4.4,
    location: [13.7641, 100.4991],
    tags: ["monument", "history"],
    date: "2023-04-09",
    startTime: "2:00 PM",
    endTime: "10:00 AM",

  },
];

interface CalendarData {
  key: number;
  time: string;
  [key: string]: any;
}

const MyCalendar = () => {
  const timeSlots = Array.from({ length:24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`
  });

  const calendarDataInitial = timeSlots.map((item, index) => ({
    key: index,
    time: item,
    day1: [],
    day2: [],
    day3: [],
    day4: [],
  }));

  const [calendarData, setCalendarData] = useState<CalendarData[]>(calendarDataInitial);
  const calendarRef = useRef<HTMLDivElement>(null);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  
    if (!destination) {
      return;
    }
  
    const srcIndex = parseInt(source.droppableId.split('-')[1]);
    const destIndex = parseInt(destination.droppableId.split('-')[1]);
  
    const srcDay = source.droppableId.split('-')[0];
    const destDay = destination.droppableId.split('-')[0];
  
    const newCalendarData: CalendarData[] = [...calendarData];
    const srcEvents = newCalendarData[srcIndex][srcDay] as Event[];
    const destEvents = newCalendarData[destIndex][destDay] as Event[];
  
    const [removed] = srcEvents.splice(source.index, 1);
    destEvents.splice(destination.index, 0, removed);
  
    setCalendarData(newCalendarData);
  };
  
  function convertTo24HourFormat(time: string) {
    const [hours, minutes] = time.split(':');
    const [min, meridiem] = minutes.split(' ');
  
    let hour = parseInt(hours, 10);
    if (meridiem === 'PM' && hour !== 12) {
      hour += 12;
    } else if (meridiem === 'AM' && hour === 12) {
      hour = 0;
    }
  
    return `${hour.toString().padStart(2, '0')}:${min}`;
  }
  
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
      render: (day1: any, record: any) => (
        <Droppable droppableId={`day1-${record.key}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="day-cell">
              {day1.map((event: any, index: number) => (
                <Draggable key={event.id} draggableId={`event-${event.id}`} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Event event={event} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ),
    },
    {
      title: 'Day 2',
      dataIndex: 'day2',
      key: 'day2',
      render: (day2: any, record: any) => (
        <Droppable droppableId={`day2-${record.key}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="day-cell">
              {day2.map((event: any, index: number) => (
                <Draggable key={event.id} draggableId={`event-${event.id}`} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Event event={event} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ),
    },
    {
      title: 'Day 3',
      dataIndex: 'day3',
      key: 'day3',
      render: (day3: any, record: any) => (
        <Droppable droppableId={`day3-${record.key}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="day-cell">
              {day3.map((event: any, index: number) => (
                <Draggable key={event.id} draggableId={`event-${event.id}`} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Event event={event} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ),
    },
    {
      title: 'Day 4',
      dataIndex: 'day4',
      key: 'day4',
      render: (day4: any, record: any) => (
        <Droppable droppableId={`day4-${record.key}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="day-cell">
              {day4.map((event: any, index: number) => (
                <Draggable key={event.id} draggableId={`event-${event.id}`} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Event event={event} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ),
    },
  ];
  
  useEffect(() => {
    const newCalendarData = [...calendarDataInitial];
    itineraryData.forEach((event) => {
      const date = new Date(event.date);
      const dayDiff = Math.ceil((+date - +new Date("2023-04-01")) / (1000 * 60 * 60 * 24));
  
      // Convert to 24-hour format
      const startTime24 = convertTo24HourFormat(event.startTime);
      const hour = parseInt(startTime24.split(':')[0], 10);
  
      // for (let i = 0; i < 4; i++) {
      if (dayDiff >= 0 && dayDiff <= 3) {
        const dayKey = 'day' + (dayDiff + 1);
        const calendarItem = newCalendarData[hour];
        if (calendarItem.hasOwnProperty(dayKey)) {
          const isEventAlreadyAdded = (calendarItem as any)[dayKey].some((e: any) => e.id === event.id);
          if (!isEventAlreadyAdded) {
            (calendarItem as any)[dayKey].push(event);
          }
        }
      }
        
    });
  
    setCalendarData(newCalendarData);  
  }, []);
  

  return (
    <div className="calendar-container" ref={calendarRef}>
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="calendar">
            {(provided) => (
              <Table
                {...provided.droppableProps}
                ref={provided.innerRef}
                columns={columns}
                dataSource={calendarData}
                pagination={false}
                scroll={{ y: 500 }}
                rowClassName="time-row"
                rowKey="key"
              >
                {provided.placeholder}
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
    </div>
  );
};

export default MyCalendar;
