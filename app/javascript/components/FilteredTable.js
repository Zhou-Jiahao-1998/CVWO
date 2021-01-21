import React, { Component } from "react";
import axios from "axios";
import EditForm from "./EditForm";

class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.goEdit = this.goEdit.bind(this);
    this.state = {
      items: [],
      stage: "Index",
      itemID: 0,
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

  goEdit(number) {
    this.setState({ itemID: number });
    this.setState({ stage: "Edit" });
  }

  render() {
    let header = this.props.done
      ? "Completed Items with Tag: "
      : "To-do List with Tag: ";

    /*let oppButton = this.props.done ? (
      <a
        className="btn btn-outline-primary"
        role="button"
        onClick={() => this.getItems()}
      >
        Todo Items with Tag: {this.props.filter}
      </a>
    ) : (
      <a
        className="btn btn-outline-primary"
        role="button"
        onClick={() => this.getItems()}
      >
        Completetd Items with Tag: {this.props.filter}
      </a>
    );*/
    let result;
    if (this.state.stage == "Index") {
      result = (
        <>
          <h1>
            {header}
            {this.props.filter}
          </h1>
          <br />
          <div>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Date (DD/MM/YYYY)</th>
                  <th>Time</th>
                  <th>Title</th>
                  <th>Details</th>
                  <th>Tag</th>
                  <th>Done?</th>
                  <th colSpan="3"></th>
                </tr>
              </thead>

              {this.state.items
                .filter(
                  (item) =>
                    item.Tag == this.props.filter &&
                    item.user_name == this.props.username &&
                    item.Done == this.props.done
                )
                .map((x) => {
                  return (
                    <tbody key={x.id}>
                      <tr>
                        <td>
                          {x.Date.substr(8, 2)}/{x.Date.substr(5, 2)}/
                          {x.Date.substr(0, 4)}
                        </td>
                        <td>{x.Time.substr(11, 5)}</td>
                        <td>{x.Title}</td>
                        <td>{x.Details}</td>
                        <td>{x.Tag}</td>
                        <td>{x.Done.toString()}</td>
                        <td>
                          <a
                            className="btn btn-outline-success"
                            role="button"
                            onClick={() => this.goEdit(x.id)}
                          >
                            Edit
                          </a>
                        </td>
                        <td>
                          <a
                            className="btn btn-outline-danger"
                            role="button"
                            onClick={() => this.deleteItem(x.id)}
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
    } else {
      result = (
        <EditForm
          username={this.props.username}
          itemID={this.state.itemID}
          from="filtered"
          tag={this.props.filter}
          done={this.props.done}
        />
      );
    }
    return result;
  }
}

export default ItemsContainer;
