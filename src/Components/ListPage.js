import React, { Component } from "react";
import firebase from "../firebase.js";
import Modal from "./Modal.js";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";


class ListPage extends Component {
  constructor() {
    super();

    this.state = {
      lists: [],
      listsName: "",
      show: false
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", res => {
      console.log(res.val());
      let response = res.val();
      let tempArray = [];
      for (let object in response) {
        tempArray.push(response[object].name);
      }
      this.setState({
        lists: tempArray
      });
    });
  }
  showModal = () => {
    this.setState({
      show: true
    });
  };
  hideModal = () => {
    this.setState({
      show: false
    });
  };

  render() {
    return (
      <div>
        <h2>Movie Lists</h2>
        <button onClick={this.showModal}>Create new list</button>
        {this.state.show && <Modal handleClose={this.hideModal} />}
        <ul>
          {this.state.lists.map((listName, i) => {
            // REMEMBER to fix url name so there are no spaces
            return (
              <li key={i}>
                <Link to={`/lists/${listName}`}>
                  <p>{listName}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ListPage;
