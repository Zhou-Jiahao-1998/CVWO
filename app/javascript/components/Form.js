import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";
import CompletedTable from "./CompletedTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.goShow = this.goShow.bind(this);
    this.goCreate = this.goCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      user: this.props.username,
      stage: "Create",
      startDate: new Date(),
    };
  }

  goShow() {
    this.setState({ stage: "Index" });
  }

  goCreate() {
    this.setState({ stage: "Create" });
  }

  oneToN(n) {
    const result = [];
    for (let index = 0; index < n; index++) {
      result[index] = index + 1;
    }
    return result;
  }

  packnsend(input) {
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
    this.insertData(result);
  }

  async insertData(data) {
    await axios
      .post(`/api/v1/items.json`, data)
      .then((res) => console.log(res));
    this.goShow();
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const today = new Date();
    const currentHour = today.getHours();

    const helperHour = this.oneToN(24);
    const helperMin = this.oneToN(10);

    const check = this.state.stage;
    let result;
    if (check == "Index" && this.props.from == "todo") {
      result = <Table username={this.props.username} />;
    } else if (check == "Index" && this.props.from == "completed") {
      result = <CompletedTable username={this.props.username} />;
    } else {
      result = (
        <>
          <h1>Creating New Item</h1>

          <form>
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
            <br />
            <label>Time (24hr):</label>
            <div className="form-row">
              <div className="form-group col-md-1">
                <select
                  id="inputHour"
                  className="form-control"
                  defaultValue={currentHour}
                >
                  {helperHour.map((x) => (
                    <option key={x}>{x - 1}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-1">
                <select id="inputMin" className="form-control">
                  <option defaultValue>00</option>
                  <option key="05">05</option>
                  {helperMin.map((x) => (
                    <option key={x}>{(x + 1) * 5}</option>
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
                  placeholder="Title"
                ></input>
              </div>
              <div className="form-group col-md-2">
                <label>Tag:</label>
                <input
                  type="tag"
                  className="form-control"
                  id="inputTag"
                  placeholder="Tag"
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label>Details:</label>
              <textarea
                type="text"
                className="form-control"
                id="inputDetail"
                placeholder="What to do..."
                rows="3"
              ></textarea>
            </div>
            <div className="form-row" hidden>
              <div className="form-group col-md-1">
                <select id="inputDone" className="form-control">
                  <option defaultValue>false</option>
                  <option>true</option>
                </select>
              </div>
            </div>
          </form>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() =>
              this.packnsend([
                document.getElementById("inputHour").value,
                document.getElementById("inputMin").value,
                document.getElementById("inputTitle").value,
                document.getElementById("inputDetail").value,
                document.getElementById("inputTag").value,
                document.getElementById("inputDone").value,
              ])
            }
          >
            Create
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
    }
    return result;
  }
}

export default Form;
