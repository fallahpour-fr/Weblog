import { Link } from "react-router-dom";
import "./style/Post.scss";

const Post = (props) => {
  let form = props.postForm;

  return (
    <div className="posts">
      {form.map((item) => (
        <div className="post" key={item.id}>
          <Link className="post-title" to={`/post/${item.id}`}>
            {item.Title}
          </Link>
          <div className='post-detailes' >
            <button
              className="deleteButton"
              onClick={() => {
                props.removed(item.id);
              }}
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
