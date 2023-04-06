import {
    WeeklyCalendar,
  } from 'antd-weekly-calendar';
  
  const events = [
    { startTime: new Date(2023, 4, 3, 12, 0, 0), endTime: new Date(2023, 4, 3, 14, 30, 0), title: 'Ap. 1', backgroundColor: 'red', eventId: '1' },
    { startTime: new Date(2023, 4, 3, 10, 0, 0), endTime: new Date(2023, 4, 3, 17, 15, 0), title: 'Ap. 1', eventId: '2' },
  ];
  
  export function MyCalendar() {
    return (
        <>
          <WeeklyCalendar
              events={events}
              onEventClick={(event) => console.log(event)}
              onSelectDate={(date) => console.log(date)}
          />
        </>
    );
  }