import React from "react";
import "./Header.scss";
import { Link, useHistory, useRouteMatch } from "react-router-dom";


const Header = () => {
  let { path, url } = useRouteMatch();
  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("tokens");
    history.push("/signin");
  };
  return (
    <div className="header">
      <div className='logo'>
        <h2>Logo</h2>
      </div>
      <div className="header-links">
        <ul>
          <li>
            <Link className="header-links__link" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="header-links__link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="header-links__link" to="/createpost">
              Write post
            </Link>
          </li>
          <li className="header-links__link">Nigth mode</li>
        </ul>
        <button onClick={logOut}>
          log out
        </button>
      </div>
    </div>
  );
};

export default Header;
