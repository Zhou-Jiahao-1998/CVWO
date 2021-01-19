import React from "react";

function NewItem(props) {
  const link = "/items/new?" + props.name;
  return (
    <>
      <a className="btn btn-primary" href={link} role="button">
        New Item
      </a>
    </>
  );
}
export default NewItem;
