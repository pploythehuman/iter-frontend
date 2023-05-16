import React, { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Button } from 'antd';

export default function CalendarComponent() {
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
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
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
    <FullCalendar
      headerToolbar={false}
      plugins={[timeGridPlugin, interactionPlugin]} 
      initialView="timeGridFourDay" 
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
        { title: 'Event 1', start: '2022-09-07' },
        { title: 'Event 2', start: '2021-09-14' }
      ]}
      select={handleDateSelect}
      eventContent={renderEventContent} 
      eventClick={handleEventClick}
      eventsSet={handleEvents}
    />
  )
}
  