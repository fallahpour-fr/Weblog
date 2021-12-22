import React, { useState, useEffect } from "react";
import API from "../component/API/axios";
import './style/User.scss'

const User = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    API.get("/users/profile")
      .then((responce) => {
        let data = responce.data.user;
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='user'>
      <h2>Welcome</h2>
      <div className='user-username' >{user.name}</div>
    </div>
  );
};

export default User;
