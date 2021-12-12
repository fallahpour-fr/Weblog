import React, { useState } from "react";
import SignIn from "./Page/Sign-in";
import SignUp from "./Page/Sign-up";
import Home from "./Page/Home";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import "antd/dist/antd.css";
import { AuthContext } from "./component/context/auth";
import PrivateRoute from "./component/PrivateRoute";
import ErrorModal from "./component/ErrorModal";

function App() {
  const [errorModule, setErrorModal] = useState();
  const [authTokens, setAuthTokens] = useState(localStorage.getItem("tokens"));
  const [postForm, setPostForm] = useState([]);
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

  const sendPostHandler = (value) => {
    console.log(value);
    setPostForm((preValue) => {
      return [...preValue, value];
    });
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
          </AuthContext.Provider>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;

// <Route path="/profile">
//                 <Profile />
//               </Route>
//               <Route path="/createpost">
//                 <Createpost />
//               </Route>
//               <Route path="/:id">
//                 <OnePost />
//               </Route>
// import React, { useState } from "react";
// import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import PublicRoute from "./component/routecomponent/public";
// import ErrorModal from "./component/ErrorModal";
// import { AuthContext } from "./component/context/auth";

// const SignIn = lazy(()=>import('./Page/Sign-in.jsx'))

// function App() {
//   const [errorModule, setErrorModal] = useState();
//   const [authTokens, setAuthTokens] = useState(localStorage.getItem("tokens"));
//   const ErrorHandler = (data) => {
//     setErrorModal(data);
//   };

//   const errorHandler = () => {
//     setErrorModal(null);
//   };

//   const setTokens = (token) => {
//     localStorage.setItem("tokens", token);
//     console.log(token);
//     setAuthTokens(token);
//   };

//   return (
//     <BrowserRouter>
//       <div className="App">
//         {errorModule && (
//           <ErrorModal
//             title={errorModule.title}
//             message={errorModule.message}
//             onConfirm={errorHandler}
//           />
//         )}
//         <Switch>
//           <AuthContext.Provider
//             value={{
//               authTokens,
//               setAuthTokens: setTokens,
//             }}
//           >
//             <PublicRoute path="signin">
//               <SignIn />
//             </PublicRoute>
//           </AuthContext.Provider>
//         </Switch>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
