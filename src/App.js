import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header.js'
import Results from './Components/Results.js'
import MoreInfo from './Components/MoreInfo.js'
import axios from 'axios'

const apiKey = "220ba76687a248fe4b74726d993ed22f";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: ''
    }
  }
  //Function sets users search input as the state in the app
  onFilterSubmit = (searchQuery) => {
    this.setState({
      searchResults: searchQuery
    })
  }

  // searchQueryCall =(searchQuery) => {
  //   axios({
  //     method: "get",
  //     url: "https://api.themoviedb.org/3/search/movie",
  //     responseType: "json",
  //     params: {
  //       api_key: apiKey,
  //       language: "en-US",
  //       adult: false,
  //       query: searchQuery
  //     }
  //   }).then(response => {
  //     console.log(response);
  //     this.setState({
  //       searchResults: response.data.results
  //     });
  //   });
  // }
 
 
  render() {
    return (
      <Router>
        <div className="App">
          {/* sending down onFilterSubmit Function to be used in other Components (FilterBar) */}
          <Header 
            onFilterSubmit={this.onFilterSubmit}  
          />

          <Route path="/" exact render={() => {return(<Results userSearchResult={this.state.searchResults}/>)}}/>
          <Route path="/movies/:movieId" component={MoreInfo} />

          {/* 
            <Modal />
            <ListPage />
            <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
