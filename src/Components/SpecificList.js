import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import NatLangForm from "./NatLangForm.js";
import "../styles/specificList.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

library.add(faBars, faTimesCircle);

class SpecificList extends Component {
  constructor() {
    super();
    //setting state
    this.state = {
      listMovies: [],
      title: "",
      showMenu: false
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

  openMenu = () => {
    this.setState ({
      showMenu: true
    })
  }

  closeMenu = () => {
    this.setState ({
      showMenu: false
    })
  }

  render() {
    return (
      <div className="specificList">
        <div className="wrapper clearfix">
          <h2>{this.state.title}</h2>
          <nav className="bigNav">
            <Link to="/results">Search Movies</Link>
            <Link to="/lists">Lists</Link>
          </nav>
          <FontAwesomeIcon onClick={this.openMenu} icon="bars" size="lg" />
          {this.state.showMenu &&(
            <nav className="dropDown">
              <FontAwesomeIcon onClick={this.closeMenu} icon="times-circle" />
              <Link to="/results">Search More Movies</Link>
              <Link to="/lists">Go back to Lists</Link>
            </nav>
          )}
          </div>
          {/* conditional redner - return message if user selects a list where no movies have been added */}
          {this.state.listMovies.length === 0 ? (
            <div className="wrapper"> 
              <p className="empty">Looks like nobody has added any movies to this list yet!</p>
            </div>
          ) : (
            <div className="movieList clearfix">
            <div className="wrapper">
              <NatLangForm movieInfo={this.state.listMovies} />
            </div>
              {this.state.listMovies.map(movieId => {
                return (
                  <div className="poster">
                    <img
                      src={movieId.poster}
                      alt={`Poster of ${movieId.name}`}
                    />
                    <div className="overlay">
                      <Link to={`/movies/${movieId.id}`}>More Info</Link>
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
              <div className="wrapper">
              </div>
            </div>
          )}
      
      </div>
    );
  }
}

export default SpecificList;
