import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";
import CompletedTable from "./CompletedTable";
import FilteredTable from "./FilteredTable";
import FullTag from "./FullTag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

function oneToN(n) {
  const result = [];
  for (let index = 0; index < n; index++) {
    result[index] = index + 1;
  }
  return result;
}

const helperHour = oneToN(24);
const helperMin = oneToN(10);

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.goShow = this.goShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      items: [],
      user: this.props.username,
      stage: "Edit",
      startDate: this.props.calendar,
    };
  }

  getItems() {
    axios
      .get(`/api/v1/items/`)
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getItems();
  }

  goShow() {
    this.setState({ stage: "Index" });
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  packnsend(input, id) {
    const inputDate = this.state.startDate;
    const result = {
      Date:
        inputDate.getFullYear().toString() +
        "-" +
        (inputDate.getMonth() + 1).toString() +
        "-" +
        inputDate.getDate().toString(),
      Time: input[0] + ":" + input[1],
      Title: input[2],
      Details: input[3],
      Tag: input[4],
      Done: input[5],
      user_name: this.props.username,
    };
    this.insertData(result, id);
  }

  async insertData(data, id) {
    await axios
      .patch(`/api/v1/items/${id}`, data)
      .then((res) => console.log(res));
    this.goShow();
  }

  render() {
    const check = this.state.stage;
    let result;
    if (check == "Edit") {
      result = (
        <>
          <h1>Editing Item</h1>
          {this.state.items
            .filter((item) => item.id == this.props.itemID)
            .map((x) => (
              <form key={x.id}>
                <label>Date:</label>
                <div className="form-row">
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    name="startDate"
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    showMonthDropdown
                  />
                </div>
                <label>Time (24hr):</label>
                <div className="form-row">
                  <div className="form-group col-md-1">
                    <select
                      id="inputHour"
                      className="form-control"
                      defaultValue={x.Time.substr(11, 2)}
                    >
                      {helperHour.map((y) => (
                        <option key={y}>{y - 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-1">
                    <select
                      id="inputMin"
                      className="form-control"
                      defaultValue={x.Time.substr(14, 2)}
                    >
                      <option key="00">00</option>
                      <option key="00">05</option>
                      {helperMin.map((y) => (
                        <option key={y}>{(y + 1) * 5}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label>Title:</label>
                    <input
                      type="title"
                      className="form-control"
                      id="inputTitle"
                      defaultValue={x.Title}
                    ></input>
                  </div>
                  <div className="form-group col-md-2">
                    <label>Tag:</label>
                    <input
                      type="tag"
                      className="form-control"
                      id="inputTag"
                      defaultValue={x.Tag}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label>Details:</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="inputDetail"
                    rows="3"
                    defaultValue={x.Details}
                  ></textarea>
                </div>
                <label>Done?</label>
                {"  "}
                <input
                  type="checkbox"
                  id="inputDone"
                  defaultChecked={x.Done}
                ></input>
              </form>
            ))}
          <br />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() =>
              this.packnsend(
                [
                  document.getElementById("inputHour").value,
                  document.getElementById("inputMin").value,
                  document.getElementById("inputTitle").value,
                  document.getElementById("inputDetail").value,
                  document.getElementById("inputTag").value,
                  document.getElementById("inputDone").checked,
                ],
                this.props.itemID
              )
            }
          >
            Update
          </button>
          <br />
          <br />
          <button
            className="btn btn-danger"
            type="submit"
            onClick={() => this.goShow()}
          >
            Cancel
          </button>
        </>
      );
    } else if (check == "Index" && this.props.from == "todo") {
      result = <Table username={this.props.username} />;
    } else if (check == "Index" && this.props.from == "completed") {
      result = <CompletedTable username={this.props.username} />;
    } else if (check == "Index" && this.props.from == "filtered") {
      result = (
        <FilteredTable
          username={this.props.username}
          filter={this.props.tag}
          done={this.props.done}
        />
      );
    } else {
      result = (
        <FullTag
          username={this.props.username}
          filter={this.props.tag}
          done={this.props.done}
        />
      );
    }
    return result;
  }
}

export default EditForm;
