import React, { useState } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";

const { TextArea } = Input;

const CommentHandler = () => {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (props) => {
    setValue("");
    setComments((preValue) => {
      return [
        ...preValue,
        {
          author: "Han Solo",
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ];
    });
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {comments.length > 0 && (
        <List
          dataSource={comments}
          header={`${comments.length} ${
            comments.length > 1 ? "replies" : "reply"
          }`}
          itemLayout="horizontal"
          renderItem={(props) => <Comment {...props} />}
        />
      )}
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <>
            <Form.Item>
              <TextArea rows={4} onChange={handleChange} value={value} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" onClick={handleSubmit} type="primary">
                Add Comment
              </Button>
            </Form.Item>
          </>
        }
      />
    </>
  );
};

export default CommentHandler;
