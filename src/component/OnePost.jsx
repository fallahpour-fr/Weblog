import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "./API/axios";

const OnePost = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  let Id = params.id;
  console.log(Id);

  useEffect(() => {
    API.post("/postdata", {
      Id,
    })
      .then((response) => {
        console.log(response.data.post);
        setData(response.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>One post</h1>
      <h2>{data.Title}</h2>
      <p>{data.Post}</p>
    </div>
  );
};

export default OnePost;
