import React from "react";

function GroupButton() {
  return (
    <>
      <div class="btn-group">
        <a
          href="http://localhost:3000/items/?Date"
          class="btn btn-outline-primary"
        >
          Overdue
        </a>
        <a
          href="http://localhost:3000/items/?Time"
          class="btn btn-outline-primary"
        >
          Today and upcoming
        </a>
      </div>
    </>
  );
}
export default GroupButton;
