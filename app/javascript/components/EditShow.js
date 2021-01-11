import React from "react";

function EditShow() {
  const currentPage = window.location.href;
  const currentID = currentPage.substr(28);
  const link = "http://localhost:3000/items/" + currentID;
  return (
    <>
      <a
        class="btn btn-secondary"
        role="button"
        href={link.substring(0, link.length - 5)}
      >
        Show
      </a>
    </>
  );
}
export default EditShow;
