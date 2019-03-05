import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Modal />
        <Header />
        <Results />
        <ListPage />
        <Footer />
      </div>
    );
  }
}

export default App;
