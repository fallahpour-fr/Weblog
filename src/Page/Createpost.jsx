import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import "./Createpost.css";
import { useHistory, Prompt } from "react-router-dom";
import API from "../component/API/axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
};

const Createpost = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [enteredData, setEnteredData] = useState(false);
  const onFinish = (values) => {
    form.resetFields();
    console.log(values);
    props.sendPostHandler(values);
    history.push("/home");
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
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
        onFocus={formFocusHandler}
      >
        <Form.Item
          name={"user", "Title"}
          label="Title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item name={"user", "Post"} label="Post" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" onClick={finishEnteringHandler}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Createpost;
