import React, { Component } from "react";
import axios from "axios";
import YouTube from 'react-youtube';

const apiKey = "220ba76687a248fe4b74726d993ed22f";

class Results extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      description: "",
      directors: '',
      cast: '',
      genres: '',
      trailer: ""
    };
  }

  // async fetchMovies(){
  //     const movieData = await axios(`https://api.themoviedb.org/3/search/movie)

  //     }`
  componentDidMount() {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/trending/movie/week",
      responseType: "json",
      params: {
        api_key: apiKey
      }
    }).then(response => {
      this.setState({
        movies: response.data.results
      });
    });
  }

  movieInfoClick = movieId => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
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

      // These are the retunred info:

      const description = response.data.overview;
      const genreArray = genre
        .map(name => {
          return name.name;
        }).join(", ");
      const director = crew
        .filter(member => {
          return member.job === "Director";
        })
        .map(name => {
          return name.name;
        }).join(', ')
      const topBilled = [];
      for (let i = 0; i < 5; i++) {
        topBilled.push(cast[i].name);
      }
      this.setState({
        description: description,
        directors: director,
        cast: topBilled.join(", "),
        genres: genreArray,
        trailer: video
      });
    });
  };

  render() {
    return (
      <header>
        <h1>here</h1>
        <ul>
          {this.state.movies.map((movie, i) => {
            let url = `http://image.tmdb.org/t/p/w185//${movie.poster_path}`;
            return (
              <li key={i}>
                <p>{movie.title}</p>
                <img src={url} alt="" />
                <button
                  onClick={() => {
                    this.movieInfoClick(movie.id);
                  }}
                >
                  More info
                </button>
                <div className="moreInfo">
                <p>{this.description}</p>
                <p>{this.cast}</p>
                <p>{this.directors}</p>
                <p>{this.genreArray}</p>
                 <YouTube
        videoId={this.video}
        // opts={opts}
        // onReady={this._onReady}
      />
                </div>
              </li>
            );
          })}
        </ul>
      </header>
    );
  }
}

export default Results;
