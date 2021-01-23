import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";
import CompletedTable from "./CompletedTable";
import FilteredTable from "./FilteredTable";
import FullTag from "./FullTag";

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
const today = new Date();
const currentYear = today.getFullYear();
const helperYear = oneToN(10).map((x) => x + currentYear - 5);
const helperHour = oneToN(24);
const helperMin = oneToN(10);

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
                  <div className="form-group col-md-1">
                    <select
                      id="inputDay"
                      className="form-control"
                      required
                      defaultValue={x.Date.substr(8, 2)}
                    >
                      {helperDay.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-1">
                    <select
                      id="inputMonth"
                      className="form-control"
                      defaultValue={
                        helperMonth[Number(x.Date.substr(5, 2)) - 1]
                      }
                    >
                      {helperMonth.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-1">
                    <select
                      id="inputYear"
                      className="form-control"
                      defaultValue={x.Date.substr(0, 4)}
                    >
                      {helperYear.map((y) => (
                        <option key={y}>{y}</option>
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
                  document.getElementById("inputYear").value,
                  monthConvert[document.getElementById("inputMonth").value],
                  document.getElementById("inputDay").value,
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
