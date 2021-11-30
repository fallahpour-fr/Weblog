import Header from "../component/Header";
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
import Createpost from "../Page/Createpost";
import Profile from "../Page/Profile";

const Home = () => {
  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("tokens");
    history.push("/");
  };

  let { path, url } = useRouteMatch();

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
        <Switch>
          <Route exact path={path}>
            <h3>All posts</h3>
          </Route>
          <Route path={`${path}/profile`}>
            <Profile />
          </Route>
          <Route path={`${path}/createpost`}>
            <Createpost />
          </Route>
        </Switch>
      </div>
      <button className="middle" onClick={logOut}>
        log out
      </button>
    </BrowserRouter>
  );
};

export default Home;
