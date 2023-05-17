import React, { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Button, Card } from 'antd';

import EventModal from './EventModal';

export default function CalendarComponent() {
  const [eventModalVisible, setEventModalVisible] = useState(false);

  function handleDateSelect(selectInfo: any) {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;
  
    calendarApi.unselect();
  
    if (title) {
      calendarApi.addEvent({
        id: Date.now(), 
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }
  
  function handleEventClick(clickInfo: any) {
    console.log("clickInfo", clickInfo);
    setEventModalVisible(true);
    // if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }
  
  function handleEvents(events: any) {
    console.log(events);
  }
  
  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  return (
    <>
      <EventModal modalVisible={eventModalVisible} setModalVisible={setEventModalVisible} />
      <FullCalendar
        headerToolbar={false}
        plugins={[timeGridPlugin, interactionPlugin]} 
        initialView="timeGridFourDay" 
        allDaySlot={false} // remove all day top row
        views={{
          timeGridFourDay: {
            type: 'timeGrid',
            duration: { days: 4 },
            buttonText: '4 day'
          }
        }}
        editable={true} 
        selectable={true} 
        selectMirror={true} 
        dayMaxEvents={true} 
        weekends={true}
        events={[
          { 
            title:  'My Event',
            start:  '2023-05-17T14:30:00',
            end:  '2023-05-17T17:30:00',
            color: '#ff4d4f',
            allDay: false
          },
          { 
            title:  'My Event',
            start:  '2023-05-17T14:30:00',
            end:  '2023-05-17T17:30:00',
            color: 'var(--color-secondary-light)',
            allDay: false
          },
        ]}
        select={handleDateSelect}
        eventContent={renderEventContent} 
        eventClick={handleEventClick}
        eventsSet={handleEvents}
      />
    </>
  )
}
  