import React, { Component } from "react";
import Table from "./Table";
import CompletedTable from "./CompletedTable";

class CombinedList extends Component {
  constructor(props) {
    super(props);
    this.turnSwitch = this.turnSwitch.bind(this);
    this.state = { listSwitch: true };
  }

  turnSwitch() {
    if (this.state.listSwitch) {
      this.setState({ listSwitch: false });
    } else {
      this.setState({ listSwitch: true });
    }
  }
  render() {
    const check = this.state.listSwitch;
    let result;
    if (check) {
      result = (
        <>
          <a
            className="btn btn-outline-primary"
            role="button"
            onClick={() => this.turnSwitch()}
          >
            Completed Items
          </a>
          <Table username={this.props.username} />
        </>
      );
    } else {
      result = (
        <>
          <a
            className="btn btn-outline-primary"
            role="button"
            onClick={() => this.turnSwitch()}
          >
            To-do List
          </a>

          <CompletedTable username={this.props.username} />
        </>
      );
    }
    return <>{result}</>;
  }
}

export default CombinedList;
