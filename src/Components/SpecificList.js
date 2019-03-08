import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import axios from "axios";
import { faDivide } from "@fortawesome/free-solid-svg-icons";

const apiKey = "220ba76687a248fe4b74726d993ed22f";

class SpecificList extends Component {
  constructor() {
    super();
    //setting state
    this.state = {
      listMovies: ["speed"]
    };
  }

  componentDidMount() {
    let tempArray = [];
    const dbRef = firebase.database().ref();
    dbRef.on("value", res => {
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
        listMovies: tempArray
      });
    });
  }

  render() {
    return (
      <div>
        <h2>{this.props.match.params.listName}</h2>
        <Link to='/'>Search More Movies</Link>
        <Link to='/lists'>Go back to Lists</Link>
        {this.state.listMovies.map(movieId => {
          return (
            <img src={movieId.poster} alt={`Poster of ${movieId.name}`} />
          );
        })}

      </div>
    );
  }
}

export default SpecificList;
