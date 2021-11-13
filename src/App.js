import SignIn from "./Page/Sign-in";
import SignUp from "./Page/Sign-up";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

function App() {

  // const [user, setUser] = useState()

  // const getUser = () => {

  // };

  const dataAccount = (data) => {
    // setUser((prevData) => {
    //   console.log(prevData, data);
    //   return [data, ...prevData];
    console.log(data)
    // });
  };

 

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <SignIn dataAcount={dataAccount} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
