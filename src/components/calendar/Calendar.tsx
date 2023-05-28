import React, { useState, useEffect, useRef } from 'react';
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
      <CalendarComponent 
        itineraryData={itineraryData}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default MyCalendar;
