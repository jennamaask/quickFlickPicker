import React, { Component } from "react";
import firebase from "../firebase.js";
import Modal from "./Modal.js";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";


class ListPage extends Component {
  constructor() {
    super();
//setting initial state
    this.state = {
      lists: [],
      listsName: "",
      show: false
    };
  }
  //connecting to firebase, we're grabbing the user's list names and setting them to a temporary array, and then setting state of the lists array to the temporary array.
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

  //creating list modal, show and hide on click.
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
  
//on click of create new list, modal appears for user to enter list name, also this page is displaying the lists the user already has.
  render() {
    return (
      <div>
        <h2>Movie Lists</h2>
        <Link to="/">
          Search More Movies
        </Link>
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
