import { Link, useRouteMatch } from "react-router-dom";

const Post = (props) => {
  let form = props.postForm;
  // let { path, url } = useRouteMatch();
  return (
    <div>
      <h1>Post</h1>
      {form.map((item) => (
        <div key={item.id}>
          <Link to={`${item.id}`} >{item.Title}</Link>
          <button
            onClick={() => {
              props.removed(item.id);
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Post;
