import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Modal,
  Input,
  Button,
  TimePicker,
  DatePicker,
  message,
  Image,
  Spin,
  AutoComplete,
  Select,
} from "antd";
import type { DatePickerProps, TimeRangePickerProps } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { format } from "date-fns";
import { IEvent } from "../../interfaces/IItinerary";
import { IPlace, getPlaces } from "../../services/place";
import { editAgenda } from "../../services/agenda";
import "../../pages/styles/calendar.scss";
import queryString from 'query-string';
import { parse } from "date-fns";
import { createAndAddAgenda } from '../../services/agenda';
import { getPlace } from '../../services/place';

const { Option } = Select;

interface EventModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  itineraryId: string | undefined;
  eventItem: any;
  addEvent: Function;
  editEvent: Function;
  deleteEvent: Function;
  selectedPlaceId: string | null;
}

const EventModal: React.FC<EventModalProps> = ({
  modalVisible,
  setModalVisible,
  itineraryId,
  eventItem,
  addEvent,
  editEvent,
  deleteEvent,
  selectedPlaceId,
}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const { Search } = Input;
  const { placeId, eventStart, eventEnd } = queryString.parse(location.search) as {
    placeId: string,
    eventStart: string,
    eventEnd: string
  };

  const clearQueryParameters = () => {
    let currentPathname = location.pathname;
    navigate(currentPathname);
  };

  const isEditMode = Boolean(eventItem?.id);

  const [title, setTitle] = useState(eventItem?.title || "");
  const [description, setDescription] = useState(eventItem?.description || "");
  const [date, setDate] = useState(
    eventItem?.date ? dayjs(eventItem.date) : null
  );
  const [startTime, setStartTime] = useState(
    eventItem?.start ? dayjs(eventItem.start) : null
  );
  const [endTime, setEndTime] = useState(
    eventItem?.end ? dayjs(eventItem.end) : null
  );
  const [loading, setLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const options = places.map((place) => ({
    value: place.place_name,
    key: place.id,
  }));

  const fetchPlaces = async (page: number | string) => {
    setLoading(true);
    const response = await getPlaces(page);
    console.log("response", response.results);
    if (response.results.length === 0) {
      setHasMore(false);
    } else {
      setPlaces((prev) => [...prev, ...response.results]);

      setPage((prev) => prev + 1);
    }
    setLoading(false);
  };

  const onScroll = (event: any) => {
    var target = event.target;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      fetchPlaces(page);
    }
  };

  // useEffect(() => {
  //   fetchPlaces(page);
  // }, []);

  const onSearch = async (value: string) => {
    setPlaces([]);
    setPage(1);
    setHasMore(true);
    fetchPlaces(1);
  };

  const handleShowMoreLess = () => {
    setShowFullDescription(!showFullDescription);
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setDate(null);
    setStartTime(null);
    setEndTime(null);
  };

  const handleAddEvent = async() => {
    if (date && startTime && endTime) {
      alert("in");
      console.log("date.toString()", date.toString())
      const result = await createAndAddAgenda(placeId, {}, date.format('YYYY-MM-DD'), startTime.format('HH:mm'), endTime.format('HH:mm'), itineraryId);
      const place = await getPlace(placeId);
      const newEvent: IEvent = {
        id: Date.now().toString(), // need fix
        title: place.place_name,
        start: `${date.format("YYYY-MM-DD")}T${startTime.format("HH:mm:ss")}`,
        end: `${date.format("YYYY-MM-DD")}T${endTime.format("HH:mm:ss")}`,
        date: date,
        allDay: false,
        color: "var(--color-secondary-light)",
      };

      addEvent(newEvent);
      setModalVisible(false);
      clearInputs();
      clearQueryParameters();
      message.success("Add event successfully");
    } else {
      message.error(`Add event unsuccessfully`);
    }
  };

  const handleEditEvent = async () => {
    if (title && date && startTime && endTime) {
      const result = await editAgenda(
        eventItem?.id,
        eventItem?.extendedProps?.place_id,
        {},
        date.format("YYYY-MM-DD"),
        startTime.format("HH:mm:ss"),
        endTime.format("HH:mm:ss"),
        itineraryId
      );
      const newEvent: IEvent = {
        id: eventItem?.id,
        place_id: eventItem?.extendedProps?.place_id,
        title: title,
        description: eventItem?.extendedProps?.description,
        start: `${date.format("YYYY-MM-DD")}T${startTime.format("HH:mm:ss")}`,
        end: `${date.format("YYYY-MM-DD")}T${endTime.format("HH:mm:ss")}`,
        date: date,
        allDay: false,
        color: "var(--color-secondary-light)",
        web_picture_urls: eventItem?.extendedProps?.web_picture_urls,
      };
      console.log("in edit in event modal", newEvent);
      editEvent(eventItem, newEvent);
      setModalVisible(false);
      clearInputs();
      message.success("Changes are saved successfully");
    } else {
      message.error(`Failed to save changes`);
    }
  };

  const handleDeleteEvent = () => {
    deleteEvent(eventItem);
    setModalVisible(false);
    clearInputs();
    message.success("Delete event successfully");
  };

  const handleOk = () => {
    setModalVisible(false);
    clearInputs();
  };

  const handleCancel = () => {
    setModalVisible(false);
    clearInputs();
  };

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(date);
  };

  const onTimeChange: TimeRangePickerProps["onChange"] = (time, timeString) => {
    setStartTime(time ? time[0] : null);
    setEndTime(time ? time[1] : null);
  };

  useEffect(() => {
    setTitle(eventItem?.title || "");
    setDescription(eventItem?.description || "");
    setDate(eventItem?.start ? dayjs(eventItem.start) : null);
    setStartTime(eventItem?.start ? dayjs(eventItem.start) : null);
    setEndTime(eventItem?.end ? dayjs(eventItem.end) : null);
  }, [eventItem]);

  console.log("selectedPlaceId", selectedPlaceId);
  useEffect(() => {
    if (placeId) {
      console.log("create1", eventStart)
      let [dateTime, offset] = eventStart.split(" ");
      let date = parse(dateTime, "yyyy-MM-dd'T'HH:mm:ss", new Date());

      let [endDateTime, eOffset] = eventStart.split(" ");
      let endDate = parse(endDateTime, "yyyy-MM-dd'T'HH:mm:ss", new Date());

      setDate(dayjs(date));
      setStartTime(dayjs(date));
      setEndTime(dayjs(date));
      setModalVisible(true);
    }
  }, [placeId]);
  
  return (
    <>
      <Modal
        title={eventItem?.title || "Create Agenda"} //does not change when var title changes
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <>
            {isEditMode ? (
              <>
                <Button key="back" onClick={handleDeleteEvent}>
                  Delete Event
                </Button>
                <Button key="submit" type="primary" onClick={handleEditEvent}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button key="submit" type="primary" onClick={handleAddEvent}>
                  Add Event
                </Button>
              </>
            )}
          </>
        }
      >
        <div style={{ marginBottom: "15px" }}>
          {isEditMode ? (
            <>
              <div
                className={
                  /\S/.test(eventItem?.extendedProps?.description || "")
                    ? "event-floating-image"
                    : ""
                }
              >
                <Image
                  width="260px"
                  style={{ borderRadius: "8px" }}
                  src={eventItem?.extendedProps?.web_picture_urls}
                />
              </div>
              <div>
                <p style={{ margin: 0 }}>
                  {showFullDescription ||
                  !/\S/.test(eventItem?.extendedProps?.description || "")
                    ? eventItem?.extendedProps?.description
                    : eventItem?.extendedProps?.description.substring(0, 470) +
                      "..."}
                </p>
                {/\S/.test(eventItem?.extendedProps?.description || "") && (
                  <a
                    style={{ fontSize: "12px", display: "inline" }}
                    onClick={handleShowMoreLess}
                  >
                    {showFullDescription ? "Show less" : "Show more"}
                  </a>
                )}
              </div>
            </>
          ) : (
            <>
            </>
          )}
          <div style={{ width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
              <DatePicker 
                value={date? dayjs(date) : null}
                onChange={onDateChange} 
                style={{ marginTop: '10px',  width: '33%' }}
              />
              <TimePicker.RangePicker 
                value={[startTime, endTime]}
                onChange={onTimeChange}
                style={{ marginTop: '10px', width: '63%' }}
              />
            </div>
            {!isEditMode && (
              <>
              {/* <Select
                // mode="tags"
                // options={options}
                style={{ width: '100%', marginTop: '16px', marginBottom: '16px' }}
                placeholder="Search for place..."
                onPopupScroll={onScroll}
              >
                {!loading ? places.map(place => <Option key={place.id}>{place.place_name}</Option>) : [...places.map(place => <Option key={place.id}>{place.place_name}</Option>), <Option key="loading">Loading...</Option>]}
              </Select> */}
              <Button style={{ width: '40%', marginTop: '16px' }} href={`/explore/?itineraryId=${itineraryId}&action=addAgenda&eventStart=${eventItem?.start}&eventEnd=${eventItem?.end}`} type='primary'>Explore more</Button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default EventModal;
