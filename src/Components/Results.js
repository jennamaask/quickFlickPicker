import React, { Component } from "react";
import axios from "axios";
import MoreInfo from "./MoreInfo.js";
import {Link} from 'react-router-dom';

const apiKey = "220ba76687a248fe4b74726d993ed22f";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //setting initial state
      movies: [],
      description: "",
      directors: "",
      cast: "",
      genres: "",
      trailer: "",
    };
  }
  //call to API to start with trending movies on page load
  componentDidMount() {
    if (this.props.userSearchResult === "") {
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
    } else {
        this.searchQueryCall(this.props.userSearchResult)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userSearchResult !== this.props.userSearchResult){
        this.setState({movies:[]})
    this.searchQueryCall(this.props.userSearchResult)
  }
}

    searchQueryCall = (searchQuery) => {
        console.log('before axios')
        axios({
            method: "get",
            url: "https://api.themoviedb.org/3/search/movie",
            responseType: "json",
            params: {
                api_key: apiKey,
                language: "en-US",
                adult: false,
                query: searchQuery
            }
        }).then(response => {
            console.log('test',response);
            this.setState({
                movies: response.data.results
            });
        });
    }


  render() {
    return (
      <header>
        <h1>Quick Flick Picker</h1>
          {/* mapping through movies and returning poster & title */}
          {this.state.movies.map((movie) => {
            let url = `http://image.tmdb.org/t/p/w185//${movie.poster_path}`;
            return (
              <div key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                    <img src={url} alt={`Poster of ${movie.title}`} />
                </Link>
                
              </div>
            );
          })}
      </header>
    );
  }
}

export default Results;
