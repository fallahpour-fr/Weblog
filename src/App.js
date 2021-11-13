import SignIn from "./Page/Sign-in";
import SignUp from "./Page/Sign-up";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";


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

signInData()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });


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
    console.log(err,'hi');
  });

function App() {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/signin">
            <SignIn signInData={signInData} />
          </Route>
          <Route path="/signup">
            <SignUp signUpData={signUpData} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
