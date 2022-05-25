import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw } from "draft-js";
import './style/EdittorHandler.scss'

const content = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

export default function EdittorHandler() {
  const [editorState, setEditorState] = useState(convertFromRaw(content));

  const onEditorStateChange = (data) => {
    setEditorState(data);
  };

  return (
    <div className='editor'>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
  );
}
