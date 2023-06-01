import React, { useState, useEffect, useRef } from "react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format } from "date-fns";

import { Button, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { IEvent, IAgenda } from "../../interfaces/IItinerary";
import EventModal from "./EventModal";

interface CalendarComponentProps {
  itineraryData: any[];
  selectedDate: string;
  itineraryId: string | undefined;
  onEdit: Function;
  onDelete: Function;
}

export default function CalendarComponent({
  itineraryData = [],
  selectedDate,
  itineraryId,
  onEdit,
  onDelete,
}: CalendarComponentProps) {
  const calendarRef = useRef<any>(null);

  const transformedData = transformRealDataToEventData(itineraryData);
  const [events, setEvents] = useState<IEvent[]>(
    checkEventOverlap([...transformedData])
  );
  const [selectedEvent, setSelectedEvent] = useState<
    IEvent | { start: string; end: string } | null
  >(null);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState<string | null>(null);
  const [initialDate, setInitialDate] = useState<string>(
    selectedDate || events?.[0]?.date
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  console.log("itineraryData from calendar", itineraryData);
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
    // setSelectedEvent(null);
    setSelectedEvent({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setEventModalVisible(true);
  }

  function handleEventClick(clickInfo: any) {
    setSelectedEvent(clickInfo.event);
    setEventModalVisible(true);
  }

  async function handleEventDrop(info: any) {
    try {
      setIsLoading(true);
      const result = await onEdit(
        info.event.id,
        info.event.extendedProps?.place_id,
        {},
        format(info?.event?.start, 'yyyy-MM-dd'),
        format(info?.event?.start, "HH:mm"),
        format(info?.event?.end, "HH:mm"),
        itineraryId,
      );
      let event = {
        id: info.event.id,
        place_id: info.event.extendedProps?.place_id,
        title: info.event.title,
        description: info.event.extendedProps?.description,
        start: info.event.startStr,
        end: info.event.endStr,
        date: info.event.startStr, // not sure
        color: info.event.backgroundColor,
        web_picture_urls: info.event.extendedProps?.web_picture_urls,
        allDay: info.event.allDay,
      };
      setIsLoading(false);
      handleUpdateEvent(event);
    } catch(errror) {
      setIsLoading(false);
      console.log("error", errror);
    }
  }

  async function handleEventResize(info: any) {
    try {
      setIsLoading(true);
      const result = await onEdit(
        info.event?.id,
        info.event?.extendedProps?.place_id,
        {},
        format(info.event?.start, 'yyyy-MM-dd'),
        format(info.event?.start, "HH:mm"),
        format(info.event?.end, "HH:mm"),
        itineraryId,
      );
      let event = {
        id: info.event.id,
        place_id: info.event.extendedProps?.place_id,
        title: info.event.title,
        description: info.event.extendedProps?.description,
        start: info.event.startStr,
        end: info.event.endStr,
        date: info.event.startStr, // not sure
        color: info.event.backgroundColor,
        web_picture_urls: info.event.extendedProps?.web_picture_urls,
        allDay: info.event.allDay,
      };
      setIsLoading(false);
      handleUpdateEvent(event);
    } catch(errror) {
      setIsLoading(false);
      console.log("error", errror);
    }
  }

  function handleEvents(events: any) {
    // console.log("full calendar events", events);
  }

  function handleUpdateEvent(updatedEvent: IEvent) {
    // sync internal events
    setEvents((prevEvents) => {
      const newEvents = prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      const checkedEvents = checkEventOverlap(newEvents);
      console.log("check overlap", checkedEvents);
      return checkedEvents;
    });

    //sync full calendar events
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      let event = calendarApi.getEventById(updatedEvent.id);
      if (event) {
        event.setProp("color", updatedEvent.color);
        event.setProp("title", updatedEvent.title);
        event.setDates(updatedEvent.start, updatedEvent.end, {
          allDay: updatedEvent.allDay,
        });
      }
    }
  }

  function handleDatesSet({ start, end }: { start: Date; end: Date }) {
    const startStr = `${start.toLocaleString("default", {
      month: "long",
    })} ${start.getDate()}`;
    const endStr = `${end.toLocaleString("default", {
      month: "long",
    })} ${end.getDate()}`;
    setDateRange(`${startStr} - ${endStr}`);
  }

  function checkEventOverlap(events: IEvent[]) {
    let newEvents = [...events];
    newEvents = newEvents.map((event) => ({
      ...event,
      color: "var(--color-secondary-light)",
    }));

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
            newEvents[i] = { ...newEvents[i], color: "#ff4d4f" };
            newEvents[j] = { ...newEvents[j], color: "#ff4d4f" };
          }
        }
      }
    }
    return newEvents;
  }

  function addEvent(event: IEvent) {
    setEvents((prevEvents) => {
      const newEvents = [...prevEvents, event];
      const checkedEvents = checkEventOverlap(newEvents);
      return checkedEvents;
    });
  }

  async function editEvent(event: IEvent, updatedEvent: IEvent) {
    try {
      setIsLoading(true);
      const result = await onEdit(
        event?.id,
        event?.extendedProps?.place_id,
        {},
        format(event?.start, 'yyyy-MM-dd'),
        format(event?.start, "HH:mm"),
        format(event?.end, "HH:mm"),
        itineraryId,
      );
      // console.log("result", result);
      setEvents(prevEvents => {
        const newEvents = prevEvents.map(e => e.id === event.id ? updatedEvent : e)
        const checkedEvents = checkEventOverlap(newEvents);
        return checkedEvents;
      })
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error", error);
    }
  }

  async function deleteEvent(event: IEvent) {
    try {
      setIsLoading(true);
      const result = await onDelete(event.id, itineraryId);
      // console.log(result);
      setEvents((prevEvents) => {
        const newEvents = prevEvents.filter((e) => e.id !== event.id);
        const checkedEvents = checkEventOverlap(newEvents);
        return checkedEvents;
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error", error);
    }
  }

  function renderEventContent(eventInfo: any) {
    return (
      <div className="event-content">
        <p>{eventInfo.event.title}</p>
        <b>{eventInfo.timeText}</b>
      </div>
    );
  }

  function transformRealDataToEventData(itineraryData: IAgenda[]) {
    return itineraryData.map((item: IAgenda) => ({
      id: `${item.id}`,
      place_id: item.place_id,
      title: item.place_name,
      description: item.description,
      web_picture_urls: item.web_picture_urls[0],
      start: `${item.date}T${item.arrival_time}`,
      end: `${item.date}T${item.leave_time}`,
      date: item.date,
      color: "var(--color-secondary-light)",
      allDay: false,
    }));
  }

  useEffect(() => {
    const transformedData = transformRealDataToEventData(itineraryData);
    setEvents(checkEventOverlap([...transformedData]));
  }, [itineraryData]);

  useEffect(() => {
    setInitialDate(selectedDate || (events.length > 0 ? events[0].date : null));
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(selectedDate || events[0]?.date);
    }
  }, [selectedDate]); //added events here

  return (
    <>
      <Card
        className="calendar-card"
        title={
          <div className="calendar-header">
            <div>
              <Button type="link" icon={<LeftOutlined />} onClick={goToPrev} />
              <span>{dateRange}</span>
              <Button type="link" icon={<RightOutlined />} onClick={goToNext} />
            </div>

            <Button onClick={goToToday}>Today</Button>
          </div>
        }
      >
        <EventModal
          modalVisible={eventModalVisible}
          setModalVisible={setEventModalVisible}
          itineraryId={itineraryId}
          eventItem={selectedEvent}
          addEvent={addEvent}
          editEvent={editEvent}
          deleteEvent={deleteEvent}
          selectedPlaceId={selectedPlaceId}
        />
        <FullCalendar
          ref={calendarRef}
          headerToolbar={false}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridFourDay"
          initialDate={initialDate || undefined}
          allDaySlot={false} // remove all day top row
          views={{
            timeGridFourDay: {
              type: "timeGrid",
              duration: { days: 4 },
              buttonText: "4 day",
            },
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
  );
}
