import {createContext,useContext} from 'react';

export const AuthContext =createContext({
    isLoggedIn:false,
    token:null,
    SignIn:()=>{},
    logout:()=>{},
    SignUp:()=>{}
});

export function useAuth() {
    return useContext(AuthContext)
}
