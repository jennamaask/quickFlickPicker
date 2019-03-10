import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);


library.add(faTimesCircle);

class Modal extends Component {
  constructor(props) {
    super(props);
    //setting initial state
    this.state = {
      name: "",
      movies: [],
      show: false,
    };
  }
  confirmAlert = () => {
    MySwal.fire({
      title: <p>Hello World</p>,
      footer: "Copyright 2018",
      onOpen: () => {
        // `MySwal` is a subclass of `Swal`
        //   with all the same instance & static methods
        MySwal.clickConfirm();
      }
    }).then(() => {
      return MySwal.fire({
        position: 'top-end',
        type: 'success',
        title: 'List created',
        showConfirmButton: false,
        timer: 1500});
    });
  
  }
  //creating event to set state of name to the value the user enters.
  handleChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    
    this.setState({
      //removing spaces from listnames to use in URL
      name: this.state.name.replace(/\s+/g, '-').toLowerCase()
    })
    //conditional, if name is not an empty string, grab data from firebase
    if (this.state.name !== "") {
      const dbRef = firebase.database().ref();
      dbRef.once("value").then(res => {
        const response = res.val();
        let duplicate = false;
        for (let object in response) {
          if (
            this.state.name.toLocaleLowerCase() ===
            response[object].name.toLocaleLowerCase()
          ) {
            duplicate = true;
            alert(`There's already a list named that dum dum`);
          }
        }
        if (duplicate === false) {
          dbRef.push(this.state);
        }
        this.setState({
          name: "",
        });
        this.confirmAlert()
      });
    }
  };

  //close modal on click, calling props to pass handle close
  //user enters list name on change call handle change
  render() {
    return (
      <div>
        <FontAwesomeIcon icon="times-circle" onClick={this.props.handleClose} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="text">Enter List Name</label>
          <input
            onChange={this.handleChange}
            value={this.state.name}
            type="text"
            id="text"
            name="name"
          />
          <label htmlFor="submit">Create List</label>
          <input type="submit" id="submit" value="Create list" />
        </form>
      </div>
    );
  }
}

export default Modal;
