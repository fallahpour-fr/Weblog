import React from "react";
import RenderCropper from "../component/profile/cropper/cropper";
import Avatar from "../component/profile/avatar/avatar";
import SnackbarRender from "../component/profile/snackbar/snackbar";
import SimpleBackdrop from "../component/profile/backdrop/Backdrop";

export default function Profile() {
  return (
    <SnackbarRender>
      <SimpleBackdrop>
        <Avatar />
      </SimpleBackdrop>
    </SnackbarRender>
  );
}
