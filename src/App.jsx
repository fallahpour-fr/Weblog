import React, { useState } from "react";
import SignIn from "./Page/Sign-in";
import SignUp from "./Page/Sign-up";
import Home from "./Page/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import { AuthContext } from "./component/context/auth";
import PrivateRoute from "./component/PrivateRoute";
import ErrorModal from "./component/ErrorModal";

function App() {
  const [errorModule, setErrorModal] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const ErrorHandler = (err) => {
    setErrorModal(err);
  };

  const signIn = () => {
    setLoggedIn(true);
  };

  const signup = (token) => {
    setLoggedIn(true);
    console.log(token)
  };

  const logout = () => {
    setLoggedIn(false);
  };b53ea10

  // const [authTokens, setAuthTokens] = useState();

  // const setTokens = (token, data) => {
  //   localStorage.setItem("tokens", JSON.stringify(token));
  //   console.log(token, data);
  //   setAuthTokens(token, data);
  // { authTokens, setAuthTokens: setTokens }
  // };

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
              isLoggedIn: loggedIn,
              signIn: signIn,
              logout: logout,
              signup: signup,
            }}
          >
            <Route exact path="/">
              <SignIn ErrorHandler={ErrorHandler} />
            </Route>
            <Route path="/signup">
              <SignUp ErrorHandler={ErrorHandler} />
            </Route>
            <PrivateRoute path="/home" comp={Home}></PrivateRoute>
          </AuthContext.Provider>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
