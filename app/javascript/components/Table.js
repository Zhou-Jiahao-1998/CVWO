import React, { Component } from "react";
import axios from "axios";
import Display from "./Display";
import Edit from "./Edit";
import Tagging from "./Tagging";

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
      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date(DD/MM/YYYY)</th>
              <th>Time</th>
              <th>Title (Click to view details)</th>
              <th>Tag</th>
              <th>Done?</th>
              <th colSpan="3"></th>
            </tr>
          </thead>

          {this.state.items
            .filter((item) => item.Done == false)
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
                      <td className="text-danger">{item.Time.substr(11, 5)}</td>
                    ) : (
                      <td>{item.Time.substr(11, 5)}</td>
                    )}
                    <td>
                      <Display title={item.Title} number={item.id.toString()} />
                    </td>
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
                      <td className="text-danger">{item.Done.toString()}</td>
                    ) : (
                      <td>{item.Done.toString()}</td>
                    )}
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
    );
  }
}

export default ItemsContainer;
