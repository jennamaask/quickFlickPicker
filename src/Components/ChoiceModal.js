import React, { Component } from "react";
import firebase from "../firebase.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faDivide } from "@fortawesome/free-solid-svg-icons";

library.add(faTimesCircle);

class ChoiceModal extends Component {
  constructor(props) {
    super(props);
    //setting initial state
    this.state = {
      lists: []
    };
  }

  // connecting to firebase, getting user's list names, creating a temporary array to hold the names, and setting state to the new temporary array
  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", res => {
      const response = res.val();
      let tempArray = [];
      for (let object in response) {
        tempArray.push(response[object].name);
      }
      this.setState({
        lists: tempArray
      });
    });
  }

  chosenList = listName => {
    const dbRef = firebase.database().ref();
    let matchedObject = "";
    let tempObject = {};
    let response;

    tempObject = {
      id: this.props.id,
      name: this.props.title,
      poster: `http://image.tmdb.org/t/p/w185//${this.props.poster}`,
      duration: this.props.duration,
      genre: this.props.genre
    };

    dbRef.on("value", res => {
      response = res.val();
      //going through each object in database response, checking to see if list names match, once we get to the list name that is the same as the list name we clicked on, we go into the object to determine if it has a movie array already.
      for (let object in response) {
        if (response[object].name === listName) {
          matchedObject = object;
        }
      }
    });
    const listRef = dbRef.child(matchedObject);

    // if (response[matchedObject].movies === undefined) {
    listRef
      .child("movies")
      .child(this.props.movieId)
      .set(tempObject);
    //ERROR HANDLING - Add an if statment so the user can't add the same move to their list multiple times - will involve our favourite array method map.
  };

  //print user's lists to screen
  //icon to close modal
  //calling this.props.handleClose from the MoreInfo page
  render() {
    return (
      <div>
        <h1>I am a mojal</h1>
        {this.state.lists.map(list => {
          return (
            <p
              onClick={() => {
                this.chosenList(list);
              }}
            >
              {list}
            </p>
          );
        })}
        <FontAwesomeIcon icon="times-circle" onClick={this.props.handleClose} />
      </div>
    );
  }
}

export default ChoiceModal;
