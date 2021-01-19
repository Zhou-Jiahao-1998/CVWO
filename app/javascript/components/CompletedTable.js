import React, { Component } from "react";
import axios from "axios";
import Display from "./Display";
import Edit from "./Edit";
import Tagging from "./Tagging";

class CompletedTable extends Component {
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
    if (window.confirm("Are you sure you want to delete this entry?")) {
      axios.delete(`/api/v1/items/${id}`);
      window.location.reload(false);
    }
  }

  render() {
    return (
      <>
        <h1>Completed Items</h1>
        <div>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Date(DD/MM/YYYY)</th>
                <th>Time</th>
                <th>Title</th>
                <th>Details</th>
                <th>Tag</th>
                <th>Done?</th>
                <th colSpan="3"></th>
              </tr>
            </thead>

            {this.state.items
              .reverse()
              .filter(
                (item) =>
                  item.Done == true && item.user_name == this.props.username
              )
              .map((item) => {
                return (
                  <tbody key={item.id}>
                    <tr>
                      <td>
                        {item.Date.substr(8, 2)}/{item.Date.substr(5, 2)}/
                        {item.Date.substr(0, 4)}
                      </td>
                      <td>{item.Time.substr(11, 5)}</td>
                      <td>{item.Title}</td>
                      <td>{item.Details}</td>
                      <td>
                        <Tagging label={item.Tag} />
                      </td>
                      <td>{item.Done.toString()}</td>
                      <td>
                        <Edit number={item.id} />
                      </td>
                      <td>
                        <a
                          className="btn btn-outline-danger"
                          role="button"
                          onClick={() => this.deleteItem(item.id)}
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

export default CompletedTable;
