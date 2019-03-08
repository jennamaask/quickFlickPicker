import React, { Component } from 'react';

class NatLangForm extends Component {
    constructor() {
        super()
    }

    render(){
        return (
            <p>just a p tag</p>
            <form>
            I feel like watching  
            <select>
            <option value="all">any genre of </option>
            <option value="action">an action</option>
            <option value="adventure">an adventure</option>
            <option value="animation">an animated</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="documentary">Documentary</option>
            <option value="drama">Drama</option>
            <option value="family">Family</option>
            <option value="fantasy">Fantasy</option>
            <option value="history">History</option>
            <option value="horror">Horror</option>
            <option value="music">Music</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="scienceFiction">Science Fiction</option>
            <option value="tvMovie">TV Movie</option>
            <option value="thriller">Thriller</option>
            <option value="war">War</option>
            <option value="western">Western</option>
            </select>
            </form>
        )
    }
}

export default NatLangForm 