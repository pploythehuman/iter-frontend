import React from "react";
import { Menu } from "antd";

interface ItineraryDateTabProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const itineraryData = ['10', '11', '12', '13', '14']

const ItineraryDateTab: React.FC<ItineraryDateTabProps> = ({
  activeIndex,
  setActiveIndex,
}) => {
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Menu mode="vertical" selectedKeys={[activeIndex.toString()]}>
      {itineraryData.map((item: any, index: number) => (
        <Menu.Item key={index} onClick={() => handleClick(index)}>
          {item.date}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default ItineraryDateTab;
