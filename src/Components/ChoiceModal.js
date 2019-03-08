import React, { Component } from "react";
import firebase from "../firebase.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faDivide } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle)


class ChoiceModal extends Component {
    constructor(props){
        super(props)
        //setting initial state
        this.state = {
            lists : []
        }
    }

// connecting to firebase, getting user's list names, creating a temporary array to hold the names, and setting state to the new temporary array
    componentDidMount(){
        const dbRef = firebase.database().ref()
        dbRef.on("value", res => {
            const response = res.val();
            let tempArray=[]
            for(let object in response){
                tempArray.push(response[object].name)
            }
            this.setState ({
                lists: tempArray
            })
        })
    }

//print user's lists to screen
//icon to close modal
//calling this.props.handleClose from the MoreInfo page
    render(){
        return(
            <div>
                <h1>I am a mojal</h1>
                {this.state.lists.map(list => {
                    return(
                        <p>{list}</p>
                    )
                })}
                <FontAwesomeIcon icon="times-circle" onClick={this.props.handleClose} />
            </div>
        )
    }
}

export default ChoiceModal