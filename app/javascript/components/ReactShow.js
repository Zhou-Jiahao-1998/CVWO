import React, { Component } from "react";
import axios from "axios";
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
    const currentID = currentPage.substr(28);
    return (
      <>
        <div>
          {this.state.items
            .filter((item) => item.id.toString() == currentID)
            .map((x) => (
              <>
                <h1>{x.Title}</h1>
                <ul class="list-group">
                  <li class="list-group-item">
                    <strong>Date: </strong>
                    {x.Date.substr(8, 2)}/{x.Date.substr(5, 2)}/
                    {x.Date.substr(0, 4)}
                    <strong> Time: </strong>
                    {x.Time.substr(11, 5)}
                    <strong> Tag: </strong>
                    {x.Tag}
                    <strong> Done?: </strong>
                    {x.Done.toString()}
                  </li>
                  <li class="list-group-item">
                    <strong>Details: </strong>
                    {x.Details}
                  </li>
                </ul>
              </>
            ))}
        </div>
        <br />
        <ShowEdit number={currentID} />
      </>
    );
  }
}

export default ReactShow;
