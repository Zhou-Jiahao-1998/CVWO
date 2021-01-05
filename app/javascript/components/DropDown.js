import React from "react";

function GroupButton() {
  return (
    <>
      <div class="btn-group">
        <a
          href="http://localhost:3000/items"
          class="btn btn-outline-primary"
          aria-current="page"
        >
          Full List
        </a>
        <a
          href="http://localhost:3000/items/?Done=true"
          class="btn btn-outline-primary"
        >
          Completed
        </a>
        <a
          href="http://localhost:3000/items/?Done=false"
          class="btn btn-outline-primary"
        >
          Not Completed
        </a>
      </div>
    </>
  );
}
export default GroupButton;
