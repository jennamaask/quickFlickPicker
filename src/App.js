import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header.js'
import Results from './Components/Results.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: null,
    }
  }
  //Function sets users search input as the state in the app
  onFilterSubmit = (searchQuery) => {
    console.log(searchQuery)
    this.setState({
      searchQuery: searchQuery
    })
  }
 
 
  render() {
    return (
      <div className="App">
        {/* sending down onFilterSubmit Function to be used in other Components (FilterBar) */}
        <Header 
          onFilterSubmit={this.onFilterSubmit}  
        />

        <Results />

        {/* 
          <Modal />
          <ListPage />
          <Footer /> */}
      </div>
    );
  }
}

export default App;
