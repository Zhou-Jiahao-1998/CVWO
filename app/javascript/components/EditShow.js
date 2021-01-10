import React from "react";

function EditShow() {
  const currentPage = window.location.href;
  const currentID = currentPage.substr(28, 2);
  const link = "http://localhost:3000/items/" + currentID;
  return (
    <>
      <a class="btn btn-secondary" role="button" href={link}>
        Show
      </a>
    </>
  );
}
export default EditShow;
