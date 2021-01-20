import React, { Component } from "react";
import axios from "axios";
import Edit from "./Edit";
import Tagging from "./Tagging";
import Form from "./Form";
import EditForm from "./EditForm";

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();
const currentHour = today.getHours();
const currentMin = today.getMinutes();

function overDue(year, month, day, hour, minute) {
  return year < currentYear
    ? true
    : year > currentYear
    ? false
    : month < currentMonth
    ? true
    : month > currentMonth
    ? false
    : day < currentDay
    ? true
    : day > currentDay
    ? false
    : hour < currentHour
    ? true
    : hour > currentHour
    ? false
    : minute < currentMin
    ? true
    : false;
}

class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.goShow = this.goShow.bind(this);
    this.goEdit = this.goEdit.bind(this);
    this.goCreate = this.goCreate.bind(this);
    this.state = {
      items: [],
      user: this.props.username,
      stage: "Index",
      itemID: 0,
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
      this.getItems();
    }
  }

  goShow() {
    this.setState({ stage: "Index" });
  }

  goEdit(number) {
    this.setState({ itemID: number });
    this.setState({ stage: "Edit" });
  }

  goCreate() {
    this.setState({ stage: "Create" });
  }

  render() {
    const check = this.state.stage;
    let result;
    if (check == "Index") {
      result = (
        <>
          <div>
            <h1>{this.props.username}'s To-do List</h1>
            <a
              className="btn btn-outline-primary"
              role="button"
              onClick={() => this.getItems()}
            >
              refresh
            </a>
            <a
              className="btn btn-outline-primary"
              role="button"
              onClick={() => this.goCreate()}
            >
              New Items
            </a>
            <br />
            <br />
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
                .filter(
                  (item) =>
                    item.Done == false && item.user_name == this.props.username
                )
                .map((item) => {
                  return (
                    <tbody key={item.id}>
                      <tr>
                        {overDue(
                          Number(item.Date.substr(0, 4)),
                          Number(item.Date.substr(5, 2)),
                          Number(item.Date.substr(8, 2)),
                          Number(item.Time.substr(11, 2)),
                          Number(item.Time.substr(14, 2))
                        ) ? (
                          <td className="text-danger">
                            {item.Date.substr(8, 2)}/{item.Date.substr(5, 2)}/
                            {item.Date.substr(0, 4)}
                          </td>
                        ) : (
                          <td>
                            {item.Date.substr(8, 2)}/{item.Date.substr(5, 2)}/
                            {item.Date.substr(0, 4)}
                          </td>
                        )}
                        {overDue(
                          Number(item.Date.substr(0, 4)),
                          Number(item.Date.substr(5, 2)),
                          Number(item.Date.substr(8, 2)),
                          Number(item.Time.substr(11, 2)),
                          Number(item.Time.substr(14, 2))
                        ) ? (
                          <td className="text-danger">
                            {item.Time.substr(11, 5)}
                          </td>
                        ) : (
                          <td>{item.Time.substr(11, 5)}</td>
                        )}
                        <td>{item.Title}</td>
                        <td>{item.Details}</td>
                        <td>
                          <Tagging label={item.Tag} />
                        </td>
                        {overDue(
                          Number(item.Date.substr(0, 4)),
                          Number(item.Date.substr(5, 2)),
                          Number(item.Date.substr(8, 2)),
                          Number(item.Time.substr(11, 2)),
                          Number(item.Time.substr(14, 2))
                        ) ? (
                          <td className="text-danger">
                            {item.Done.toString()}
                          </td>
                        ) : (
                          <td>{item.Done.toString()}</td>
                        )}
                        <td>
                          <a
                            className="btn btn-outline-success"
                            role="button"
                            onClick={() => this.goEdit(item.id)}
                          >
                            Edit
                          </a>
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
    } else if (check == "Create") {
      result = <Form username={this.props.username} />;
    } else if (check == "Edit") {
      result = (
        <EditForm username={this.props.username} itemID={this.state.itemID} />
      );
    }
    return result;
  }
}

export default ItemsContainer;
