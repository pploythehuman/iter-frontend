import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";

interface LeftMenuProps {
  mode: "horizontal" | "vertical" | "inline" | undefined;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ mode }) => {
  let navigate = useNavigate();
  let { pathname: location } = useLocation();

  const handleMenuClick = (e: any) => {
    navigate(`/${e.key}`);
  }
  return (
    <Menu mode={mode} onClick={handleMenuClick}>
      <Menu.Item key="explore">Explore</Menu.Item>
      <Menu.Item key="my-trips">My Trips</Menu.Item>
      <Menu.Item key="about">About Us</Menu.Item>
      <Menu.Item key="contact">Contact Us</Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
