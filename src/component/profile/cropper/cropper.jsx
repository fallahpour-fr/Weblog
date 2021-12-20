import React, { useRef, useState, useContext } from "react";
import { Button } from "@material-ui/core";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import { generateDownload } from "../../profile/utils/cropImage";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton, makeStyles } from "@material-ui/core";
import { SnackbarContext } from "../snackbar/snackbar";
import getCroppedImg from "../utils/cropImage";
import { dataURLtoFile } from "../utils/dataURLtoFile";
import API from "../../API/axios";

import "./cropper.css";

const useStyles = makeStyles({
  iconButton: {},
  cancelIcon: {},
});

const RenderCropper = (props) => {
  const classes = useStyles();
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const [croppeArea, setCroppeArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [file, setFile] = useState();
  const setStateSnackbarContext = useContext(SnackbarContext);

  const chooseImageHandler = () => {
    inputRef.current.click();
  };

  const onCropComplete = (croppPesentage, croppPixel) => {
    console.log(croppPesentage, croppPixel);
    setCroppeArea(croppPixel);
  };

  const onSelectFile = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const onDownlode = () => {
    if (!image)
      return setStateSnackbarContext(true, "please select an image", "warning");
    generateDownload(image, croppeArea);
  };

  const onClear = () => {
    if (!image)
      return setStateSnackbarContext(true, "please select an image", "warning");
    setImage(null);
  };

  const onUpload = async () => {
    if (!image)
      return setStateSnackbarContext(true, "please select an image", "warning");

    console.log(image);
    const convanse = await getCroppedImg(image, croppeArea);
    console.log(convanse);
    const canvasDataUrl = convanse.toDataURL("image/jpeg");

    const convertedUrl = dataURLtoFile(canvasDataUrl, "cropped-img.jpeg");
    console.log(convertedUrl.name);

    const formData = new FormData();
    formData.append("file", file);

    console.log(formData)

    API.post("/upload", {
      formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <IconButton className={classes.iconButton} onClick={props.handleCropper}>
        <CancelIcon className={classes.cancelIcon} />
      </IconButton>
      <div className="container-cropper">
        {image ? (
          <>
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="slider">
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
          </>
        ) : null}
      </div>
      <div className="container-button">
        <input
          type="file"
          accept="image/*"
          name="myImage"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={onSelectFile}
        />
        <Button
          onClick={() => {
            onClear();
          }}
        >
          CLEAR
        </Button>
        <Button onClick={chooseImageHandler}>CHOOSE</Button>
        <Button onClick={onDownlode}>DOWNLODE</Button>
        <Button onClick={onUpload}>UPLOAD</Button>
      </div>
    </div>
  );
};

export default RenderCropper;
