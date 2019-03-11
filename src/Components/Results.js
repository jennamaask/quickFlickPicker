import React, { Component } from "react";
import axios from "axios";
import FilterBar from "./FilterBar.js";
import { Link } from "react-router-dom";
import Modal from "./Modal.js";
import "../styles/results.css";
import ReactDOM from "react-dom";

const apiKey = "220ba76687a248fe4b74726d993ed22f";

class Results extends Component {
  constructor(props) {
    super(props);
    this.testRef = React.createRef();
    this.state = {
      //setting initial state
      movies: [],
      show: false
    };
  }

  //show / hide modal
  showModal = () => {
    this.setState({
      show: true
    });
  };
  hideModal = () => {
    this.setState({
      show: false
    });
  };
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
        let tempArray = [];
        response.data.results.map(result => {
          if (result.poster_path) {
            tempArray.push(result);
          }
        });
        this.setState({
          movies: tempArray
        });
        
      });
    } else {
      this.searchQueryCall(this.props.userSearchResult);
    }
  }

  //if previous search results (prevProps) is not the same as the current search, reset the state to an empty movies array, and then call the searchQuery function, to populate the movies array.
  componentDidUpdate(prevProps) {
    if (prevProps.userSearchResult !== this.props.userSearchResult) {
      this.setState({ 
        movies: [] 
      });
      this.searchQueryCall(this.props.userSearchResult);
      this.equalHeightColumns();
    }
  }

  // user search result to do another API call and set state to those results.
  searchQueryCall = searchQuery => {
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
      let tempArray = [];
      response.data.results.map(result => {
        if (result.poster_path) {
          tempArray.push(result);
        }
      });
      this.setState({
        movies: tempArray
      });
    });
  };

  equalHeightColumns = () => {
    // Set timeout to wait 1 second before running so the DOM loads prior to ReactDom running
    // TODO: Find less hacky way to do this
    setTimeout(() => {
      // Grab all elements with the class of result
      const findImages = ReactDOM.findDOMNode(this).getElementsByClassName('result')
      let tallest = 0;
  
      // Iterate through the findImages array 
      for (let i = 0; i < findImages.length; i++) {
        const image = findImages[i];
        const imageHeight = image.offsetHeight
  
        // If the current images height is greater than the prior image height update tallest to the current height. If not keep the current height
        tallest = (imageHeight > tallest ? imageHeight : tallest)
      }
  
      // Iterate through the array again and set each element to the height of the tallest
      for (let i = 0; i < findImages.length; i++) {
        findImages[i].style.height = tallest + 'px';
        console.log(findImages[i])
        
      }
      
    }, 1000);
  }

  //mapping through movies and returning poster & title
  // taking onFilterSubmit function from Header, passing it down to be used in FilterBar
  render() {
    return (
      <div>

        <div id="results" className="results">
          <FilterBar onFilterSubmit={this.props.onFilterSubmit} />
          <h1>Quick Flick Picker</h1>
          <Link to="/lists">Go to Lists</Link>
          <button onClick={this.showModal}>Create new list</button>
          {this.state.show && <Modal handleClose={this.hideModal} />}

          {/* conditional render, if user types an input that does not generate a result, give them a no results message on the page */}
          {this.state.movies.length === 0 ? (
            <p>Your search came back with no results</p>
          ) : (
            <div className='resultsContainer wrapper clearfix'>
              {this.state.movies.map(movie => {
                let url = `http://image.tmdb.org/t/p/w342//${
                  movie.poster_path
                }`;
                return (
                  <div key={movie.id} className='result'>
                    <Link to={`/movies/${movie.id}`}>
                      <img src={url} alt={`Poster of ${movie.title}`} />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Results;
