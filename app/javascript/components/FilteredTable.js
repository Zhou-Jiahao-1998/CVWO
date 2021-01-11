import React, { Component } from "react";
import axios from "axios";
import Display from "./Display";
import Edit from "./Edit";
import Tagging from "./Tagging";

class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.getItems();
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

  deleteItem(id) {
    axios.delete(`/api/v1/items/${id}`);
    window.location.reload(false);
    //alert(`/api?v1/items/${id}`);
  }

  render() {
    const currentPage = window.location.href;
    const currentID = currentPage.substr(38);
    return (
      <>
        <h1>Items with Tag: {currentID}</h1>
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

            {this.state.items
              .filter((item) => item.Tag == currentID)
              .map((x) => {
                return (
                  <tbody>
                    <td>
                      <a class="btn btn-white" role="button" disabled>
                        {x.Date.substr(8, 2)}/{x.Date.substr(5, 2)}/
                        {x.Date.substr(0, 4)}
                      </a>
                    </td>
                    <td>
                      <a class="btn btn-white" role="button" disabled>
                        {x.Time.substr(11, 5)}
                      </a>
                    </td>
                    <td>
                      <Display title={x.Title} number={x.id.toString()} />
                    </td>
                    <td>
                      <a class="btn btn-white" role="button" disabled>
                        {x.Details}
                      </a>
                    </td>
                    <td>
                      <Tagging label={x.Tag} />
                    </td>
                    <td>
                      <a class="btn btn-white" role="button" disabled>
                        {x.Done.toString()}
                      </a>
                    </td>
                    <td>
                      <Edit number={x.id} />
                    </td>
                    <td>
                      <a
                        class="btn btn-outline-danger"
                        role="button"
                        onClick={() => this.deleteItem(x.id)}
                      >
                        Delete
                      </a>
                    </td>
                  </tbody>
                );
              })}
          </table>
        </div>
      </>
    );
  }
}

export default ItemsContainer;
