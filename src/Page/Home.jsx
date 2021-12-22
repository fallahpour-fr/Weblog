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
import OnePost from "../component/OnePost";
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

  // <div className="mainPage">
  //   <h1>Hello</h1>
  // </div>;

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
          <div className="mainPage">
            <User />
          </div>
          <div className="row allPost">
            <h1> all posts </h1>
            <Post removed={removed} postForm={postForm} />
          </div>
        </Route>
        <Route path="/post/:id">
          <OnePost />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Home;
