import React, { Component } from 'react';
import './App.css';
// import Header from './Components/Header.js'
import Results from './Components/Results.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Results />
        {/* 
        <Header />  
        <Modal />
          <ListPage />
        <Footer /> */}
      </div>
    );
  }
}

export default App;
