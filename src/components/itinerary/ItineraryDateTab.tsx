import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

interface DateObject {
  month: string;
  day: string;
}

interface ItineraryDateTabProps {
  dates: any[];
  onFirstOptionClick: () => void;
}

const ItineraryDateTab: React.FC<ItineraryDateTabProps> = ({ dates, onFirstOptionClick }) => {
  // const [collapsed, setCollapsed] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const dateObject = (month: string, day: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <h2 style={{ fontSize: '9px', margin: '0', fontFamily: 'ASAP-Bold'}}>{month}</h2>
      <h2 style={{ fontSize: '9px', margin: '0'}}>{day}</h2>
    </div>
  )

  const dateItems: MenuItem[] = dates.map((date, index) => {
   
    const tempDate = new Date(date.date);
    const monthString = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(tempDate);
    const dayString = tempDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 });

    console.log('date', date, monthString, dayString)
    return getItem(`Date ${index + 1}`, `date-${index}`, dateObject(monthString, dayString));
    
  });

  const items: MenuItem[] = [
    getItem('Option 1', '3', <CalendarOutlined />),
    ...dateItems,
  
    // getItem('Option 1', '1', <PieChartOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    // getItem('Option 3', '3', <ContainerOutlined />),
  
    // getItem('Navigation One', 'sub1', <MailOutlined />, [
    //   getItem('Option 5', '5'),
    //   getItem('Option 6', '6'),
    //   getItem('Option 7', '7'),
    //   getItem('Option 8', '8'),
    // ]),
  
    // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    //   getItem('Option 9', '9'),
    //   getItem('Option 10', '10'),
  
    //   getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    // ]),
  ];

  return (
    <div style={{ width: 256 }}>
      {/* <Button type="primary" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        // theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        style={{ 
          borderRadius: '10px', 
          border: 'none',
          minHeight: '100vh',
        }}
        onClick={({ key }) => {
          if (key === "3") {
            alert("clicked")
            onFirstOptionClick();
          }
        }}
      />
    </div>
  );
};

export default ItineraryDateTab;