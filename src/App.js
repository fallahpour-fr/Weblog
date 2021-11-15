import React, { useState, useEffect, useCallback } from "react";
import SignIn from "./Page/Sign-in";
import SignUp from "./Page/Sign-up";
import Home from "./Page/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import ErrorModal from "./component/ErrorModal";

// let signInData = async (data) => {
//   let responce = await fetch("http://localhost:3030/signin/users", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
//   let dataUser = await responce.json();
//   return dataUser;
// };

// let signUpData = async (data) => {
//   let responce = await fetch("http://localhost:3030/signup/users", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
//   let dataUser = await responce.json();
//   return dataUser;
// };

// signUpData()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// signInData()
//   .then((data) => {
//     console.log(data);
//     setHomePage(data);
//   })
// .catch((err) => {
//   console.log(err);
// });

function App() {
  // const [error, setError] = useState();
  // const [homePage, setHomePage] = useState();

  // console.log(homePage)

  // let signInData = useCallback((data) => {
  //   fetch("http://localhost:3030/signin/users", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((data) => data.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // });

  // let signInData = useCallback(async (data) => {
  //   let responce = await fetch("http://localhost:3030/signin/users", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   });
  //   let dataUser = await responce.json();
  //   return dataUser;
  // });

  // useEffect(() => {
  //   let mounted = true;
  //   signInData()
  //     .then((data) => {
  //       if (mounted) {
  //         console.log(data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   return () => (mounted = false);
  // }, [signInData]);

  // useEffect(() => {
  //   signInData()
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },[]);

  //   <Route
  //   path="/"
  //   exact
  //   render={() =>
  //     homePage ? (
  //       <Home to="/home" dataUsers={homePage} />
  //     ) : (
  //       <SignIn signInData={signInData} />
  //     )
  //   }
  // />

  const signInDataHandler=(data)=>{
    console.log(data)
  }

  const signUpDataHandler=(data)=>{
    console.log(data)
  }

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
