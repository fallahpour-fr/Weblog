const Post = (props) => {
  console.log(props.postForm);
  let form = props.postForm;
  //  console.log(form.title)
  // <div>
  // {form.map(item=>{
  //     <h2>{item.title}</h2>
  // })}
  // </div>

  return (
    <div>
      <h1>Post</h1>
      {form.map((item) => (
        <div key={item.title} >
          <h2>{item.title}</h2>
          <button>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Post;
