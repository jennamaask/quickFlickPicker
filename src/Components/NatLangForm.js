import React, { Component } from "react";
import Swal from 'sweetalert2-react';

class NatLangForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: "",
      time: ""
    };
  }
  //LEFT OFF HERE
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  //LEFT OFF HERE
  handleSubmit = event => {
    const genreFinder = new RegExp(this.state.genre, "i");
    event.preventDefault();
    const filteredMovies = this.props.movieInfo.filter(movie => {
      return (
        movie.duration <= this.state.time && movie.genre.match(genreFinder)
      );
    });
    console.log(filteredMovies);
    //if filtered movies is empty, give user an error message
    if (filteredMovies.length===0) {
      alert("Your search returned no results, try again.")
    };
  };

  render() {
    return (
      <div>
        <p>just a p tag</p>
        <form onSubmit={this.handleSubmit}>
          I feel like watching
          <select
            name="genre"
            value={this.state.genre}
            onChange={this.handleChange}
          >
            <option value="all">any genre of movie</option>
            <option value="action">an action movie</option>
            <option value="adventure">an adventure movie</option>
            <option value="animation">an animated movie</option>
            <option value="comedy">a comedy</option>
            <option value="crime">a crime movie</option>
            <option value="documentary">a documentary</option>
            <option value="drama">a drama </option>
            <option value="family">a family movie</option>
            <option value="fantasy">a fantasy movie</option>
            <option value="history">a history movie</option>
            <option value="horror">a horror movie</option>
            <option value="music">a musical</option>
            <option value="mystery">a mystery movie</option>
            <option value="romance">a romance</option>
            <option value="scienceFiction">a science fiction movie</option>
            <option value="tvMovie">a TV movie</option>
            <option value="thriller">a thriller</option>
            <option value="war">a war movie</option>
            <option value="western">a western</option>
          </select>
          and I have
          <select
            name="time"
            value={this.state.time}
            onChange={this.handleChange}
          >
            <option value="90">less than 1.5 hours</option>
            <option value="120">less than 2 hours</option>
            <option value="121">all of the time in the world</option>
          </select>
          <label className="visuallyHidden" htmlFor="filterList">
            Filter List
          </label>
          <input id="filterList" type="submit" value="Find me a movie" />
        </form>

        
      </div>
    );
  }
}

export default NatLangForm;
