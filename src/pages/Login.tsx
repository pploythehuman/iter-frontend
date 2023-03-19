import React from "react";
import { Input, Button, Divider } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { ReactComponent as SignInImage } from "../assets/PalmTree.svg";
import "../pages/styles/auth.scss";

const SignInPage = () => {
  return (
    <div className="main-container">
      <div className="main-row">
        <div className="form-container">
          <a href="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ color: 'var(--color-secondary)', fontFamily: 'Montserrat-ExtraBold', display: 'flex' }}>
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
                color: 'var(--color-secondary)'
              }}
            >
              Sign In to Account
            </h1>
            <div
              style={{
                margin: '0px 0px 10px 0px',
                width: '20%',
                height: '2px',
                border: '1px solid var(--color-secondary)',
                backgroundColor: 'var(--color-secondary)',
              }}
            ></div>

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
            <Button type="primary" className="sign-in-button">
              Sign In
            </Button>
            <a href="/" className="forgot-password-link" style={{ fontSize: '13px'}}>
              forgot password?
            </a>
            <Button className="third-party-button google-button">Sign In with Google</Button>
            <Button className="third-party-button facebook-button">Sign In with Facebook</Button>
          </div>
          <div className="join-us-button">
            <p>Don't have an account?</p>
            <Button className="mobile-join-us-button" type="primary">Sign up</Button>
          </div>
        </div>
        <div className="image-col">
          <SignInImage className="image" />
          <h5 
            style={{ 
              color: 'var(--color-white)', 
              margin: '0px 0px 5px 0px'}}
            >
            Don't have an account?
          </h5>
          <Button className="mobile-join-us-button" type="primary">Sign up</Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
