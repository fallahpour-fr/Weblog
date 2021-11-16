const Home = (props) => {
  return (
    <div>
      <h1>Home page </h1>
      <div>{props.dataUsers.username}</div>
    </div>
  );
};

export default Home;
