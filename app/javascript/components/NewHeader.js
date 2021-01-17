import React from "react";

function NewHead() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand">My App</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/items">
              To-Do List
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/home/about">
              Completed items
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default NewHead;
