const Post = (props) => {
  let form = props.postForm;

  return (
    <div>
      <h1>Post</h1>
      {form.map((item) => (
        <div key={item.Title} >
          <h2>{item.Title}</h2>
          <button>delete</button>
          <button>details</button>
        </div>
      ))}
    </div>
  );
};

export default Post;
