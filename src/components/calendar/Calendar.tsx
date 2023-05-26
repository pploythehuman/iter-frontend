import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import '../../pages/styles/calendar.scss';

import CalendarComponent from './CalendarComponent';

interface MyCalendarProps {
  itineraryData: any[];
  selectedDate: string;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ itineraryData, selectedDate }) => {
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
        <CalendarComponent 
          itineraryData={itineraryData}
          selectedDate={selectedDate}
        />
      {/* </Card> */}
    </div>
  );
};

export default MyCalendar;
