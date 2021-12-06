import React from "react";
import { PageHeader, Button } from "antd";
import "./Header.css";
import {
  useHistory,
  Link,
  Switch,
  Route,
  NavLink,
  BrowserRouter,
  useRouteMatch,
} from "react-router-dom";
import userImg from "./image/download.jpg";
import Card from "./Card";
import Createpost from "../Page/Createpost";
import Profile from "../Page/Profile";

const Header = () => {
  // let history = useHistory();
  // const directToProfile = () => {
  //   history.push("/profile");
  //   console.log("/profile");
  // };

  // const directToCreatePost = () => {
  //   history.push("createpost");
  //   console.log("create post");
  // };

  let { path, url } = useRouteMatch();

  return (
    <BrowserRouter>
      <div className="parente">
        <div className="navbar">
          <div className="navbar-users-option">
            <div className="navbar-account-options">
              <button className="navbar-account">
                <img src={userImg} alt="img" />
              </button>
              <Card className="navbar-users-itemes">
                <ul>
                  <li>
                    <Link to={`${url}/profile`}>Profile</Link>
                  </li>
                  <li>
                    <Link to={`${url}/createpost`}>Create post</Link>
                  </li>
                  <li>Nigth mode</li>
                </ul>
              </Card>
            </div>
            <div className="navbar-search"></div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Header;
