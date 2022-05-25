import React, { useState } from "react";
import { Comment, Avatar, Form, Button, List } from "antd";
import moment from "moment";
import "../component/style/Comment.scss";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";


const CommentHandler = () => {
  const [comments, setComments] = useState([]);
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [condition, setCondition] = useState(false)

  const handleSubmit = () => {
    seteditorState(EditorState.createEmpty());
    setCondition(false)
    setComments((preveditorState) => {
      return [
        ...preveditorState,
        {
          author: "Han Solo",
          avatar: "https://joeschmoe.io/api/v1/random",
          content: (
            <p>
              {draftToMarkdown(convertToRaw(editorState.getCurrentContent())).toString()}
            </p>
          ),
          datetime: moment().fromNow(),
        },
      ];
    });
  };
  const onEditorStateChange = (e) => {
    seteditorState(e);
    setCondition(true)
  };

  const [toolbarHidden, settoolbarHidden] = useState(false);

  const toggleToolbar = () => {
    settoolbarHidden(!toolbarHidden);
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
              <div className="rdw-storybook-root">
                <div className="rdw-storybook-locale-wrapper">
                  <button className='btnShowEditor' onClick={toggleToolbar}>
                    {toolbarHidden ? "show Editor" : "Hide Editor"}
                  </button>
                </div>
                <Editor
                    toolbarHidden={toolbarHidden}
                    toolbarClassName="rdw-storybook-toolbar"
                    wrapperClassName="rdw-storybook-wrapper"
                    editorClassName="rdw-storybook-editor"
                    onEditorStateChange={onEditorStateChange}
                  />
              </div>

              <Form.Item>
                <Button
                  className="commentButton"
                  htmlType="submit"
                  type='primary'
                  onClick={handleSubmit}
                  disabled={!condition}
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
