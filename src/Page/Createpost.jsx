import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import "../component/style/Createpost.scss";
import { useHistory, Prompt } from "react-router-dom";
import API from "../component/API/axios";
import { useAuth } from "../component/context/auth";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
};

const Createpost = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [enteredData, setEnteredData] = useState(false);
  const { sendPostHandler } = useAuth();
  const onFinish = (values) => {
    form.resetFields();
    values.id = Math.random();
    console.log(values);
    sendPostHandler(values);
    history.push("/");
    API.post("/createpost", {
      values,
    });
  };

  const formFocusHandler = () => {
    console.log("focuse !");
    setEnteredData(true);
  };

  const finishEnteringHandler = () => {
    setEnteredData(false);
  };

  return (
    <div className="createpost">
      <Prompt
        when={enteredData}
        message="Are you sure you want to leave this page ?"
      />
      <div className="row">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          form={form}
          onFocus={formFocusHandler}
          className="writePost"
        >
          <div className="writeFormGroup">
             
            <Form.Item name={("user", "Title")} rules={[{ required: true }]}>
              <Input placeholder="Title" />
            </Form.Item>
          </div>
          <div className="writeFormGroup">
            <Form.Item name={("user", "Post")} rules={[{ required: true }]}>
              <Input.TextArea placeholder="Write your post ..." />
            </Form.Item>
          </div>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={finishEnteringHandler}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Createpost;
