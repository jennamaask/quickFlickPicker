import React, { Component } from "react";
import firebase from 'firebase.js'

class NatLangForm extends Component {
  constructor() {
    super();
    this.state={
        genre: '',
        time:''
    }
  }

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) =>{
    event.preventDefault();

    const dbRef=firebase.database().ref();
    

  }

  render() {
    return (
      <div>
        <p>just a p tag</p>
        <form>
          I feel like watching
          
          <select name="genre" value={this.state.genre}>
            <option value="all">any genre of movie</option>
            <option value="action">an action movie</option>
            <option value="adventure">an adventure movie</option>
            <option value="animation">an animated movie</option>
            <option value="comedy">a comedy</option>
            <option value="crime">a crime movie</option>
            <option value="documentary">a documentary</option>
            <option value="drama">a drama </option>
            <option value="family">a family movie</option>
            <option value="fantasy">a fantasy movie</option>
            <option value="history">a history movie</option>
            <option value="horror">a horror movie</option>
            <option value="music">a musical</option>
            <option value="mystery">a mystery movie</option>
            <option value="romance">a romance</option>
            <option value="scienceFiction">a science fiction movie</option>
            <option value="tvMovie">a TV movie</option>
            <option value="thriller">a thriller</option>
            <option value="war">a war movie</option>
            <option value="western">a western</option>
          </select>
          and I have
          <select name="time" value={this.state.time}>
            <option value="90">less than 1.5 hours</option>
            <option value="120">less than 2 hours</option>
            <option value="121">all of the time in the world</option>
          </select>
          <label className="visuallyHidden" htmlFor="filterList">
            Filter List
          </label>
          <input id="filterList" type="submit" value="Find me a movie" />
        </form>
      </div>
    );
  }
}

export default NatLangForm;
