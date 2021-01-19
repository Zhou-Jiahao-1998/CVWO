import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logins: [],
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
      window.location.replace(`http://localhost:3000/items?user=${username}`);
    } else if (this.verify(username, code) == 3) {
      alert("Wrong password. Please try again!");
    }
  }

  render() {
    return (
      <>
        <form>
          <label>Please sign in</label>
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
  }
}

export default Form;
