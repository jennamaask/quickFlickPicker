import React, { Component } from "react";
import axios from "axios";
import { link } from "fs";

const apiKey = "220ba76687a248fe4b74726d993ed22f";

class Results extends Component {
  constructor() {
    super();
    this.state = {
        movies:[]
    }
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
    })
  }

  movieInfoClick=(movieId)=> {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      responseType: "json",
      params: {
        api_key: apiKey,
        append_to_response: "videos,credits"
      }
    }).then(response => {
        console.log("hiiiii")
        console.log(response)
    });
  }




  render() {
    return (
        <header>
            <h1>here</h1>
            <ul>
            {
                this.state.movies.map((movie, i) => {
                    let url = `http://image.tmdb.org/t/p/w185//${movie.poster_path}`
                    return (
                      <li key={i}>
                        <p>{movie.title}</p>
                        <img
                        src={url}
                        alt=""
                        />
                        <button onClick={()=>{this.movieInfoClick(movie.id)}}>More info</button>
                      </li>
                    );
                })
            }
            </ul>
        </header>
    )
  }
}

export default Results;
