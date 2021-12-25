import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "./API/axios";
import "./style/OnePost.scss";

const OnePost = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  let Id = params.id;
  console.log(Id);

  useEffect(() => {
    console.log('code')
    API.post("/postdata", {
      Id,
    })
      .then((response) => {
        console.log('post',response.data.post);
        setData(response.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="postParent">
      <div className="row">
        <div className="postContainer">
          <p>One post</p>
          <div className="postDetails">
            <h2>{data.Title}</h2>
            <p>{data.Post}</p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default OnePost;
