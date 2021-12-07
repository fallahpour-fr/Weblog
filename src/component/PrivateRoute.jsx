import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./context/auth";

function PrivateRoute({ comp: Home, ...rest }) {
  const { authTokens } = useAuth();
  console.log(authTokens);
  if(!authTokens){
    return <Redirect to="/" />
  }
  return (
    <Route
      {...rest}
      render={(props) =>
         <Home {...props} /> 
      }
    />
  );
}

export default PrivateRoute;
