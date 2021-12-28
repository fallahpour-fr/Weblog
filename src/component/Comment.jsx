import React, { useState } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import "../component/style/Comment.scss";

const { TextArea } = Input;

const CommentHandler = () => {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
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

  console.log(comments);
  return (
    <div className="commentParent">
      <div className="commentSharePostButton"></div>
      <h2>comment</h2>
      <div className="commentStyle">
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
                <TextArea
                  rows={4}
                  className="commentTexterea"
                  onChange={handleChange}
                  value={value}
                  className="commentItem"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="commentButton"
                  htmlType="submit"
                  type="primary"
                  onClick={handleSubmit}
                  disabled={!value}
                >
                  Add Comment
                </Button>
              </Form.Item>
            </>
          }
        />
      </div>
    </div>
  );
};

export default CommentHandler;
