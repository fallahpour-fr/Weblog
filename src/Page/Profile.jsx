import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
} from "antd";
import API from "../component/API/axios";
import React, { useEffect, useState, useRef } from "react";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};



const Profile = () => {
  const [userData, setUserData] = useState([]);
  let id = localStorage.getItem("id");
  let name = useRef();
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
      phone:userData.phone,
      prefix:userData.prefix,
      age:userData.age,
      website:userData.website,
      introduction:userData.introduction
    });
  });

  const onFinish = (values) => {
    console.log(values);
    API.post('/profileEdited',{
      id,
      values
    })
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

  return (
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
        label="Full name"
        rules={[
          {
            required: true,
            message: "Please input your Full name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
            required: true,
            message: "Please input your email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
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
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name="age"
        label="Age"
        rules={[
          {
            type: "number",
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name="website" label="Website">
        <Input />
      </Form.Item>
      <Form.Item name="introduction" label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Profile;
