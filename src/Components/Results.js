import React, { Component } from 'react';
import axios from 'axios';
import FilterBar from './FilterBar.js';
import { Link } from 'react-router-dom';
import Modal from './Modal.js';
import Footer from './Footer.js';
import '../styles/results.css';
import ReactDOM from 'react-dom';

const apiKey = '220ba76687a248fe4b74726d993ed22f';

class Results extends Component {
  constructor(props) {
    super(props);
    this.testRef = React.createRef();
    this.state = {
      //setting initial state
      movies: [],
      show: false,
      imageSize: 0
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

  updateImageSize = () => {
    let imageSize = '342';
    if (window.innerWidth > 1600) {
      imageSize = '780';
    } else if (window.innerWidth > 1000) {
      imageSize = '500';
    }

    this.setState({
      imageSize: imageSize
    });
  };
  // call to API to start with trending movies on page load
  // if the props is empty, that means the user has not searched anything yet, if they haven't searched anything yet, the trending movies will populate the screen.
  //else, if the props is the user's search input, axios will pull up their search results
  componentDidMount() {
    this.updateImageSize();
    this.equalHeightColumns();
    window.addEventListener('resize', this.updateImageSize.bind(this));

    if (this.props.userSearchResult === '') {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/trending/movie/week',
        responseType: 'json',
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
      method: 'get',
      url: 'https://api.themoviedb.org/3/search/movie',
      responseType: 'json',
      params: {
        api_key: apiKey,
        language: 'en-US',
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
    setTimeout(() => {
      // Grab all elements with the class of result
      const findImages = ReactDOM.findDOMNode(this).getElementsByClassName(
        'result'
      );
      let tallest = 0;

      // Iterate through the findImages array
      for (let i = 0; i < findImages.length; i++) {
        const image = findImages[i];
        const imageHeight = image.offsetHeight;

        // If the current images height is greater than the prior image height update tallest to the current height. If not keep the current height
        tallest = imageHeight > tallest ? imageHeight : tallest;
      }

      // Iterate through the array again and set each element to the height of the tallest
      for (let i = 0; i < findImages.length; i++) {
        findImages[i].style.height = tallest + 'px';
        
      }
    }, 1000);
  };

  //mapping through movies and returning poster & title
  // taking onFilterSubmit function from Header, passing it down to be used in FilterBar
  render() {
    return (
      <div>
        <div id='results' className='results'>
          <div className='wrapper'>
            <div className='clearfix'>
              <h1>Quick Flick Picker</h1>
              <Link to='/lists' className='buttonStyle'>
                Go to Lists
              </Link>
            </div>
            <FilterBar onFilterSubmit={this.props.onFilterSubmit} />
            {this.state.show && <Modal handleClose={this.hideModal} />}
          </div>
          {/* conditional render, if user types an input that does not generate a result, give them a no results message on the page */}
          {this.state.movies.length === 0 ? (
            <p>Your search came back with no results</p>
          ) : (
            <div className='resultsContainer clearfix'>
              {this.state.movies.map(movie => {
                let url = `http://image.tmdb.org/t/p/w${
                  this.state.imageSize
                }//${movie.poster_path}`;
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
        <Footer />
      </div>
    );
  }
}

export default Results;
