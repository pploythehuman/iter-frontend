import React, { useState } from 'react';
import {
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CoffeeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

import { format } from 'date-fns';

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
  onDateTabClick: (index: string) => void;
}

const ItineraryDateTab: React.FC<ItineraryDateTabProps> = ({ dates, onDateTabClick }) => {
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(ua)) {
      return "mobile";
    }
    return "desktop";
  }

  const [collapsed, setCollapsed] = useState(getDeviceType()==='mobile'? true : false);

  const toggleCollapsed = () => {
      setCollapsed(!collapsed);
  };

  const dateObject = (month: string, day: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <h2 style={{ fontSize: '9px', margin: '0', fontFamily: 'Asap-Bold'}}>{month}</h2>
      <h2 style={{ fontSize: '9px', margin: '0'}}>{day}</h2>
    </div>
  )

  const dateItems: MenuItem[] = dates.map((dateString, index) => {
    const tempDate = new Date(dateString);  
    const formattedDate = format(tempDate, 'EEEE, MMMM do');
    const monthString = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(tempDate);
    const dayString = tempDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 });

    // return getItem(`Date ${index + 1}`, `date-${dateString}`, dateObject(monthString, dayString));
    return getItem(formattedDate, `date-${dateString}`, dateObject(monthString, dayString));
  });

  const items: MenuItem[] = [
    getItem('Date', '3', <CalendarOutlined style={{ color: 'var(--color-black)' }}/>),
    ...dateItems,
    // ...dateItems,
    // ...dateItems,
  
    // getItem('Option 1', '1', <PieChartOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    // getItem('Option 3', '3', <ContainerOutlined />),
  
    // getItem('Accomondation', 'sub1', <HomeOutlined />, [
    //   getItem('Option 5', '5'),
    //   getItem('Option 6', '6'),
    //   getItem('Option 7', '7'),
    //   getItem('Option 8', '8'),
    // ]),
    // getItem('Restaurant', 'sub1', <CoffeeOutlined />, [
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
    <>
      {getDeviceType()!=='mobile' && 
        <Button type="primary" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>}
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
          const keyParts = key.split("-");
          if (keyParts.length === 4 && keyParts[0] === "date") {
            const date = keyParts.slice(1).join("-");
            console.log("date", date);
            onDateTabClick(date);
          }
        }}               
      />
    </>
  );
};

export default ItineraryDateTab;