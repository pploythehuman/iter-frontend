import React, { useState, useEffect } from 'react';

import { 
  Modal, 
  Input, 
  Button, 
  TimePicker, 
  DatePicker,
  message,
} from 'antd';
import type { DatePickerProps, TimeRangePickerProps } from 'antd';
import { EnvironmentOutlined, LockOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

import { IEvent } from '../../interfaces/ICalendar';
import ImageUpload from './ImageUpload';

interface EventModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  eventItem: IEvent | null;
  addEvent: Function;
  updateEvent: Function;
  deleteEvent: Function;
}

const EventModal: React.FC<EventModalProps> = ({ 
  modalVisible, 
  setModalVisible, 
  eventItem,
  addEvent,
  deleteEvent,
}) => {
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);

  const [title, setTitle] = useState(eventItem?.title || '');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState(eventItem?.start || '');
  const [endTime, setEndTime] = useState(eventItem?.end || '');

  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setStartTime('');
    setEndTime('');
  }

  const handleDeleteEvent = () => {
    deleteEvent(eventItem);
    setModalVisible(false);
    clearInputs();
  };

  const handleAddEvent = () => {
    if (title && date && startTime && endTime) {
      alert("in");
      const newEvent: IEvent = {
        id: Date.now().toString(),
        title: title,
        start: `${date}T${startTime}`,
        end: `${date}T${endTime}`,
        allDay: false, 
        color: '#ff4d4f'
      };
      
      addEvent(newEvent);
      setModalVisible(false);
      clearInputs();
      message.success('Add place successfully')
    } else {
      message.error(`Add place unsuccessfully`)
    }
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
    setDate(dateString);
  };

  const onTimeChange: TimeRangePickerProps['onChange'] = (time, timeString) => {
    setStartTime(timeString[0]);
    setEndTime(timeString[1]);
  };

  useEffect(() => {
    setTitle(eventItem?.title || '');
    setStartTime(eventItem?.start || '');
    setEndTime(eventItem?.end || '');

    console.log("selected event", eventItem);
  }, [eventItem]);

  return(
    <>
      <Modal 
        title={eventItem?.title} //does not change when var title changes
        open={modalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={
          <>
            {eventItem != null ? (
              <>
                <Button key="back" onClick={handleDeleteEvent}>
                  Delete Event
                </Button>
                <Button key="submit" type="primary" onClick={handleAddEvent}>
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
        <div>
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
          <DatePicker 
            // value={undefined}
            onChange={onDateChange} 
            style={{ marginTop: '10px', marginRight: '10px' }}
          />
          <TimePicker.RangePicker 
            // value={startTime}
            onChange={onTimeChange}
            style={{ marginTop: '10px' }}
          />
          <Search 
            prefix={<EnvironmentOutlined style={{ color: '#bfbfbf' }}/>}
            placeholder="Search for place..." 
            onSearch={onSearch} 
            // enterButton
            style={{ marginTop: '10px'}}
          />
        </div>
      </Modal>
    </>
  )
}
export default EventModal;