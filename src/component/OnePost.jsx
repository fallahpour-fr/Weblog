import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "./API/axios";

const OnePost = () => {
  const params = useParams();
  let Id = params.id;
  console.log(Id);

  useEffect(() => {
    API.post("/postdata", {
      Id,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>One post</h1>
      <h2>{params.id}</h2>
    </div>
  );
};

export default OnePost;
