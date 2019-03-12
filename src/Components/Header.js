import React, { Component } from "react";
import {Link} from 'react-router-dom';
import "../styles/header.css";


class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="wrapper">
            <h1>Quick Flick Picker</h1>
            <div className="text">
              <p>Search for movies.</p>
              <p>Sort them into lists.</p>
              <p>And we'll pick your flick, quick.</p>
              <Link to="/results">Pick that Flick!</Link>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
