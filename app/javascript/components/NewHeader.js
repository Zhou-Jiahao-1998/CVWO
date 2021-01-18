import React from "react";

function NewHead() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand">My App</a>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/items">
              To-Do List
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/home/about">
              Completed items
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default NewHead;
