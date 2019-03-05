import React, { Component } from "react";
import axios from "axios";
import MoreInfo from "./MoreInfo.js";

const apiKey = "220ba76687a248fe4b74726d993ed22f";

class Results extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      description: "",
      directors: "",
      cast: "",
      genres: "",
      trailer: "",
      isHidden: true,
      
    };
  }

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

  movieInfoClick = (movieId, i) => {    
    console.log(i)

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
      this.setState({
        description: description,
        directors: director,
        cast: topBilled.join(", "),
        genres: genreArray,
        trailer: video,
        isHidden: false,
        activeMovie: i
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
                    this.movieInfoClick(movie.id, i);
                    console.log(this);
                  }}
                >
                  More info
                </button>

                {(!this.state.isHidden && this.state.activeMovie === i) &&  (
                  <MoreInfo
                    id={i}
                    description={this.state.description}
                    cast={this.state.cast}
                    directors={this.state.directors}
                    genres={this.state.genres}
                    trailer={this.state.trailer}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </header>
    );
  }
}

export default Results;
