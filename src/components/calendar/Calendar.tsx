import React, { useRef } from 'react';
import '../../pages/styles/calendar.scss';

import CalendarComponent from './CalendarComponent';

interface MyCalendarProps {
  itineraryData: any[];
  selectedDate: string;
  itineraryId: string | undefined;
  onEdit: Function;
  onDelete: Function;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ itineraryData, selectedDate, itineraryId, onEdit, onDelete }) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  return (
    <div className="calendar-container" ref={calendarRef}>
      <CalendarComponent 
        itineraryData={itineraryData}
        selectedDate={selectedDate}
        itineraryId={itineraryId}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default MyCalendar;
