import React, { Component } from "react";
import {Link} from 'react-router-dom';
import "../styles/header.css";


class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Quick Flick Picker</h1>
          <p>Search for movie</p>
          <p>Add movies to lists</p>
          <p>Answer some questions</p>
          <p>We'll pick your flick quick</p>
          <Link to="/results">Pick that Flick!</Link>
        </header>
      </div>
    );
  }
}

export default Header;
