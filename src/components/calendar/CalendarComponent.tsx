import React, { useState, useRef } from 'react';

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
    start: '2023-05-18T14:30:00',
    end: '2023-05-18T15:50:00',
    color: '#ff4d4f',
    allDay: false
  },
  { 
    id: '2',
    title: 'Event 2',
    start: '2023-05-18T14:30:00',
    end: '2023-05-18T17:30:00',
    color: 'var(--color-secondary-light)',
    allDay: false
  },
]

export default function CalendarComponent() {
  const calendarRef = useRef<any>(null);
  const [events, setEvents] = useState<IEvent[]>([...eventData]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  console.log("my events", events);

  function handleDateSelect(selectInfo: any) {
    setSelectedEvent(null);
    setEventModalVisible(true)
  }
  
  function handleEventClick(clickInfo: any) {
    setSelectedEvent(clickInfo.event)
    setEventModalVisible(true);
  }

  function handleEventDrop(info: any) {
    let event = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      color: info.event.backgroundColor,
      allDay: info.event.allDay
    }
    handleUpdateEvent(event);
  }

  function handleEventResize(info: any) {
    let event = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      color: info.event.backgroundColor,
      allDay: info.event.allDay
    }
    handleUpdateEvent(event);
  }
  
  function handleEvents(events: any) {
    console.log("full calendar events", events);
  }

  function handleUpdateEvent(updatedEvent: IEvent) {
    // sync internal events
    setEvents(prevEvents => prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  
    //sync full calendar events
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      let event = calendarApi.getEventById(updatedEvent.id);
      if (event) {
        event.setProp('color', updatedEvent.color);
        event.setProp('title', updatedEvent.title);
        event.setDates(updatedEvent.start, updatedEvent.end, { allDay: updatedEvent.allDay });
      }
    }
  }

  function addEvent(event: IEvent) {
    setEvents(prevEvents => [...prevEvents, event]);
  }

  function deleteEvent(event: IEvent) {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
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
        updateEvent={() => {}}
        deleteEvent={deleteEvent}
      />
      <FullCalendar
        ref={calendarRef}
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
        select={handleDateSelect}
        eventContent={renderEventContent} 
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        eventsSet={handleEvents}
      />
    </>
  )
}
  