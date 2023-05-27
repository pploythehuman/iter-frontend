import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../pages/styles/auth.scss";
import { Form, Input, Button, DatePicker, message, Divider, Spin } from "antd";
import type { DatePickerProps } from "antd";
import { MailOutlined, LockOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { ReactComponent as SignInImage } from "../assets/PalmTree.svg";
import { register } from "../services/auth";

const SignInPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    const registerData = {
      email: values.email,
      firstname: values.firstName,
      lastname: values.lastName,
      password: values.password,
      password2: values.confirmPassword,
      tc: true,
    };
  
    try {
      setIsLoading(true);
      const response = await register(registerData);
      setIsLoading(false);
      message.success("Login successfully")
      console.log("Registration response:", response);
      navigate('/login');
    } catch (error: any) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        if (error.response.data.email) {
          console.error("Error:", error.response.data.email[0]);
          message.error(error.response.data.email[0]);
        } else if (error.response.data.errors && error.response.data.errors.non_field_errors) {
          console.error("Error:", error.response.data.errors.non_field_errors[0]);
          message.error(error.response.data.errors.non_field_errors[0]);
        } else {
          message.error("Registration unsuccessful");
          console.error(error);
        }
      } else {
        message.error("Registration unsuccessful");
        console.error(error);
      }
    }
  };
  

  return (
    <div
      className="main-container"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="main-row">
        <div
          className="form-container"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          <a href="/" style={{ textDecoration: "none" }}>
            <h2
              style={{
                color: "var(--color-white)",
                marginBottom: "10px",
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
                color: "var(--color-white)",
              }}
            >
              Join Our Community
            </h1>
            <div
              style={{
                margin: "0px 0px 10px 0px",
                width: "20%",
                height: "2px",
                border: "1px solid var(--color-white)",
                backgroundColor: "var(--color-white)",
              }}
            ></div>
            <Form name="register" form={form} onFinish={onFinish}>
              <Form.Item
                className="bottom-margin"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your First Name!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="First Name" />
              </Form.Item>
              <Form.Item
                className="bottom-margin"
                name="lastName"
                rules={[
                  { required: true, message: "Please input your Last Name!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Last Name" />
              </Form.Item>
              {/* <Form.Item
                name="birthdate"
                rules={[
                  { required: true, message: "Please select your Birthdate!" },
                ]}
              >
                <DatePicker placeholder="Birthdate" />
              </Form.Item> */}

              <Form.Item
                className="bottom-margin"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input a valid Email!",
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                className="bottom-margin"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                className="bottom-margin"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your Password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <Divider
              style={{
                color: "var(--color-white)",
                borderColor: "var(--color-white)",
                fontSize: "13px",
              }}
            >
              or login using
            </Divider>
            <Button className="third-party-button google-button">
              Sign Up with Google
            </Button>
            {/* <Button className="third-party-button facebook-button">
              Sign Up with Facebook
            </Button> */}
          </div>
          <div className="join-us-button">
            <p style={{ color: "var(--color-white)" }}>
              Already have an account?
            </p>
            <a
              href="/login"
              style={{ color: "var(--color-white)", marginLeft: "5px" }}
            >
              {" "}
              Sign in
            </a>
          </div>
        </div>
        <div
          className="image-col"
          style={{ backgroundColor: "var(--color-white)" }}
        >
          <SignInImage className="image" />
          <h5
            style={{
              color: "var(--color-secondary)",
              margin: "0px 0px 5px 0px",
            }}
          >
            Already have an account?
          </h5>
          <a href="/login">
            <Button className="mobile-join-us-button" type="primary">
              Sign in
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
