import React, { Component } from 'react';
import firebase from '../firebase.js';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


class ListPage extends Component {
    constructor(){
        super()
        
        this.state = {
            lists: [],
            listsName: ''
        }
    }
    
    componentDidMount(){
        const dbRef = firebase.database().ref();
        dbRef.on("value", res => {
            // console.log(res.val());
            let response = res.val()
            let tempArray = []
            for(let list in response) {
                tempArray.push(list)
            }
            this.setState({
                lists: tempArray
            })
        })
        
    }

    render(){
        return(
           <div>
           <h2>Movie Lists</h2>
           <ul>
           {this.state.lists.map((listName, i) => {
               return (<li key={i}>
               <p>{listName}</p>
               </li>)
           })}
           </ul>
           
           </div>
            
        )
    }
}

export default ListPage