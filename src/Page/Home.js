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
import Createpost from "../Page/Createpost";
import Profile from "../Page/Profile";
import Topic from "./Topic";
import "./Home.css";

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
            <Link to={`${url}/createpost`}>Create post</Link>
          </li>
          <li>Nigth mode</li>
        </ul>
        <Switch>
          <Route path={path}>
            <h3>Home page</h3>
          </Route>
          <Route path={`${path}/:Id`}>
            <Topic />
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
