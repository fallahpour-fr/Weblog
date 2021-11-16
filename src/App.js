import React, { useState, useEffect, useCallback } from "react";
import SignIn from "./Page/Sign-in";
import SignUp from "./Page/Sign-up";
import Home from "./Page/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import ErrorModal from "./component/ErrorModal";

function App() {
  const signInDataHandler = (data) => {
    console.log(data);
  };

  const signUpDataHandler = (data) => {
    console.log(data);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <SignIn signInDataHandler={signInDataHandler} />
          </Route>
          <Route path="/signup">
            <SignUp signUpDataHandler={signUpDataHandler} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
