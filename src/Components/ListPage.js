import React, { Component } from "react";
import firebase from "../firebase.js";
import Modal from "./Modal.js";
import {Link} from "react-router-dom";
import '../styles/listPage.css';


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

  //removeList from List Page
  removeList = (listName) => {
    {
      const dbRef = firebase.database().ref()
      let matchedObject = ''
      dbRef.on("value", res => {
        let response = res.val();
        //going through each object in database response, checking to see if list names match, once we get to the list name that is the same as the list name we clicked on, remove that list from the database.
        for (let object in response) {
          if (response[object].name === listName) {
            matchedObject = object;
          }
        }
      });
      const listRef = dbRef.child(matchedObject);
      listRef.remove()
    }
  }

  //on click of create new list, modal appears for user to enter list name, also this page is displaying the lists the user already has.
  render() {
    return (
      <div>
        <h2>Movie Lists</h2>
        <Link to="/results">Search More Movies</Link>
        <button onClick={this.showModal}>Create new list</button>
        {this.state.show && <Modal handleClose={this.hideModal} />}
        <ul>
          {this.state.lists.map((listName, i) => {
            return (
              <li key={i}>
                <Link to={`/lists/${listName}`}>
                {/* adding space back to list names displayed on list page */}
                  <p>{listName.replace(/-/g, ' ')}</p>
                </Link>
                <button 
                  className="removeList" 
                  onClick= { () => { this.removeList(listName) }}
                >
                  Remove List 
                </button>

              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ListPage;
