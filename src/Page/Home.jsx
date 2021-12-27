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
  // const { postForm, setPostForm } = useAuth();
  const [postForm, setPostForm] = useState([]);

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

  return (
    <Fragment>
      {errorModule && (
        <ErrorModal
          title={errorModule.title}
          message={errorModule.message}
          onConfirm={errorHandler}
        />
      )}
      <main className="main">
        <video
          id="comp-k85ppcnz_video"
          className="_3vVMz"
          role="presentation"
          crossOrigin="anonymous"
          playsInline=""
          preload="auto"
          muted
          loop="loop"
          type="video/mp4"
          autoPlay="autoplay"
          tabIndex="-1"
          width="100%"
          height="100%"
          src="https://video.wixstatic.com/video/375882_9f1a8e8b364946f38b7eb05436e76503/1080p/mp4/file.mp4"
          style={{
            width: "100%",
            height: "100%",
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
    </Fragment>
  );
};

export default Home;
