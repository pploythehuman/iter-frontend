import React, { useState, useEffect, useRef } from 'react';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Button, Card } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { IEvent } from '../../interfaces/ICalendar';
import EventModal from './EventModal';

const eventData = [
  { 
    id: '1',
    title: 'Event 1',
    description: 'this is a description',
    start: '2023-05-19T14:30:00',
    end: '2023-05-19T15:50:00',
    color: 'var(--color-secondary-light)',
    allDay: false
  },
  { 
    id: '2',
    title: 'Event 2',
    description: 'this is a description',
    start: '2023-05-19T14:30:00',
    end: '2023-05-19T17:30:00',
    color: 'var(--color-secondary-light)',
    allDay: false
  },
]

export default function CalendarComponent() {
  const calendarRef = useRef<any>(null);
  const [events, setEvents] = useState<IEvent[]>(checkEventOverlap([...eventData]));

  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [eventModalVisible, setEventModalVisible] = useState(false);

  const [dateRange, setDateRange] = useState<string | null>(null);
  console.log("my events", events);

  function goToNext() {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  }

  function goToPrev() {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  }

  function goToToday() {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  }

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
    setEvents(prevEvents => {
      const newEvents = prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event);
      const checkedEvents = checkEventOverlap(newEvents);
      return checkedEvents;
    });

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

  function handleDatesSet({ start, end }: { start: Date, end: Date }) {
    console.log(start.getMonth)
    const startStr = `${start.toLocaleString('default', { month: 'long' })} ${start.getDate()}`
    const endStr = `${end.toLocaleString('default', { month: 'long' })} ${end.getDate()}`
    setDateRange(`${startStr} - ${endStr}`);
  }

  function checkEventOverlap(events: IEvent[]) {
    let newEvents = [...events];
    newEvents = newEvents.map(event => ({ ...event, color: 'var(--color-secondary-light)' }));
  
    for (let i = 0; i < newEvents.length; i++) {
      for (let j = 0; j < newEvents.length; j++) {
        if (i !== j) {
          const startI = new Date(newEvents[i].start);
          const endI = new Date(newEvents[i].end);
          const startJ = new Date(newEvents[j].start);
          const endJ = new Date(newEvents[j].end);
          if (
            (startI < endJ && endI > startJ) ||
            (startJ < endI && endJ > startI)
          ) {
            newEvents[i] = { ...newEvents[i], color: '#ff4d4f' };
            newEvents[j] = { ...newEvents[j], color: '#ff4d4f' };
          } 
        }
      }
    }
    return newEvents;
  }
  
  function addEvent(event: IEvent) {
    setEvents(prevEvents => {
      const newEvents = [...prevEvents, event];
      const checkedEvents = checkEventOverlap(newEvents);
      return checkedEvents;
    });
  }

  function editEvent(event: IEvent, updatedEvent: IEvent) {
    setEvents(prevEvents => {
      const newEvents = prevEvents.map(e => e.id === event.id ? updatedEvent : e)
      const checkedEvents = checkEventOverlap(newEvents);
      return checkedEvents;
    })
  }

  function deleteEvent(event: IEvent) {
    setEvents(prevEvents => {
      const newEvents = prevEvents.filter((e) => e.id !== event.id);
      const checkedEvents = checkEventOverlap(newEvents);
      return checkedEvents;
    });
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
      <Card
        className="calendar-card"
        title={
          <div className="calendar-header">
            <div>
              <Button type="link" icon={<LeftOutlined />} onClick={goToPrev}/>
              <span>{dateRange}</span>
              <Button type="link" icon={<RightOutlined />} onClick={goToNext}/>
            </div>
            
            <Button onClick={goToToday}>Today</Button>
          </div>
        }
      >
      <EventModal 
        modalVisible={eventModalVisible} 
        setModalVisible={setEventModalVisible} 
        eventItem={selectedEvent}
        addEvent={addEvent}
        editEvent={editEvent}
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
        datesSet={handleDatesSet}
      />
      </Card>
    </>
  )
}
  