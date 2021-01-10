import React from "react";

function ShowEdit(props) {
  const link = "http://localhost:3000/items/" + props.number + "/edit";
  return (
    <>
      <a class="btn btn-primary" role="button" href={link}>
        Edit
      </a>
    </>
  );
}
export default ShowEdit;
