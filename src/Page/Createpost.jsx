import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import "./Createpost.css";
import { useHistory } from "react-router-dom";
import API from '../component/API/axios'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
};

const Createpost = (props) => {
  const [form] = Form.useForm();
  const history=useHistory()
  const onFinish = (values) => {
    form.resetFields();
    // console.log(values);
    props.sendPostHandler(values);
    history.push('/home')
    API.post('/createpost',{
      values
    })
    .then((response)=>{
      console.log(response)
    })
    .catch((err)=>{
      console.log(err)
    })
  };

  return (
    <div className="createpost">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
      >
        <Form.Item name={"title"} label="Title">
          <Input />
        </Form.Item>
        <Form.Item name={"text"} label="Text">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Createpost;
