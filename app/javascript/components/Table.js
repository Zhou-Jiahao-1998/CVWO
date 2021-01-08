import React, { Component } from "react";
import axios from "axios";

class ItemsContainer extends Component {
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
    return (
      <div>
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

          {this.state.items.map((item) => {
            return (
              <tbody>
                <td>{item.Date}</td>
                <td>{item.Time}</td>
                <td>{item.Title}</td>
                <td>{item.Details}</td>
                <td>{item.Tag}</td>
                <td>{item.Done}</td>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default ItemsContainer;
