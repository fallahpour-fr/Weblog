import React, { useState, useEffect, Fragment } from "react";
import {
  useHistory,
  Link,
  Switch,
  Route,
  NavLink,
  BrowserRouter,
  useRouteMatch,
} from "react-router-dom";
import API from "../component/API/axios";
import ErrorModal from "../component/ErrorModal";
import Post from "../component/Post";
import { useAuth } from "../component/context/auth";
import User from "../component/User";
import "../component/style/Home.scss";

const Home = () => {
  const [errorModule, setErrorModal] = useState();
  const { postForm, setPostForm } = useAuth();

  const errorHandler = () => {
    setErrorModal(null);
  };

  console.log(postForm);

  useEffect(() => {
    API.get("/users/profile")
      .then((response) => {
        setPostForm(response.data.user.posts);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorModal({
          title: "Error",
          message: err.response.data,
        });
        // if (err.response.error)
        //   console.log(`Error : ${JSON.stringify(err.response.error)}`);
      });
  }, []);

  const removed = (id) => {
    console.log(id);
    setPostForm(postForm.filter((item) => item.id !== id));
    API.post("/post", {
      id,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   <wix-video
  //   id="videoContainer_comp-k85ppcnz"
  //   data-video-info='{"fittingType":"fill","alignType":"center","hasBgScrollEffect":"","bgEffectName":"","videoId":"375882_9f1a8e8b364946f38b7eb05436e76503","videoWidth":1920,"videoHeight":1080,"qualities":[{"quality":"480p","size":409920,"url":"video/375882_9f1a8e8b364946f38b7eb05436e76503/480p/mp4/file.mp4"},{"quality":"720p","size":921600,"url":"video/375882_9f1a8e8b364946f38b7eb05436e76503/720p/mp4/file.mp4"},{"quality":"1080p","size":2073600,"url":"video/375882_9f1a8e8b364946f38b7eb05436e76503/1080p/mp4/file.mp4"}],"isVideoDataExists":"1","videoFormat":"mp4","playbackRate":1,"autoPlay":true,"containerId":"comp-k85ppcnz","animatePoster":"none"}'
  //   className="_3hRfg bgVideo _1PtAB"
  // >
  // <video
  //   id="comp-k85ppcnz_video"
  //   className="_3vVMz"
  //   role="presentation"
  //   crossorigin="anonymous"
  //   playsinline=""
  //   preload="auto"
  //   muted
  //   loop="loop"
  //   type="video/mp4"
  //   autoPlay="autoplay"
  //   tabindex="-1"
  //   width="100%"
  //   height="100%"
  //   src="https://video.wixstatic.com/video/375882_9f1a8e8b364946f38b7eb05436e76503/1080p/mp4/file.mp4"
  //   style={{
  //     width: "100%",
  //     height: "100vh",
  //     objectFit: "cover",
  //     objectPosition: "center center",
  //     opacity: "1",
  //   }}
  // ></video>
  //   <wix-image
  //     id="comp-k85ppcnz_img"
  //     className="_1-6YJ _2IRVt _1QuqS bgVideoposter"
  //     data-image-info='{"containerId":"comp-k85ppcnz","alignType":"center","displayMode":"fill","imageData":{"width":1920,"height":1080,"uri":"375882_9f1a8e8b364946f38b7eb05436e76503f000.jpg","displayMode":"fill","quality":{"unsharpMask":{"radius":0.33,"amount":1,"threshold":0}},"devicePixelRatio":1}}'
  //     data-has-bg-scroll-effect=""
  //     data-bg-effect-name=""
  //     data-is-svg="false"
  //     data-is-svg-mask="false"
  //     data-image-zoomed=""
  //     data-has-ssr-src=""
  //     data-src="https://static.wixstatic.com/media/375882_9f1a8e8b364946f38b7eb05436e76503f000.jpg/v1/fill/w_1519,h_891,al_c,q_85,usm_0.33_1.00_0.00/375882_9f1a8e8b364946f38b7eb05436e76503f000.webp"
  //     style={{ opacity: "0" }}
  //   >
  //     <img
  //       src="https://static.wixstatic.com/media/375882_9f1a8e8b364946f38b7eb05436e76503f000.jpg/v1/fill/w_1519,h_891,al_c,q_85,usm_0.33_1.00_0.00/375882_9f1a8e8b364946f38b7eb05436e76503f000.webp"
  //       alt=""
  //       style={{
  //         width: "100%",
  //         height: " 100vh",
  //         objectFit: "cover",
  //         objectPosition: "50% 50%",
  //       }}
  //     />
  //   </wix-image>
  // </wix-video>

  return (
    <BrowserRouter>
      {errorModule && (
        <ErrorModal
          title={errorModule.title}
          message={errorModule.message}
          onConfirm={errorHandler}
        />
      )}
      <Switch>
        <Route path="/" exact>
          <main className='main'>
            <video
              id="comp-k85ppcnz_video"
              className="_3vVMz"
              role="presentation"
              crossorigin="anonymous"
              playsinline=""
              preload="auto"
              muted
              loop="loop"
              type="video/mp4"
              autoPlay="autoplay"
              tabindex="-1"
              width="100%"
              height="100%"
              src="https://video.wixstatic.com/video/375882_9f1a8e8b364946f38b7eb05436e76503/1080p/mp4/file.mp4"
              style={{
                width: "100%",
                height:'100%',
                objectFit: "cover",
                objectPosition: "center center",
                opacity: "1",
                position: "absolute",
                left: "50%",
                top: "40%",
                transform: "translate(-50%,-50%)",
                zIndex: "-1",
              }}
            ></video>
            <User />
          </main>
          <div className="row allPost">
            <h1> all posts </h1>
            <Post removed={removed} postForm={postForm} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Home;
