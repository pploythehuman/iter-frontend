import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../pages/styles/auth.scss";
import { Form, Input, Button, Divider, Spin, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ReactComponent as SignInImage } from "../assets/PalmTree.svg";
import { login } from "../services/auth";

const SignInPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: any) => {
    try {
      setIsLoading(true);
      const loginData = {
        email: values.email,
        password: values.password,
      };
      const response = await login(loginData);
      setIsLoading(false);
      message.success("Login successfully")
      console.log("Login response:", response);
      navigate('/');
    } catch (error: any) {
      setIsLoading(false);
      if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.non_field_errors) {
        console.error('Error:', error.response.data.errors.non_field_errors[0]);
        message.error(error.response.data.errors.non_field_errors[0]);
      } else {
        message.error('Login unsuccessful');
        console.error(error);
      }
    }
  };

  return (
    <Spin spinning={isLoading}>
    <div className="main-container">
      <div className="main-row">
        <div className="form-container">
          <a href="/" style={{ textDecoration: "none" }}>
            <h2
              style={{
                color: "var(--color-secondary)",
                fontFamily: "Montserrat-ExtraBold",
                display: "flex",
              }}
            >
              <span className="iter-text">ITER</span>
            </h2>
          </a>
          <div className="form-container-element">
            <h1
              style={{
                fontFamily: "Asap-Bold",
                fontSize: 25,
                alignItems: "center",
                marginBottom: 0,
                color: "var(--color-secondary)",
              }}
            >
              Sign In to Account
            </h1>
            <div
              style={{
                margin: "0px 0px 10px 0px",
                width: "20%",
                height: "2px",
                border: "1px solid var(--color-secondary)",
                backgroundColor: "var(--color-secondary)",
              }}
            ></div>
            <Form form={form} onFinish={handleLogin}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    required: true,
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Email"
                  className="sign-in-input"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  className="sign-in-input"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="sign-in-button"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
            <a
              href="/"
              className="forgot-password-link"
              style={{ fontSize: "13px" }}
            >
              forgot password?
            </a>
            <Divider
              style={{
                color: "var(--color-secondary)",
                borderColor: "var(--color-secondary)",
                fontSize: "13px",
              }}
            >
              or login using
            </Divider>
            <Button className="third-party-button google-button">
              Sign In with Google
            </Button>
            {/* <Button className="third-party-button facebook-button">
              Sign In with Facebook
            </Button> */}
          </div>
          <div className="join-us-button">
            <p style={{ color: "var(--color-secondary)" }}>
              Don't have an account?
            </p>
            <a
              href="/register"
              style={{ color: "var(--color-secondary)", marginLeft: "5px" }}
            >
              Sign up
            </a>
          </div>
        </div>
        <div className="image-col">
          <SignInImage className="image" />
          <h5
            style={{
              color: "var(--color-white)",
              margin: "0px 0px 5px 0px",
            }}
          >
            Don't have an account?
          </h5>
          <a href="/register">
            <Button className="mobile-join-us-button" type="primary">
              Sign up
            </Button>
          </a>
        </div>
      </div>
    </div>
    </Spin>
  );
};

export default SignInPage;
