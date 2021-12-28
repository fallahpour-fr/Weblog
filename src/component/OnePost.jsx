import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import API from "./API/axios";
import "./style/OnePost.scss";
import CommentHandler from "./Comment";
import {
  FacebookButton,
  FacebookCount,
  TwitterButton,
  TwitterCount,
  LinkedInCount,
} from "react-social";

const OnePost = () => {
  let { path, url } = useRouteMatch();

  const params = useParams();
  const [data, setData] = useState([]);
  let Id = params.id;
  console.log(Id);

  useEffect(() => {
    console.log("code");
    API.post("/postdata", {
      Id,
    })
      .then((response) => {
        console.log("post", response.data.post);
        setData(response.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 6c4babed5a3f70b2
  return (
    <div className="postParent">
      <div className="row">
        <div className="postContainer">
          <div className="postDetails">
            <div className="postDetailsButton"></div>
            <h2>{data.Title}</h2>
            <p>{data.Post}</p>
          </div>
          <Switch>
            <Route path={`${path}`} exact>
              <div className="commentLinkParent">
                <Link className="commentLink" to={`${url}/link`}>
                  Load comment
                </Link>
              </div>
            </Route>
            <Route path={`${path}/link`}>
              <CommentHandler />
            </Route>
          </Switch>
          <div>
            <a class="share-btn twitter" href="https://twitter.com/share?url=http://localhost:3000/post/0.6440837173314782/link">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePost;
