import React, { Component } from "react";
import axios from "axios";
import EditForm from "./EditForm";
import Table from "./Table";
import CompletedTable from "./CompletedTable";
import FullTag from "./FullTag";

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
    this.goEdit = this.goEdit.bind(this);
    this.state = {
      items: [],
      stage: "Index",
      itemID: 0,
      date: null,
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

  async deleteItem(id) {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await axios.delete(`/api/v1/items/${id}`);
      this.getItems();
    }
  }

  goEdit(number, date) {
    let helper = today;
    helper.setFullYear(
      Number(date.substr(0, 4)),
      Number(date.substr(5, 2)) - 1,
      Number(date.substr(8, 2))
    );
    this.setState({
      date: helper,
    });
    this.setState({ itemID: number });
    this.setState({ stage: "Edit" });
  }

  goBack() {
    this.setState({ stage: "Back" });
  }

  goFullTag() {
    this.setState({ stage: "Full" });
  }

  async updateDone(data, id) {
    if (window.confirm("Are you sure this item is done?")) {
      await axios
        .patch(`/api/v1/items/${id}`, data)
        .then((res) => console.log(res));
      this.getItems();
    } else {
      document.getElementById(id).checked = false;
    }
  }

  render() {
    let header = this.props.done
      ? "Completed Items with Tag: "
      : "To-do List with Tag: ";

    let result;
    if (this.state.stage == "Index" && !this.props.done) {
      result = (
        <>
          <h1>
            {header}
            {this.props.filter}
          </h1>
          <a
            className="btn btn-outline-primary"
            role="button"
            onClick={() => this.goBack()}
          >
            Back
          </a>
          <a
            className="btn btn-outline-primary"
            role="button"
            onClick={() => this.goFullTag()}
          >
            All items with this Tag
          </a>
          <br />
          <br />
          <div>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Title</th>
                  <th>Details</th>
                  <th>Tag</th>
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
                          <input
                            type="checkbox"
                            id={x.id}
                            defaultChecked={false}
                            onClick={() =>
                              this.updateDone({ Done: true }, x.id)
                            }
                          ></input>
                        </td>
                        {overDue(
                          Number(x.Date.substr(0, 4)),
                          Number(x.Date.substr(5, 2)),
                          Number(x.Date.substr(8, 2)),
                          Number(x.Time.substr(11, 2)),
                          Number(x.Time.substr(14, 2))
                        ) ? (
                          <td className="text-danger">
                            {x.Date.substr(8, 2)}/{x.Date.substr(5, 2)}/
                            {x.Date.substr(0, 4)} (Overdue)
                          </td>
                        ) : (
                          <td>
                            {x.Date.substr(8, 2)}/{x.Date.substr(5, 2)}/
                            {x.Date.substr(0, 4)}
                          </td>
                        )}
                        {overDue(
                          Number(x.Date.substr(0, 4)),
                          Number(x.Date.substr(5, 2)),
                          Number(x.Date.substr(8, 2)),
                          Number(x.Time.substr(11, 2)),
                          Number(x.Time.substr(14, 2))
                        ) ? (
                          <td className="text-danger">
                            {x.Time.substr(11, 5)}
                          </td>
                        ) : (
                          <td>{x.Time.substr(11, 5)}</td>
                        )}
                        {overDue(
                          Number(x.Date.substr(0, 4)),
                          Number(x.Date.substr(5, 2)),
                          Number(x.Date.substr(8, 2)),
                          Number(x.Time.substr(11, 2)),
                          Number(x.Time.substr(14, 2))
                        ) ? (
                          <td className="text-danger">{x.Title}</td>
                        ) : (
                          <td>{x.Title}</td>
                        )}
                        {overDue(
                          Number(x.Date.substr(0, 4)),
                          Number(x.Date.substr(5, 2)),
                          Number(x.Date.substr(8, 2)),
                          Number(x.Time.substr(11, 2)),
                          Number(x.Time.substr(14, 2))
                        ) ? (
                          <td className="text-danger">{x.Details}</td>
                        ) : (
                          <td>{x.Details}</td>
                        )}
                        {overDue(
                          Number(x.Date.substr(0, 4)),
                          Number(x.Date.substr(5, 2)),
                          Number(x.Date.substr(8, 2)),
                          Number(x.Time.substr(11, 2)),
                          Number(x.Time.substr(14, 2))
                        ) ? (
                          <td className="text-danger">{x.Tag}</td>
                        ) : (
                          <td>{x.Tag}</td>
                        )}
                        <td>
                          <a
                            className="btn btn-outline-success"
                            role="button"
                            onClick={() => this.goEdit(x.id, x.Date)}
                          >
                            Edit
                          </a>
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
    } else if (this.state.stage == "Index" && this.props.done) {
      result = (
        <>
          <h1>
            {header}
            {this.props.filter}
          </h1>
          <a
            className="btn btn-outline-primary"
            role="button"
            onClick={() => this.goBack()}
          >
            Back
          </a>
          <a
            className="btn btn-outline-primary"
            role="button"
            onClick={() => this.goFullTag()}
          >
            All items with this Tag
          </a>
          <br />
          <br />
          <div>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Title</th>
                  <th>Details</th>
                  <th>Tag</th>
                  <th colSpan="3"></th>
                </tr>
              </thead>

              {this.state.items
                .reverse()
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
                        <td>
                          <a
                            className="btn btn-outline-success"
                            role="button"
                            onClick={() => this.goEdit(x.id, x.Date)}
                          >
                            Edit
                          </a>
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
    } else if (this.state.stage == "Edit") {
      result = (
        <EditForm
          username={this.props.username}
          itemID={this.state.itemID}
          from="filtered"
          tag={this.props.filter}
          done={this.props.done}
          calendar={this.state.date}
        />
      );
    } else if (this.state.stage == "Full") {
      result = (
        <FullTag
          username={this.props.username}
          filter={this.props.filter}
          done={this.props.done}
        />
      );
    } else if (this.props.done) {
      result = <CompletedTable username={this.props.username} />;
    } else {
      result = <Table username={this.props.username} />;
    }
    return result;
  }
}

export default ItemsContainer;
