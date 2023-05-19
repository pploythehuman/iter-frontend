import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import '../../pages/styles/calendar.scss';

import CalendarComponent from './CalendarComponent';

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
    startTime: "10:00",
    endTime: "11:00",

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
    startTime: "14:00",
    endTime: "15:00",
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
    startTime: "10:00",
    endTime: "11:00",

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
    startTime: "17:00",
    endTime: "18:00",

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
    startTime: "14:00", 
    endTime: "15:00",

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
    startTime: "16:00",
    endTime: "17:00",

  },
];

const MyCalendar = () => {
  const calendarRef = useRef<HTMLDivElement>(null);

  return (
    <div className="calendar-container" ref={calendarRef}>
      {/* <Card
        className="calendar-card"
        title={
          <div className="calendar-header">
            <Button type="link" icon={<LeftOutlined />} />
            <span>April 1 - April 4</span>
            <Button type="link" icon={<RightOutlined />} />
          </div>
        }
      > */}
        <CalendarComponent />
      {/* </Card> */}
    </div>
  );
};

export default MyCalendar;
