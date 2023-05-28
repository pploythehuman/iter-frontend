import React, { useState, useEffect } from 'react';

import { 
  Modal, 
  Input, 
  Button, 
  TimePicker, 
  DatePicker,
  message,
  Image
} from 'antd';
import type { DatePickerProps, TimeRangePickerProps } from 'antd';
import { EnvironmentOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

import { IEvent } from '../../interfaces/IItinerary';
import ImageUpload from './ImageUpload';
import '../../pages/styles/calendar.scss'

interface EventModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  eventItem: any;
  addEvent: Function;
  editEvent: Function;
  deleteEvent: Function;
}

const EventModal: React.FC<EventModalProps> = ({ 
  modalVisible, 
  setModalVisible, 
  eventItem,
  addEvent,
  editEvent,
  deleteEvent,
}) => {
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);

  const isEditMode = Boolean(eventItem?.id);

  const [title, setTitle] = useState(eventItem?.title || '');
  const [description, setDescription] = useState(eventItem?.description || '');
  const [date, setDate] = useState(eventItem?.date? dayjs(eventItem.date) : null);
  const [startTime, setStartTime] = useState(eventItem?.start ? dayjs(eventItem.start) : null);
  const [endTime, setEndTime] = useState(eventItem?.end ? dayjs(eventItem.end) : null);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleShowMoreLess = () => {
      setShowFullDescription(!showFullDescription);
  };

  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setDate(null);
    setStartTime(null);
    setEndTime(null);
  }

  const handleAddEvent = () => {
    if (title && date && startTime && endTime) {
      alert("in");
      const newEvent: IEvent = {
        id: Date.now().toString(), // need fix
        title: title,
        start: `${date.format('YYYY-MM-DD')}T${startTime.format('HH:mm:ss')}`,
        end: `${date.format('YYYY-MM-DD')}T${endTime.format('HH:mm:ss')}`,
        date: date,
        allDay: false, 
        color: 'var(--color-secondary-light)'
      };
      
      addEvent(newEvent);
      setModalVisible(false);
      clearInputs();
      message.success('Add event successfully')
    } else {
      message.error(`Add event unsuccessfully`)
    }
  };

  const handleEditEvent = () => {
    if (title && date && startTime && endTime) {
      alert("in edit");
      const newEvent: IEvent = {
        id: eventItem?.id,
        place_id: eventItem?.extendedProps?.place_id,
        title: title,
        description: eventItem?.extendedProps?.description,
        start: `${date.format('YYYY-MM-DD')}T${startTime.format('HH:mm:ss')}`,
        end: `${date.format('YYYY-MM-DD')}T${endTime.format('HH:mm:ss')}`,
        date: date,
        allDay: false, 
        color: 'var(--color-secondary-light)',
        web_picture_urls: eventItem?.extendedProps?.web_picture_urls,
      };
      console.log("in edit in event modal", newEvent);
      editEvent(eventItem, newEvent);
      setModalVisible(false);
      clearInputs();
      message.success('Changes are saved successfully')
    } else {
      message.error(`Failed to save changes`)
    }
  };

  const handleDeleteEvent = () => {
    deleteEvent(eventItem);
    setModalVisible(false);
    clearInputs();
    message.success('Delete event successfully')
  };

  const handleOk = () => {
    setModalVisible(false);
    clearInputs();
  }

  const handleCancel = () => {
    setModalVisible(false);
    clearInputs();
  };

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(date);
  };

  const onTimeChange: TimeRangePickerProps['onChange'] = (time, timeString) => {
    setStartTime(time ? time[0]: null);
    setEndTime(time ? time[1]: null);
  };

  useEffect(() => {
    setTitle(eventItem?.title || '');
    setDescription(eventItem?.description || '');
    setDate(eventItem?.start ? dayjs(eventItem.start) : null)
    setStartTime(eventItem?.start ? dayjs(eventItem.start) : null);
    setEndTime(eventItem?.end ? dayjs(eventItem.end) : null);
  }, [eventItem]);

  console.log("event in eventmodal", eventItem);
  return( 
    <>
      <Modal 
        title={eventItem?.title || 'Create Agenda'} //does not change when var title changes
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
        <div style={{ marginBottom: '15px' }}>
          {isEditMode ? (
            <>
              <div className={/\S/.test(eventItem?.extendedProps?.description || '') ? 'event-floating-image' : ''}>
                <Image width="260px" style={{ borderRadius: '8px' }} src={eventItem?.extendedProps?.web_picture_urls}/>
              </div>
              <div>
                <p style={{ margin: 0 }}>
                    {showFullDescription || !/\S/.test(eventItem?.extendedProps?.description || '') 
                        ? eventItem?.extendedProps?.description
                        : eventItem?.extendedProps?.description.substring(0, 470) + '...'
                    }
                </p>
                {/\S/.test(eventItem?.extendedProps?.description || '') && (
                  <a style={{ fontSize: '12px', display: 'inline' }} onClick={handleShowMoreLess}>
                      {showFullDescription ? 'Show less' : 'Show more'}
                  </a>
                )}
              </div>
            </>
          ) : (
            <>
              <ImageUpload />
              <Input 
                placeholder="Enter Name" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginTop: '10px'}}
              />

              <Input 
                placeholder="Enter Descriptions" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ marginTop: '10px'}}
              />
            </>
          )}
          <DatePicker 
            value={date? dayjs(date) : null}
            onChange={onDateChange} 
            style={{ marginTop: '10px', marginRight: '10px' }}
          />
          <TimePicker.RangePicker 
            value={[startTime, endTime]}
            onChange={onTimeChange}
            style={{ marginTop: '10px' }}
          />
          {!isEditMode && (
            <Search 
              prefix={<EnvironmentOutlined style={{ color: '#bfbfbf' }}/>}
              placeholder="Search for place..." 
              onSearch={onSearch} 
              // enterButton
              style={{ marginTop: '10px', marginBottom: '10px' }}
            />
          )}
        </div>
      </Modal>
    </>
  )
}
export default EventModal;