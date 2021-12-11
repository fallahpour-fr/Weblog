import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./context/auth";

function PrivateRoute({ comp: Home, ...rest }) {
  const { authTokens } = useAuth();
  // console.log(authTokens);
  let token = localStorage.getItem("tokens");
  if (!authTokens) {
    console.log("tokens in privet rout", token);
    return <Redirect to="/signin" />;
  }
  return <Route {...rest} render={(props) => <Home {...props} />} />;
}

export default PrivateRoute;
