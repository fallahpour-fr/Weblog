import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./context/auth";
import Header from "../component/Header";

function PrivateRoute({ comp: Component, ...rest }) {
  
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens ? (
          <div>
            <Header /> <Component {...props} />
          </div>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

export default PrivateRoute;
