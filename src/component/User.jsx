import React, { useState, useEffect } from "react";
import API from "../component/API/axios";

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
    <div>
      <h2>user</h2>
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  );
};

export default User;
