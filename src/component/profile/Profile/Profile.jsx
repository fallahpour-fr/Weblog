import RenderCropper from "../cropper/cropper";
import Avatar from "../avatar/avatar";
import SnackbarRender from "../snackbar/snackbar";
import SimpleBackdrop from "../backdrop/Backdrop";
import { Form, Input, InputNumber, Select, Button } from "antd";
import API from "../../API/axios";
import React, { useEffect, useState, useRef, Fragment } from "react";
import "./Profile.scss";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function Profile() {
  const [userData, setUserData] = useState([]);
  let id = localStorage.getItem("id");
  useEffect(() => {
    API.post("/profileData", {
      id,
    })
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userData);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: userData.FullName,
      password: userData.password,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      prefix: userData.prefix,
      age: userData.age,
      website: userData.website,
      introduction: userData.introduction,
    });
  });

  const onFinish = (values) => {
    console.log(values);
    API.post("/profileEdited", {
      id,
      values,
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="98">+98</Option>
        <Option value="87">+87</Option>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  // <SnackbarRender>
  //   <SimpleBackdrop>
  //     <div>
  //       <Avatar />
  //     </div>
  //   </SimpleBackdrop>
  // </SnackbarRender>;

  return (
    <SnackbarRender>
      <SimpleBackdrop>
        <div className="parent">
          <div className="title">
            <h2>Public profile</h2>
          </div>
          <Fragment>
            <div className="form">
              <Form
                {...layout}
                value="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                form={form}
                initialValues={{
                  prefix: "98",
                }}
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Full name",
                    },
                  ]}
                >
                  <h4>Full name</h4>
                  <Input className="formInputProfile" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <h4>Password</h4>
                  <Input.Password className="formInputProfile" />
                </Form.Item>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                      whitespace: true,
                    },
                  ]}
                >
                  <h4>Username</h4>
                  <Input className="formInputProfile" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please input your email",
                    },
                  ]}
                >
                  <h4>Email</h4>
                  <Input className="formInputProfile" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    {
                      pattern: /^(?:\d*)$/,
                      message: "Value should contain just number",
                    },
                    {
                      pattern: /^[\d]{10}$/,
                      message: "Value should be less than 10 character",
                    },
                  ]}
                >
                  <h4>Phone number</h4>
                  <Input
                    addonBefore={prefixSelector}
                    className="formInputProfile"
                  />
                </Form.Item>
                <Form.Item
                  name="age"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 99,
                    },
                  ]}
                >
                  <h4>Age</h4>
                  <InputNumber className="formInputProfile" />
                </Form.Item>
                <Form.Item name="website">
                  <h4>Website</h4>
                  <Input className="formInputProfile" />
                </Form.Item>
                <Form.Item name="introduction">
                  <h4>Introduction</h4>
                  <Input.TextArea className="formInputProfile" />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
                  <Button className='profileSubmitButton' type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <Avatar />
          </Fragment>
        </div>
      </SimpleBackdrop>
    </SnackbarRender>
  );
}

export default Profile;
