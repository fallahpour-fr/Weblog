import React, { useParams } from "react";

const Topic = () => {
  let { Id } = useParams();
  return (
    <div>
      <h1>{Id}</h1>
    </div>
  );
};

export default Topic;
