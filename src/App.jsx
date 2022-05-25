import React, { useState } from "react";
import SignIn from "./Page/Sign-in";
import SignUp from "./Page/Sign-up";
import Home from "./Page/Home";
import { BrowserRouter, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import "antd/dist/antd.css";
import { AuthContext } from "./component/context/auth";
import PrivateRoute from "./component/PrivateRoute";
import ErrorModal from "./component/ErrorModal";
import Profile from "./component/profile/Profile/Profile";
import Createpost from "./Page/Createpost";
import OnePost from "./component/OnePost";
function App() {
  const [errorModule, setErrorModal] = useState();
  const [authTokens, setAuthTokens] = useState(localStorage.getItem("tokens"));
  const setTokens = (token) => {
    localStorage.setItem("tokens", token);
    console.log(token);
    setAuthTokens(token);
  };

  const ErrorHandler = (data) => {
    setErrorModal(data);
  };

  const errorHandler = () => {
    setErrorModal(null);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {errorModule && (
          <ErrorModal
            title={errorModule.title}
            message={errorModule.message}
            onConfirm={errorHandler}
          />
        )}
        <Switch>
          <AuthContext.Provider
            value={{
              authTokens,
              setAuthTokens: setTokens,
            }}
          >
            <Route path="/signin">
              <SignIn ErrorHandler={ErrorHandler} />
            </Route>
            <Route path="/signup">
              <SignUp ErrorHandler={ErrorHandler} />
            </Route>
            <PrivateRoute path="/" exact comp={Home} />
            <PrivateRoute path="/profile" comp={Profile} />
            <PrivateRoute path="/createpost" comp={Createpost} />
            <PrivateRoute path="/post/:id" comp={OnePost} />
          </AuthContext.Provider>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
