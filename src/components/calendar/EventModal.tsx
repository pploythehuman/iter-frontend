import React, { useState, useEffect } from 'react';

import { Modal, Input, Button, TimePicker, DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';


import ImageUpload from './ImageUpload';

interface EventModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const EventModal: React.FC<EventModalProps> = ({ modalVisible, setModalVisible }) => {
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return(
    <>
      <Modal 
        title="Event" 
        open={modalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
      >
        <div>
          <ImageUpload />
          <Input placeholder="Enter Name" style={{ marginTop: '10px'}}/>
          <Input placeholder="Enter Descriptions" style={{ marginTop: '10px'}}/>
          <DatePicker onChange={onChange} style={{ marginTop: '10px', marginRight: '10px' }}/>
          <TimePicker.RangePicker style={{ marginTop: '10px' }}/>
          <Search placeholder="Search for place..." onSearch={onSearch} style={{ marginTop: '10px'}}/>
        </div>
      </Modal>
    </>
  )
}
export default EventModal;