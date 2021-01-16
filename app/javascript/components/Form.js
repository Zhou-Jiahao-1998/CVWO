import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
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
    };
    this.insertData(result);
  }

  insertData(data) {
    axios.post(`/api/v1/items.json`, data).then((res) => console.log(res));
    window.location.replace("http://localhost:3000/home/about");
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
    const currentMin = today.getMinutes();

    const helperYear = this.oneToN(10).map((x) => x + currentYear);
    const helperHour = this.oneToN(24);
    const helperMin = this.oneToN(60);
    return (
      <>
        <form>
          <label>Date:</label>
          <div class="form-row">
            <div class="form-group col-md-1">
              <select id="inputDay" class="form-control" required>
                <option selected disabled>
                  {currentDay}
                </option>
                {helperDay.map((x) => (
                  <option>{x}</option>
                ))}
              </select>
              <div class="invalid-tooltip">Please select a day.</div>
            </div>
            <div class="form-group col-md-1">
              <select id="inputMonth" class="form-control">
                <option selected disabled>
                  {currentMonth}
                </option>
                {helperMonth.map((x) => (
                  <option>{x}</option>
                ))}
              </select>
            </div>
            <div class="form-group col-md-1">
              <select id="inputYear" class="form-control">
                <option selected>{currentYear}</option>
                {helperYear.map((x) => (
                  <option>{x}</option>
                ))}
              </select>
            </div>
          </div>
          <label>Time (24hr):</label>
          <div class="form-row">
            <div class="form-group col-md-1">
              <select id="inputHour" class="form-control">
                <option selected disabled>
                  {currentHour}
                </option>
                {helperHour.map((x) => (
                  <option>{x - 1}</option>
                ))}
              </select>
            </div>
            <div class="form-group col-md-1">
              <select id="inputMin" class="form-control">
                <option selected disabled>
                  {currentMin}
                </option>
                {helperMin.map((x) => (
                  <option>{x - 1}</option>
                ))}
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputTitle">Title:</label>
              <input
                type="title"
                class="form-control"
                id="inputTitle"
                placeholder="Title"
              ></input>
            </div>
            <div class="form-group col-md-2">
              <label for="inputTag">Tag:</label>
              <input
                type="tag"
                class="form-control"
                id="inputTag"
                placeholder="Tag"
              ></input>
            </div>
          </div>
          <div class="form-group">
            <label for="inputDetail">Details:</label>
            <textarea
              type="text"
              class="form-control"
              id="inputDetail"
              placeholder="What to do..."
              rows="3"
            ></textarea>
          </div>
          <label>Done?</label>
          <div class="form-row">
            <div class="form-group col-md-1">
              <select id="inputDone" class="form-control">
                <option selected>false</option>
                <option>true</option>
              </select>
            </div>
          </div>
        </form>
        <button
          class="btn btn-primary"
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
      </>
    );
  }
}

export default Form;
