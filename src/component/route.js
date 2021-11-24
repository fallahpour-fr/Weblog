import SignIn from "./Page/Sign-in";
import SignUp from "./Page/Sign-up";
import Home from "./Page/Home";

const routes =[
    {
        path:'/SignUp',
        component:SignUp,
        private:true
    },
    {
        path:'/signin',
        component:SignIn,
        exact:true
    }
]

export default routes;