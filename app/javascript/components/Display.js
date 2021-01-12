import React from "react";

function Display(props) {
  const location = "http://localhost:3000/items/" + props.number;
  return (
    <>
      <a href={location}>{props.title}</a>
    </>
  );
}
export default Display;
