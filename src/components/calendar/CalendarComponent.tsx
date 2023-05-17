import React, { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Button, Card } from 'antd';

import { IEvent } from '../../interfaces/ICalendar';
import EventModal from './EventModal';

const eventData = [
  { 
    id: '1',
    title: 'Event 1',
    start: '2023-05-17T14:30:00',
    end: '2023-05-17T15:50:00',
    color: '#ff4d4f',
    allDay: false
  },
  { 
    id: '2',
    title: 'Event 2',
    start: '2023-05-17T14:30:00',
    end: '2023-05-17T17:30:00',
    color: 'var(--color-secondary-light)',
    allDay: false
  },
]

export default function CalendarComponent() {
  const [events, setEvents] = useState<IEvent[]>([...eventData]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const [eventModalVisible, setEventModalVisible] = useState(false);

  function handleDateSelect(selectInfo: any) {
    setSelectedEvent(null);
    setEventModalVisible(true)
  }
  
  function handleEventClick(clickInfo: any) {
    setSelectedEvent(clickInfo.event)
    setEventModalVisible(true);
    // console.log('selectedEvent', selectedEvent);
  }
  
  function handleEvents(events: any) {
    console.log(events);
  }

  function addEvent(event: IEvent) {
    setEvents(prevEvents => [...prevEvents, event]);
  }

  function updateEvent(event: IEvent) {
    // Update the event in state here
  }

  function deleteEvent(event: IEvent) {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id != event.id));
  }
  
  function renderEventContent(eventInfo: any) {
    return (
      <div className="event-content">
        <p>{eventInfo.event.title}</p>
        <b>{eventInfo.timeText}</b>
      </div>
    )
  }

  return (
    <>
      <EventModal 
        modalVisible={eventModalVisible} 
        setModalVisible={setEventModalVisible} 
        eventItem={selectedEvent}
        addEvent={addEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
      />
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
        events={events}
        // events={[
        //   { 
        //     title:  'Event 1',
        //     start:  '2023-05-17T14:30:00',
        //     end:  '2023-05-17T15:50:00',
        //     color: '#ff4d4f',
        //     allDay: false
        //   },
        //   { 
        //     title:  'Event 2',
        //     start:  '2023-05-17T14:30:00',
        //     end:  '2023-05-17T17:30:00',
        //     color: 'var(--color-secondary-light)',
        //     allDay: false
        //   },
        // ]}
        select={handleDateSelect}
        eventContent={renderEventContent} 
        eventClick={handleEventClick}
        eventsSet={handleEvents}
      />
    </>
  )
}
  