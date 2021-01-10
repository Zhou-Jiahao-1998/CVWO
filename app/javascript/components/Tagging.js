import React from "react";

function Tagging(props) {
  const location = "http://localhost:3000/home/filter?Tag=" + props.label;
  return (
    <>
      <a class="btn btn-link" href={location} role="button">
        {props.label}
      </a>
    </>
  );
}
export default Tagging;
