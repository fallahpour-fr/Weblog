import React, { useState, useEffect } from "react";
import {
  useHistory,
  Link,
  Switch,
  Route,
  NavLink,
  BrowserRouter,
  useRouteMatch,
} from "react-router-dom";
import "./Home.css";
import API from "../component/API/axios";
import ErrorModal from "../component/ErrorModal";
import Post from "../component/Post";
import OnePost from "../component/OnePost";
import { useAuth } from "../component/context/auth";

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


  return (
    <div>
      <BrowserRouter>
        <div>
          {errorModule && (
            <ErrorModal
              title={errorModule.title}
              message={errorModule.message}
              onConfirm={errorHandler}
            />
          )}
          <Switch>
            <Route path='/' exact >
              <h1>Home</h1>
              <Post removed={removed} postForm={postForm} />
            </Route>
            <Route path="/post/:id">
              <OnePost />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Home;
