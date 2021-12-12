import React from "react";
import "./Header.css";
import { Link ,useHistory ,useRouteMatch } from "react-router-dom";
import User from './User'

const Header = () => {
  let { path, url } = useRouteMatch();
  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("tokens");
    history.push("/signin");
  };
  return (
    <div>
      <ul>
        <li>
          <Link to="/profile" >Profile</Link>
        </li>
        <li>
          <Link to="/"  >Allposts</Link>
        </li>
        <li>
          <Link to="/createpost" >Create post</Link>
        </li>
        <li>Nigth mode</li>
      </ul>
      <button className="middle" onClick={logOut}>
        log out
      </button>
      <User />
    </div>
  );
};

export default Header;
