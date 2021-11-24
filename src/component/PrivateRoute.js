import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./context/auth";

function PrivateRoute({ comp: Home, ...rest }) {
  const   authTokens  = useAuth();
console.log(authTokens)
  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens ? <Home {...props} /> : <Redirect  to='/' />
      }
    />
  );
}

export default PrivateRoute;