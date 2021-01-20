import React, { Component } from "react";
import axios from "axios";
import Edit from "./Edit";

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
    let header = this.props.done
      ? "Completed Items with Tag: "
      : "To-do List with Tag: ";
    return (
      <>
        <h1>
          {header}
          {this.props.filter}
        </h1>
        <br />
        <br />
        <div>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Date (DD/MM/YYYY)</th>
                <th>Time</th>
                <th>Title</th>
                <th>Details</th>
                <th>Tag</th>
                <th>Done?</th>
                <th colSpan="3"></th>
              </tr>
            </thead>

            {this.state.items
              .filter(
                (item) =>
                  item.Tag == this.props.filter &&
                  item.user_name == this.props.username &&
                  item.Done == this.props.done
              )
              .map((x) => {
                return (
                  <tbody key={x.id}>
                    <tr>
                      <td>
                        {x.Date.substr(8, 2)}/{x.Date.substr(5, 2)}/
                        {x.Date.substr(0, 4)}
                      </td>
                      <td>{x.Time.substr(11, 5)}</td>
                      <td>{x.Title}</td>
                      <td>{x.Details}</td>
                      <td>{x.Tag}</td>
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
