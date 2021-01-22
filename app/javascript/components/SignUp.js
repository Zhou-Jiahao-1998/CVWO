import React, { Component } from "react";
import axios from "axios";
import OverallContainer from "./OverallContainer";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.goMain = this.goMain.bind(this);
    this.state = {
      logins: [],
      signUp: true,
    };
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

  goMain() {
    this.setState({ signUp: false });
  }

  verify(username, code1, code2) {
    const result = this.state.logins.filter((x) => x.name == username);

    if (username == "") {
      alert("Please enter a valid username!");
    } else if (code1 == "" && code2 == "") {
      alert("Please enter a password!");
    } else if (result[0] != undefined) {
      alert("This username is already taken. Please try another one!");
    } else if (code1 != code2) {
      alert("Two password do not match. Please try again!");
    } else {
      this.insertData({ name: username, password: code1 });
    }
  }

  async insertData(data) {
    await axios
      .post(`/api/v2/logins.json`, data)
      .then((res) => console.log(res));
    alert("You have successfully signed up! please Log in now.");
    this.goMain();
  }

  render() {
    const check = this.state.signUp;
    let result;
    if (check) {
      result = (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand">Jiahao's App</a>
          </nav>
          <br />
          <div className="container">
            <h1>Please sign up</h1>
            <h4>
              Note: This website is built from scratch. Please avoid using real
              email addresses and password!
            </h4>
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
              </div>
              <div className="form-row">
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
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="checkpassword"
                    placeholder="Password"
                  ></input>
                </div>
              </div>
            </form>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() =>
                this.verify(
                  document.getElementById("inputname").value,
                  document.getElementById("inputpassword").value,
                  document.getElementById("checkpassword").value
                )
              }
            >
              Sign up
            </button>
            <br />
            <br />
            <button
              className="btn btn-danger"
              type="submit"
              onClick={() => this.goMain()}
            >
              Cancel
            </button>
          </div>
        </>
      );
    } else {
      result = <OverallContainer />;
    }
    return result;
  }
}

export default SignUp;
