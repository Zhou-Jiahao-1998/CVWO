import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";

function oneToN(n) {
  const result = [];
  for (let index = 0; index < n; index++) {
    result[index] = index + 1;
  }
  return result;
}

const helperDay = oneToN(31);
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
const helperYear = oneToN(10).map((x) => x + 2020);
const helperHour = oneToN(24);
const helperMin = oneToN(60);

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.goShow = this.goShow.bind(this);
    this.state = {
      items: [],
      user: this.props.username,
      stage: "Edit",
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

  packnsend(input, id) {
    const result = {
      Date: input[0] + "-" + input[1] + "-" + input[2],
      Time: input[3] + ":" + input[4],
      Title: input[5],
      Details: input[6],
      Tag: input[7],
      Done: input[8],
      user_name: this.props.username,
    };
    this.insertData(result, id);
  }

  insertData(data, id) {
    axios.patch(`/api/v1/items/${id}`, data).then((res) => console.log(res));
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
                  <div className="form-group col-md-1">
                    <select id="inputDay" className="form-control" required>
                      <option defaultValue>{x.Date.substr(8, 2)}</option>
                      {helperDay.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-1">
                    <select id="inputMonth" className="form-control">
                      <option defaultValue>
                        {helperMonth[Number(x.Date.substr(5, 2)) - 1]}
                      </option>
                      {helperMonth.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-1">
                    <select id="inputYear" className="form-control">
                      <option defaultValue>{x.Date.substr(0, 4)}</option>
                      {helperYear.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <label>Time (24hr):</label>
                <div className="form-row">
                  <div className="form-group col-md-1">
                    <select id="inputHour" className="form-control">
                      <option defaultValue>{x.Time.substr(11, 2)}</option>
                      {helperHour.map((y) => (
                        <option key={y}>{y - 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-1">
                    <select id="inputMin" className="form-control">
                      <option defaultValue>{x.Time.substr(14, 2)}</option>
                      {helperMin.map((y) => (
                        <option key={y}>{y - 1}</option>
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
                      placeholder={x.Title}
                    ></input>
                  </div>
                  <div className="form-group col-md-2">
                    <label>Tag:</label>
                    <input
                      type="tag"
                      className="form-control"
                      id="inputTag"
                      placeholder={x.Tag}
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
                    placeholder={x.Details}
                  ></textarea>
                </div>
                <label>Done?</label>
                <div className="form-row">
                  <div className="form-group col-md-1">
                    <select id="inputDone" className="form-control">
                      <option defaultValue>{x.Done.toString()}</option>
                      <option key="true">true</option>
                      <option key="false">false</option>
                    </select>
                  </div>
                </div>
              </form>
            ))}
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() =>
              this.packnsend(
                [
                  document.getElementById("inputYear").value,
                  monthConvert[document.getElementById("inputMonth").value],
                  document.getElementById("inputDay").value,
                  document.getElementById("inputHour").value,
                  document.getElementById("inputMin").value,
                  document.getElementById("inputTitle").value == ""
                    ? document.getElementById("inputTitle").placeholder
                    : document.getElementById("inputTitle").value,
                  document.getElementById("inputDetail").value == ""
                    ? document.getElementById("inputDetail").placeholder
                    : document.getElementById("inputDetail").value,
                  document.getElementById("inputTag").value == ""
                    ? document.getElementById("inputTag").placeholder
                    : document.getElementById("inputTag").value,
                  document.getElementById("inputDone").value,
                ],
                this.props.itemID
              )
            }
          >
            Update
          </button>
        </>
      );
    } else {
      result = <Table username={this.props.username} />;
    }
    return result;
  }
}

export default EditForm;
