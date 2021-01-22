import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";
import CompletedTable from "./CompletedTable";

class Form extends Component {
  constructor(props) {
    super(props);
    this.goShow = this.goShow.bind(this);
    this.goCreate = this.goCreate.bind(this);
    this.state = {
      user: this.props.username,
      stage: "Create",
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
    const result = {
      Date: input[0] + "-" + input[1] + "-" + input[2],
      Time: input[3] + ":" + input[4],
      Title: input[5],
      Details: input[6],
      Tag: input[7],
      Done: input[8],
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

  render() {
    const helperDay = this.oneToN(31);
    const helperMonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthConvert = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = helperMonth[today.getMonth()];
    const currentDay = today.getDate();
    const currentHour = today.getHours();

    const helperYear = this.oneToN(10).map((x) => currentYear - 5 + x);
    const helperHour = this.oneToN(24);
    const helperMin = this.oneToN(11);

    const check = this.state.stage;
    let result;
    if (check == "Index" && this.props.from == "todo") {
      result = <Table username={this.props.username} />;
    } else if (check == "Index" && this.props.from == "completed") {
      result = <CompletedTable username={this.props.username} />;
    } else {
      result = (
        <>
          <form>
            <label>Date:</label>
            <div className="form-row">
              <div className="form-group col-md-1">
                <select
                  id="inputDay"
                  className="form-control"
                  required
                  value={currentDay}
                >
                  {helperDay.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
                <div className="invalid-tooltip">Please select a day.</div>
              </div>
              <div className="form-group col-md-1">
                <select
                  id="inputMonth"
                  className="form-control"
                  value={currentMonth}
                >
                  {helperMonth.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-1">
                <select
                  id="inputYear"
                  className="form-control"
                  value={currentYear}
                >
                  {helperYear.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
            </div>
            <label>Time (24hr):</label>
            <div className="form-row">
              <div className="form-group col-md-1">
                <select
                  id="inputHour"
                  className="form-control"
                  value={currentHour}
                >
                  {helperHour.map((x) => (
                    <option key={x}>{x - 1}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-1">
                <select id="inputMin" className="form-control">
                  <option defaultValue>0</option>
                  {helperMin.map((x) => (
                    <option key={x}>{x * 5}</option>
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
            <label>Done?</label>
            <div className="form-row">
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
                document.getElementById("inputYear").value,
                monthConvert[document.getElementById("inputMonth").value],
                document.getElementById("inputDay").value,
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
