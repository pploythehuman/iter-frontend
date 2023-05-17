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

import { IEvent } from '../../interfaces/ICalendar';
import ImageUpload from './ImageUpload';

interface EventModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  eventName: String | undefined;
  addEvent: Function;
}

const EventModal: React.FC<EventModalProps> = ({ 
  modalVisible, 
  setModalVisible, 
  eventName,
  addEvent,
}) => {
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddPlace = () => {
    message.success(`Add place successfully`)
  };

  const handleEditPlace = () => {
    message.success(`Changes are saved successfully`)
  };

  const handleDeletePlace = () => {
    message.success(`Delete place successfully`)
  };

  const handleAddEvent = () => {
    if (name && date && startTime && endTime) {
      alert("in");
      const newEvent: IEvent = {
        id: Date.now().toString(),
        title: name,
        start: `${date}T${startTime}`,
        end: `${date}T${endTime}`,
        allDay: false, 
        color: '#ff4d4f'
      };
      
      addEvent(newEvent);
      handleAddPlace();
      setModalVisible(false);
    } else {

    }
  };
  
  const handleOk = () => {
    setModalVisible(false);
  }

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString);
  };

  const onTimeChange: TimeRangePickerProps['onChange'] = (time, timeString) => {
    setStartTime(timeString[0]);
    setEndTime(timeString[1]);
  };

  return(
    <>
      <Modal 
        title={eventName} 
        open={modalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddEvent}>
            Add Place
          </Button>,
        ]}
      >
        <div>
          <ImageUpload />
          <Input 
            placeholder="Enter Name" 
            onChange={(e) => setName(e.target.value)}
            style={{ marginTop: '10px'}}
          />
          <Input 
            placeholder="Enter Descriptions" 
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginTop: '10px'}}
          />
          <DatePicker 
            onChange={onDateChange} 
            style={{ marginTop: '10px', marginRight: '10px' }}
          />
          <TimePicker.RangePicker 
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