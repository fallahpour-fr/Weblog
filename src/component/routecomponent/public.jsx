import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

function PublicRoute({ children, ...rest }) {
  
  console.log(authTokens)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authTokens ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  const { authTokens } = useAuth();
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
          isLogin() && restricted ?
              <Redirect to="/dashboard" />
          : <Component {...props} />
      )} />
  );
};

export default PublicRoute;
