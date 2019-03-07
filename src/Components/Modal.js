import React, { Component } from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase';

library.add(faTimesCircle)

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        movies:["speed", "babe"]
    }
  }
  handleChange = (event) => {
    this.setState({
        name: event.target.value
    })
  }
  handleSubmit = event => {
      event.preventDefault()

      if (this.state.name === '') return
      const dbRef = firebase.database().ref();

      dbRef.push(this.state);
      this.setState({
          name: ''
      })

  }

  render() {
    return (
        <div>
            <FontAwesomeIcon icon="times-circle" onClick={this.props.handleClose}/>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="text">Enter List Name</label>
            <input onChange={this.handleChange} value={this.state.name} type="text" id="text" name="name" />
            <label htmlFor="submit">Create List</label>
            <input type="submit" id="submit" value="Create list" />
          </form>
        </div>
    );
  }
}

export default Modal;
