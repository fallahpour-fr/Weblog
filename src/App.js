import React, { useState } from "react";
import SignIn from "./Page/Sign-in";
import SignUp from "./Page/Sign-up";
import Home from "./Page/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import ErrorModal from "./component/ErrorModal";

function App() {
  const [homePage, setHomePage] = useState();
  const [errorModule, setErrorModal] = useState();

  const signInDataHandler = (data, dataTwo) => {
    if (typeof data !== "undefined") {
      setHomePage(data);
    } else if (typeof data === "undefined") {
      setErrorModal(dataTwo);
    }
    
  };

  const signUpDataHandler = (data, dataTwo) => {
    if (typeof data !== "undefined") {
      setHomePage(data);
    } else if (typeof data === "undefined") {
      setErrorModal(dataTwo);
    }
  };

 
  const errorHandler = () => {
    setErrorModal(null);
  };

  return (
    <BrowserRouter>
      <div className="App">
      {errorModule && <ErrorModal title={errorModule.title} message={errorModule.message} onConfirm={errorHandler} />}
        <Switch>
          <Route
            path="/"
            exact
            render={() =>
              homePage ? (
                <Home to="/home" dataUsers={homePage} />
              ) : (
                <SignIn signInDataHandler={signInDataHandler} />
              )
            }
          />
          <Route
            path="/signup"
            exact
            render={() =>
              homePage ? (
                <Home to="/home" dataUsers={homePage} />
              ) : (
                <SignUp signUpDataHandler={signUpDataHandler} />
              )
            }
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
