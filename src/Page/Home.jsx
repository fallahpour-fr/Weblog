import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Post from "../component/Post";
import {
  useHistory,
  Link,
  Switch,
  Route,
  NavLink,
  BrowserRouter,
  useRouteMatch,
} from "react-router-dom";
import Topic from "./Topic";
import "./Home.css";
import Createpost from "./Createpost";
import Profile from "./Profile";
import User from "../component/User";
import API from "../component/API/axios";
import ErrorModal from "../component/ErrorModal";
import OnePost from "../component/OnePost";

const Home = () => {
  const [errorModule, setErrorModal] = useState();
  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("tokens");
    history.push("/signin");
  };

  // let { path, url } = useRouteMatch();
  const [postForm, setPostForm] = useState([]);

  const sendPostHandler = (value) => {
    console.log(value);
    setPostForm((preValue) => {
      return [...preValue, value];
    });
  };

  const errorHandler = () => {
    setErrorModal(null);
  };

  useEffect(() => {
    API.get("/users/profile")
      .then((response) => {
        setPostForm(response.data.user.posts);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorModal({
          title: 'Error',
          message : err.response.data
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
    <BrowserRouter>
      <div>
        {errorModule && (
          <ErrorModal
            title={errorModule.title}
            message={errorModule.message}
            onConfirm={errorHandler}
          />
        )}
        <ul>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/'>Allposts</Link>
          </li>
          <li>
            <Link to='/createpost'>Create post</Link>
          </li>
          <li>Nigth mode</li>
        </ul>
        <button className="middle" onClick={logOut}>
          log out
        </button>
        <User />
        <Switch>
          <Route exact path='/'>
            <h1>All posts</h1>
            <Post removed={removed} postForm={postForm} />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/createpost'>
            <Createpost sendPostHandler={sendPostHandler} />
          </Route>
          <Route path='/:id'>
            <OnePost />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Home;
