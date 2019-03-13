import React, { Component } from "react";
import firebase from "../firebase.js";
import Modal from "./Modal.js";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/listPage.css";

library.add(faTimesCircle);

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
  removeList = listName => {
    {
      const dbRef = firebase.database().ref();
      let matchedObject = "";
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
      listRef.remove();
    }
  };

  //on click of create new list, modal appears for user to enter list name (code in modal.js), also this page is displaying the lists the user already has.
  render() {
    return (
      <div>
        <div className="listPageWrapper">
          <div className="listPageHeaderWrap clearfix">
            <h2>Movie Lists</h2>
            <div className="listNavButtonWrap clearfix">
              <Link to="/results" className="buttonStyle">
                Search Movies
              </Link>
              <a href="0" className='buttonStyle' onClick={this.showModal}>
                Create new list
              </a>
            </div>
          </div>
          <p className="instructions">
            Welcome to the movie lists page! Select an existing list below to
            view movies. Help the Quick Flicks community by adding movies to an
            existing list, or creating your own list to add all of your favorite
            flicks.{" "}
          </p>
          {this.state.show && <Modal handleClose={this.hideModal} />}
          <h3>Existing Lists:</h3>
          <ul>
            {this.state.lists.map((listName, i) => {
              return (
                <li key={i} className="listNames clearfix">
                  <Link className="buttonStyle" to={`/lists/${listName}`}>
                    {/* adding space back to list names displayed on list page */}
                    {listName.replace(/-/g, " ")}
                  </Link>

                  <FontAwesomeIcon
                    className="removeList child"
                    icon="times-circle"
                    onClick={() => {
                      this.removeList(listName);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ListPage;
