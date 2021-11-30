import React, { useParams } from "react";

const Topic = () => {
  let params = useParams();
  return (
    <div>
      <h1>{params.Id}</h1>
    </div>
  );
};

export default Topic;
