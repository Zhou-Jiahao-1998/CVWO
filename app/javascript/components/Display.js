import React from "react";

function Display(props) {
  const location = "http://localhost:3000/items/" + props.number;
  return (
    <>
      <a class="btn btn-link" href={location} role="button">
        {props.title}
      </a>
    </>
  );
}
export default Display;
