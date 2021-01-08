import React, { Component } from "react";
import axios from "axios";
import Delete from "./Delete";
import Display from "./Display";
import Edit from "./Edit";
import Tagging from "./Tagging";

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

  deleteItem = (id) => {
    axios
      .delete(`/api/v1/items/${id}`)
      .then((response) => {
        const itemIndex = this.state.items.findIndex((x) => x.id === id);
        const items = update(this.state.items, {
          $splice: [[itemIndex, 1]],
        });
        this.setState({
          items: items,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th>Date (DD/MM/YYYY)</th>
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
                <td>
                  {item.Date.substr(8, 2)}/{item.Date.substr(5, 2)}/
                  {item.Date.substr(0, 4)}
                </td>
                <td>{item.Time.substr(11, 5)}</td>
                <td>
                  <Display title={item.Title} number={item.id.toString()} />
                </td>
                <td>{item.Details}</td>
                <td>
                  <Tagging label={item.Tag} />
                </td>
                <td>{item.Done.toString()}</td>
                <td>
                  <Edit />
                </td>
                <td>
                  <Delete />
                </td>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default ItemsContainer;
