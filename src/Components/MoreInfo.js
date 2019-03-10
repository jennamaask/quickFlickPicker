import React, { Component } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import ChoiceModal from "./ChoiceModal.js";

library.add(faChevronCircleLeft, faPlusCircle);

const apiKey = "220ba76687a248fe4b74726d993ed22f";

class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      //setting initial states
      movie: {},
      description: "",
      directors: "",
      cast: "",
      genres: "",
      trailer: "",
      show: false,
      posterPath: ""
    };
  }
  //functions to show / hide modals
  showModal = () => {
    this.setState({
      show: true
    });
  };
  hideModal = () => {
    this.setState({
      show: false,
    })
  }
  //go back to previous page
  goBack() {
    this.props.history.goBack();
  }
  

  //make call to API for specific film details of movie that the user selected
  // this.props.match.params.movieId -> when we click on the image, the movie Id goes into the URL and this grabs it from the URL and uses it for the axios call.
  componentDidMount = () => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${
        this.props.match.params.movieId
      }`,
      responseType: "json",
      params: {
        api_key: apiKey,
        append_to_response: "videos,credits"
      }
    }).then(response => {
      const crew = response.data.credits.crew;
      const cast = response.data.credits.cast;
      const video = response.data.videos.results[0].key;
      const genre = response.data.genres;

      // These are the returned info:
      const description = response.data.overview;
      const genreString = genre
        .map(name => {
          return name.name;
        })
        .join(", ");
      const director = crew
        .filter(member => {
          return member.job === "Director";
        })
        .map(name => {
          return name.name;
        })
        .join(", ");
      const topBilled = [];
      for (let i = 0; i < 5; i++) {
        topBilled.push(cast[i].name);
      }
      //setting state to be returned values
      this.setState({
        movie: response.data,
        description: description,
        directors: director,
        cast: topBilled.join(", "),
        genres: genreString,
        trailer: video
      });
    });
  };
  // using state to create a div with more info (title, tagline, trailer, overview, cast, directors, genres) about the selected film
  render() {
    return (
      <div className="moreInfo">
        <div>
          <FontAwesomeIcon onClick={this.goBack} icon="chevron-circle-left" />
          <FontAwesomeIcon onClick={this.showModal} icon="plus-circle" />
          {this.state.show && (
            <ChoiceModal
              title={this.state.movie.title}
              poster={this.state.movie.poster_path}
              duration={this.state.movie.runtime}
              genre={this.state.genres}
              movieId={this.props.match.params.movieId}
              handleClose={this.hideModal}
            />
          )}


          <h2>{this.state.movie.title}</h2>
          <h3>{this.state.movie.tagline}</h3>
        </div>
        <YouTube
          videoId={this.state.trailer}
          // these are the options for the video opts={opts} onReady={this._onReady}
        />
        <div>
          <p>
            <span>Description:</span>
            {this.state.movie.overview}
          </p>
          <p>
            <span>Cast:</span>
            {this.state.cast}
          </p>
          <p>
            <span>Directors:</span>
            {this.state.directors}
          </p>
          <p>
            <span>Genres:</span>
            {this.state.genres}
          </p>
        </div>
      </div>
    );
  }
}

export default MoreInfo;
