import React, { useState, useRef } from "react";
import { Form, Input, Button } from "antd";
import "../component/style/Createpost.scss";
import { useHistory, Prompt } from "react-router-dom";
import API from "../component/API/axios";
const layout = {
  labelCol: { span: 20 },
  wrapperCol: { span: 40 },
};

const validateMessages = {
  required: "${label} is required!",
};

const Createpost = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [textValue, setTextValue] = useState("");
  const [enteredData, setEnteredData] = useState(false);
  const [selectedText, setSelectedText] = useState();
  const refText = useRef();

  const onFinish = (values) => {
    form.resetFields();
    values.id = Math.random();
    history.push("/");
    API.post("/createpost", {
      values,
    });
  };

  const onchangeHandler = (event) => {
    setTextValue(event.target.value);
  };

  const handleMouseUp = () => {
    console.log(`Selected text: ${window.getSelection().toString()}`);
    setSelectedText(window.getSelection().toString());
  };

  const formFocusHandler = () => {
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
          className="writeForm"
        >
          <div className="writeFormGroup">
            <Form.Item name={("user", "Title")} rules={[{ required: true }]}>
              <Input placeholder="Title" className="writeInput" />
            </Form.Item>
          </div>
          <div className="writeFormGroup">
            <Form.Item
              className="writeTextParent"
              name={("user", "Post")}
              rules={[{ required: true }]}
            >
              <Input.TextArea
                ref={refText}
                rows={8}
                className="writeText"
                placeholder="Write your post ..."
                onChange={onchangeHandler}
                value={textValue}
                onMouseUp={handleMouseUp}
              />
            </Form.Item>
          </div>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={finishEnteringHandler}
              className="submitButton"
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
