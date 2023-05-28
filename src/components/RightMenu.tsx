import React from "react";
import { Menu, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
// import '../../src/index.scss';

interface RightMenuProps {
  mode: "horizontal" | "vertical" | "inline" | undefined;
}

const RightMenu: React.FC<RightMenuProps> = ({ mode }) => {
  const navigate = useNavigate();
  const userName = `${localStorage.getItem("firstname") || ''} ${localStorage.getItem("lastname") || ''}`;

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };

  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span
              className={
                getDeviceType() === "mobile" ? "username" : "username-desktop"
              }
            >
              {userName}
            </span>
          </>
        }
      >
        {/* <Menu.Item key="project">
          <CodeOutlined /> Projects
        </Menu.Item>
        <Menu.Item key="about-us">
          <UserOutlined /> Profile
        </Menu.Item> */}

        {!localStorage.getItem("auth") ? (
          <>
            <Menu.Item
              key="log-in"
              onClick={() => {
                navigate("/login");
              }}
            >
              <LoginOutlined /> Login
            </Menu.Item>
            <Menu.Item
              key="log-out"
              onClick={() => {
                logout();
                navigate("/register");
              }}
            >
              <LogoutOutlined /> Register
            </Menu.Item>
          </>
        ) : (
          <Menu.Item
            key="log-out"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <LogoutOutlined /> Logout
          </Menu.Item>
        )}
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
