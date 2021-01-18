import React from "react";

function Edit(props) {
  const link = "http://localhost:3000/items/" + props.number + "/edit";
  return (
    <>
      <a className="btn btn-outline-success" role="button" href={link}>
        Edit
      </a>
    </>
  );
}
export default Edit;
