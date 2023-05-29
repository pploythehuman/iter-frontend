import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

interface LeftMenuProps {
  mode: "horizontal" | "vertical" | "inline" | undefined;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ mode }) => {
  let navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    navigate(`/${e.key}`);
  }
  return (
    <Menu mode={mode} onClick={handleMenuClick}>
      {/* <Menu.Item key="my-trips">My Trips</Menu.Item> */}
      {/* <Menu.Item key="explore">Explore</Menu.Item> */}
      <Menu.Item key="activities">Activities</Menu.Item>
      <Menu.Item key="hotels">Hotels</Menu.Item>
      <Menu.Item key="restaurants">Restaurants</Menu.Item>
      <Menu.Item key="shop">Shop</Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
