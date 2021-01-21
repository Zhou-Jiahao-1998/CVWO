import React, { Component } from "react";
import axios from "axios";
import CombinedList from "./CombinedList";

class OverallContainer extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = { logins: [], isLoggedin: false, user: "" };
    this.getLogins();
  }

  getLogins() {
    axios
      .get("/api/v2/logins")
      .then((response) => {
        this.setState({ logins: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getLogins();
  }

  login() {
    this.setState({ isLoggedin: true });
  }

  logout() {
    this.setState({ isLoggedin: false });
  }

  verify(username, code) {
    const result = this.state.logins.filter((x) => x.name == username);

    if (result[0] == undefined) {
      return 1;
    } else if (code == result[0].password) {
      return 2;
    } else {
      return 3;
    }
  }

  redirect(username, code) {
    if (this.verify(username, code) == 1) {
      alert("No such username. Please sign up!");
    } else if (this.verify(username, code) == 2) {
      this.setState({ user: username });
      this.setState({ isLoggedin: true });
    } else if (this.verify(username, code) == 3) {
      alert("Wrong password. Please try again!");
    }
  }

  render() {
    const check = this.state.isLoggedin;
    let result;
    if (check == false) {
      result = (
        <>
          <h1>Please sign in</h1>
          <form>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label>Username:</label>
                <input
                  type="username"
                  className="form-control"
                  id="inputname"
                  placeholder="Username"
                ></input>
              </div>
              <div className="form-group col-md-3">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputpassword"
                  placeholder="Password"
                ></input>
              </div>
            </div>
          </form>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() =>
              this.redirect(
                document.getElementById("inputname").value,
                document.getElementById("inputpassword").value
              )
            }
          >
            Sign in
          </button>
        </>
      );
    } else {
      result = (
        <>
          <a
            className="btn btn-outline-primary"
            role="button"
            onClick={() => this.logout()}
          >
            Log Out
          </a>
          <CombinedList username={this.state.user} />
        </>
      );
    }
    return <>{result}</>;
  }
}

export default OverallContainer;
