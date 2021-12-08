import React, { useState , useEffect} from "react";
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

const Home = () => {
  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("tokens");
    history.push("/");
  };

  let { path, url } = useRouteMatch();
  const [postForm, setPostForm] = useState([]);

  const sendPostHandler = (value) => {
    console.log(value);
    setPostForm((preValue) => {
      return [...preValue, value];
    });
  };

 useEffect(() => {
   API.get('/users/profile')
    .then((response)=>{
      console.log(response.data.user.posts)
      setPostForm(response.data.user.posts)
    })
    .catch((err)=>{
      console.log(err)
    })
 }, [])
   

  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to={`${url}/profile`}>Profile</Link>
          </li>
          <li>
            <Link to={`${url}`}>All posts</Link>
          </li>
          <li>
            <Link to={`${url}/createpost`}>Create post</Link>
          </li>
          <li>Nigth mode</li>
        </ul>
        <button className="middle" onClick={logOut}>
          log out
        </button>
        <User />
        <Switch>
          <Route exact path={path}>
            <h1>All posts</h1>
            <Post postForm={postForm} />
          </Route>
          <Route path={`${path}/profile`}>
            <Profile />
          </Route>
          <Route path={`${path}/createpost`}>
            <Createpost sendPostHandler={sendPostHandler} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Home;
