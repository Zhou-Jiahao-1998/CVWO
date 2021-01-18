import React, { Component } from "react";
import axios from "axios";
import Display from "./Display";
import Edit from "./Edit";
import Tagging from "./Tagging";
import Back from "./Back";

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
        <Back />
        <br />
        <br />
        <div>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Date (DD/MM/YYYY)</th>
                <th>Time</th>
                <th>Title</th>
                <th>Tag</th>
                <th>Done?</th>
                <th colSpan="3"></th>
              </tr>
            </thead>

            {this.state.items
              .filter((item) => item.Tag == currentID)
              .map((x) => {
                return (
                  <tbody key={x.id}>
                    <tr>
                      <td>
                        {x.Date.substr(8, 2)}/{x.Date.substr(5, 2)}/
                        {x.Date.substr(0, 4)}
                      </td>
                      <td>{x.Time.substr(11, 5)}</td>
                      <td>
                        <Display title={x.Title} number={x.id.toString()} />
                      </td>
                      <td>
                        <Tagging label={x.Tag} />
                      </td>
                      <td>{x.Done.toString()}</td>
                      <td>
                        <Edit number={x.id} />
                      </td>
                      <td>
                        <a
                          className="btn btn-outline-danger"
                          role="button"
                          onClick={() => this.deleteItem(x.id)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
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
