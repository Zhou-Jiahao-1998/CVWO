import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import ShowEdit from "./ShowEdit";

class ReactShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  getItems() {
    axios
      .get("/api/v1/items")
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getItems();
  }

  render() {
    const currentPage = window.location.href;
    const currentID = currentPage.substr(28, 2);
    return (
      <>
        <h1>Item</h1>
        <div>
          {this.state.items
            .filter((item) => item.id.toString() == currentID)
            .map((x) => (
              <ul class="list-group">
                <li class="list-group-item">
                  <strong>Date: </strong>
                  {x.Date.substr(8, 2)}/{x.Date.substr(5, 2)}/
                  {x.Date.substr(0, 4)}
                </li>
                <li class="list-group-item">
                  <strong>Time: </strong>
                  {x.Time.substr(11, 5)}
                </li>
                <li class="list-group-item">
                  <strong>Date: </strong>
                  {x.Title}
                </li>
                <li class="list-group-item">
                  <strong>Details: </strong>
                  {x.Details}
                </li>
                <li class="list-group-item">
                  <strong>Tag: </strong>
                  {x.Tag}
                </li>
                <li class="list-group-item">
                  <strong>Done?: </strong>
                  {x.Done.toString()}
                </li>
                <li class="list-group-item">
                  <strong>Created at: </strong>
                  {x.created_at.substr(8, 2)}/{x.created_at.substr(5, 2)}/
                  {x.created_at.substr(0, 4)} {x.created_at.substr(11, 5)}
                </li>
                <li class="list-group-item">
                  <strong>Updated at: </strong>
                  {x.updated_at.substr(8, 2)}/{x.updated_at.substr(5, 2)}/
                  {x.updated_at.substr(0, 4)} {x.updated_at.substr(11, 5)}
                </li>
              </ul>
            ))}
        </div>
        <br />
        <ShowEdit number={currentID} />
      </>
    );
  }
}

export default ReactShow;
