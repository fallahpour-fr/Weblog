import React,{useState} from 'react';
import SignIn from "./Page/Sign-in";
import SignUp from "./Page/Sign-up";
import Home from './Page/Home';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import ErrorModal from "./component/ErrorModal";

let signInData = async (data) => {
  let responce = await fetch("http://localhost:3030/signin/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await responce.json();
};

let signUpData = async (data) => {
  let responce = await fetch("http://localhost:3030/signup/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await responce.json();
};

signUpData()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err, "hi");
  });

function App() {
  const [error, setError] = useState();
  const [homePage, setHomePage] = useState(false);

  signInData()
    .then((data) => {
      console.log(data);
      setHomePage(true);
    })
    .catch((err) => {
      console.log(err);
      setError({
        title:err.status,
        massage:err.status
      })
    });

    const errorHandler = () => {
      setError(null);
    };

  return (
    <BrowserRouter>
      <div className="App">
      { error && <ErrorModal title={error.title} massage={error.massage} onConfrim={errorHandler} /> }
        <Switch>
          <Route path="/signin">
            <SignIn signInData={signInData} />
          </Route>
          <Route path="/signup">
            <SignUp signUpData={signUpData} />
          </Route>
          {homePage && (
            <Route path="/homepage">
              <Home />
            </Route>
          )}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
