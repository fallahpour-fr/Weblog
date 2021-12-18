import React, { useRef } from "react";
import { Button } from "@material-ui/core";

const uplodeImageProfile = () => {
  const inputRef = useRef();

  const chooseImageHandler = () => {
    inputRef.current.onClick();
  };

  return (
    <div className="container">
      <div className="container-cropper"></div>
      <div className="container-button">
        <input type="file" accept="image/*" ref={inputRef} />
        <Button
          variant="container"
          color="primary"
          onClick={chooseImageHandler}
        >
          Choose
        </Button>
        <Button variant="container" color="secondly">
          Downlode
        </Button>
      </div>
    </div>
  );
};

export default uplodeImageProfile;
