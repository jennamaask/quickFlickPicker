import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Results from './Components/Results.js';
import MoreInfo from './Components/MoreInfo.js';
import ListPage from './Components/ListPage.js';
import SpecificList from './Components/SpecificList';
import Header from './Components/Header.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: ''
    };
  }
  //Function sets users search input as the state in the app
  onFilterSubmit = searchQuery => {
    this.setState({
      searchResults: searchQuery
    });
  };

  //sending down onFilterSubmit Function to be used in other Components (FilterBar)
  //Routed results to the home page and passed down props which was the user's search result
  //Routed MoreInfo to a new page using movieId as a url param.
  render() {
    return (
      <Router>
        <div className='App'>
          <Route path='/' exact component={Header} />
          <Route
            path='/results'
            exact
            render={() => {
              return (
                <Results
                  userSearchResult={this.state.searchResults}
                  onFilterSubmit={this.onFilterSubmit}
                />
              );
            }}
          />
          <Route path='/movies/:movieId' component={MoreInfo} />
          <Route path='/lists' exact component={ListPage} />
          <Route path='/lists/:listName' component={SpecificList} />
        </div>
      </Router>
    );
  }
}

export default App;
