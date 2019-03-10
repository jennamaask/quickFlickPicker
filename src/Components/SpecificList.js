import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import NatLangForm from "./NatLangForm.js";

class SpecificList extends Component {
  constructor() {
    super();
    //setting state
    this.state = {
      listMovies: [],
      title: ""
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", res => {
      let tempArray = [];
      const response = res.val();
      //find which object in our database matches the name of the list we have clicked on
      for (let object in response) {
        if (this.props.match.params.listName === response[object].name) {
          for (let movie in response[object].movies) {
            tempArray.push(response[object].movies[movie]);
          }
        }
      }
      this.setState({
        listMovies: tempArray,
        title: this.props.match.params.listName.replace(/-/g, ' ')
      });
    });
  }
  //remove movie from list 
  removeMovie = movieId => {
    const dbRef = firebase.database().ref();
    let matchedObject = "";
    dbRef.on("value", res => {
      let response = res.val();
      //going through each object in database response, checking to see if list names match, once we get to the list name that is the same as the list name we clicked on, we go into the object to determine if it has a movie array already.
      for (let object in response) {
        if (response[object].name === this.props.match.params.listName) {
          matchedObject = object;
        }
      }
    });
    const listRef = dbRef.child(matchedObject);
    listRef
      .child("movies")
      .child(movieId)
      .remove();
  };

  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <Link to="/">Search More Movies</Link>
        <Link to="/lists">Go back to Lists</Link>
        {/* conditional redner - return message if user selects a list where no movies have been added */}
        {this.state.listMovies.length === 0 ? (
          <p>Looks like nobody has added any movies to this list yet!</p>
        ) : (
          <div>
            {this.state.listMovies.map(movieId => {
              return (

                <div>
                  <Link to={`/movies/${this.state.movieId}`}>
                  <img
                    src={movieId.poster}
                    alt={`Poster of ${movieId.name}`}
                  />
                </Link>
                  <div className="overlay">
                    <button
                      className="removeButton"
                      onClick={() => {
                        this.removeMovie(movieId.id);
                      }}
                    >
                      Remove movie from list
                    </button>
                  </div>
                </div>
              );
            })}
            <NatLangForm movieInfo={this.state.listMovies} />
          </div>

        )}
      </div>
    );
  }
}

export default SpecificList;
