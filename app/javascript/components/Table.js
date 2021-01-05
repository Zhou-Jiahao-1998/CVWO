import React from "react";

function Table() {
  return (
    <>
      <table class="table table-striped table-hover">
        <thead class="thead-light">
          <tr>
            <th>Date (DD/MM/YY)</th>
            <th>Time</th>
            <th>Title</th>
            <th>Details</th>
            <th>Tag</th>
            <th>Done?</th>
            <th colspan="3"></th>
          </tr>
        </thead>
      </table>
    </>
  );
}
export default Table;
