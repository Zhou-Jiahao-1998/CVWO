import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";
import EditForm from "./EditForm";
import FilteredTable from "./FilteredTable";

class CompletedTable extends Component {
  constructor(props) {
    super(props);
    this.goShow = this.goShow.bind(this);
    this.goEdit = this.goEdit.bind(this);
    this.goCreate = this.goCreate.bind(this);
    this.state = {
      items: [],
      user: this.props.username,
      stage: "Index",
      itemID: 0,
      filter: "",
    };
    this.getItems();
  }

  getItems() {
    axios
      .get("/api/v1/items")
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getItems();
  }

  async deleteItem(id) {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await axios.delete(`/api/v1/items/${id}`);
      this.getItems();
    }
  }

  goShow() {
    this.setState({ stage: "Index" });
  }

  goEdit(number) {
    this.setState({ itemID: number });
    this.setState({ stage: "Edit" });
  }

  goCreate() {
    this.setState({ stage: "Create" });
  }

  goTag(tag) {
    this.setState({ filter: tag });
  }

  render() {
    const check = this.state.stage;
    let result;

    if (this.state.filter != "") {
      result = (
        <FilteredTable
          username={this.props.username}
          filter={this.state.filter}
          done={true}
        />
      );
    } else if (check == "Index") {
      result = (
        <>
          <h1>Completed Items</h1>
          <a
            className="btn btn-outline-primary"
            role="button"
            onClick={() => this.goCreate()}
          >
            New Items
          </a>
          <br />
          <br />
          <div>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Date(DD/MM/YYYY)</th>
                  <th>Time</th>
                  <th>Title</th>
                  <th>Details</th>
                  <th>Tag</th>
                  <th colSpan="3"></th>
                </tr>
              </thead>

              {this.state.items
                .reverse()
                .filter(
                  (item) =>
                    item.Done == true && item.user_name == this.props.username
                )
                .map((item) => {
                  return (
                    <tbody key={item.id}>
                      <tr>
                        <td>
                          {item.Date.substr(8, 2)}/{item.Date.substr(5, 2)}/
                          {item.Date.substr(0, 4)}
                        </td>
                        <td>{item.Time.substr(11, 5)}</td>
                        <td>{item.Title}</td>
                        <td>{item.Details}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-link"
                            onClick={() => this.goTag(item.Tag)}
                          >
                            {item.Tag}
                          </button>
                        </td>
                        <td>
                          <a
                            className="btn btn-outline-success"
                            role="button"
                            onClick={() => this.goEdit(item.id)}
                          >
                            Edit
                          </a>
                        </td>
                        <td>
                          <a
                            className="btn btn-outline-danger"
                            role="button"
                            onClick={() => this.deleteItem(item.id)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
        </>
      );
    } else if (check == "Create") {
      result = <Form username={this.props.username} from="completed" />;
    } else if (check == "Edit") {
      result = (
        <EditForm
          username={this.props.username}
          itemID={this.state.itemID}
          from="completed"
        />
      );
    }
    return result;
  }
}

export default CompletedTable;
