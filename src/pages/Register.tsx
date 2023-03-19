import React from "react";
import { Input, Button, Divider } from "antd";
import { MailOutlined, LockOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { ReactComponent as SignInImage } from "../assets/PalmTree.svg";
import "../pages/styles/auth.scss";

const SignInPage = () => {
  return (
    <div className="main-container" style={{ backgroundColor: 'var(--color-secondary)'}}>
      <div className="main-row">
        <div className="form-container" style={{ backgroundColor: 'var(--color-secondary)'}}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ color: 'var(--color-white)', fontFamily: 'Montserrat-ExtraBold', display: 'flex' }}>
              <span className="iter-text">ITER</span>
            </h2>
          </a>          
          <div className="form-container-element">
            <h1 
              style={{ 
                fontFamily: 'Asap-Bold', 
                fontSize: 25, 
                alignItems: 'center', 
                marginBottom: 0,
                color: 'var(--color-white)'
              }}
            >
              Join Our Community
            </h1>
            <div
              style={{
                margin: '0px 0px 10px 0px',
                width: '20%',
                height: '2px',
                border: '1px solid var(--color-white)',
                backgroundColor: 'var(--color-white)',
              }}
            ></div>

            <Input
              prefix={<UserOutlined />}
              placeholder="Full Name"
              className="sign-in-input"
            />
            {/* <Input
              placeholder="Gender"
              className="sign-in-input"
            /> */}
            <Input
              prefix={<CalendarOutlined />}
              placeholder="Birthdate"
              className="sign-in-input"
            />
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              className="sign-in-input"
            />
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="sign-in-input"
            />
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              className="sign-in-input"
            />
            <Button type="primary" className="sign-in-button">
              Sign Up
            </Button>
            <Divider style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', fontSize: '13px'}}>or login using</Divider>
            <Button className="third-party-button google-button">Sign Up with Google</Button>
            <Button className="third-party-button facebook-button">Sign Up with Facebook</Button>
          </div>
          <div className="join-us-button">
            <p style={{ color: 'var(--color-white)'}}>Already have an account?</p>
            <a href="/login" style={{ color: 'var(--color-white)', marginLeft: '5px'}}> Sign in</a>
          </div>
        </div>
        <div className="image-col" style={{ backgroundColor: 'var(--color-white)'}}>
          <SignInImage className="image" />
          <h5 
            style={{ 
              color: 'var(--color-secondary)', 
              margin: '0px 0px 5px 0px'}}
            >
            Already have an account?
          </h5>
          <a href="/login">
          <Button className="mobile-join-us-button" type="primary">Sign in</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
