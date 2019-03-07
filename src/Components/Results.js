import React, { Component } from "react";
import axios from "axios";
import FilterBar from './FilterBar.js'
import { Link } from "react-router-dom";
import Modal from './Modal.js';

const apiKey = "220ba76687a248fe4b74726d993ed22f";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //setting initial state
      movies: [],
      show: false,
    };
  }
  showModal = () => {
    this.setState({
      show: true,
    })
  }
  hideModal = () => {
    this.setState({
      show: false,
    })
  }
  // call to API to start with trending movies on page load
  // if the props is empty, that means the user has not searched anything yet, if they haven't searched anything yet, the trending movies will populate the screen.
  //else, if the props is the user's search input, axios will pull up their search results
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
      this.searchQueryCall(this.props.userSearchResult);
    }
  }

  //if previous search results (prevProps) is not the same as the current search, reset the state to an empty movies array, and then call the searchQuery function, to populate the movies array.
  componentDidUpdate(prevProps) {
    if (prevProps.userSearchResult !== this.props.userSearchResult) {
      this.setState({ movies: [] });
      this.searchQueryCall(this.props.userSearchResult);
    }
  }

  // user search result to do another API call and set state to those results.
  searchQueryCall = searchQuery => {
    console.log("before axios");
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
      console.log("test", response);
      this.setState({
        movies: response.data.results
      });
    });
  };

 //mapping through movies and returning poster & title
 // taking onFilterSubmit function from Header, passing it down to be used in FilterBar
  render() {
    return (
      <div>
        <FilterBar
          onFilterSubmit={this.props.onFilterSubmit}
        />
        <h1>Quick Flick Picker</h1>
        <button onClick={this.showModal}>Create new list</button>
        {this.state.show && (<Modal handleClose={this.hideModal} />)}
        {this.state.movies.map(movie => {
          let url = `http://image.tmdb.org/t/p/w185//${movie.poster_path}`;
          return (
            <div key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img src={url} alt={`Poster of ${movie.title}`} />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Results;
