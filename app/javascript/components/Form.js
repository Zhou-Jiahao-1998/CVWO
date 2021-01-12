import React from "react";

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
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = helperMonth[today.getMonth()];
const currentDay = today.getDate();
const currentHour = today.getHours();
const currentMin = today.getMinutes();

const helperYear = oneToN(10).map((x) => x + currentYear);
const helperHour = oneToN(24);
const helperMin = oneToN(60);

function Form() {
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
              <option selected>{currentHour}</option>
              {helperHour.map((x) => (
                <option>{x - 1}</option>
              ))}
            </select>
          </div>
          <div class="form-group col-md-1">
            <select id="inputMin" class="form-control">
              <option selected>{currentMin}</option>
              {helperMin.map((x) => (
                <option>{x - 1}</option>
              ))}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputTitle4">Title:</label>
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
              id="inputTag4"
              placeholder="Tag"
            ></input>
          </div>
        </div>
        <div class="form-group">
          <label for="inputDetails">Details:</label>
          <textarea
            type="text"
            class="form-control"
            id="inputDetails"
            placeholder="What to do..."
            rows="3"
          ></textarea>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="gridCheck"
            ></input>
            <label class="form-check-label" for="gridCheck">
              Done?
            </label>
          </div>
        </div>
      </form>
      <button
        class="btn btn-primary"
        type="submit"
        onClick={() => alert("hello")}
      >
        Create
      </button>
    </>
  );
}
export default Form;
