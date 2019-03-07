import React, { Component } from 'react';
import firebase from 'firebase';
import { Link} from 'react-router-dom';
import axios from "axios";
import { faDivide } from '@fortawesome/free-solid-svg-icons';


const apiKey = "220ba76687a248fe4b74726d993ed22f";

class SpecificList extends Component {
    constructor() {
        super();
        this.state = {
            listMovies:[],
        }
    }

    componentDidMount(){
        const dbRef = firebase.database().ref()
        dbRef.on("value", res => {
            const response = res.val() 
            for(let object in response){
                if (this.props.match.params.listName === response[object].name ){
                    this.setState({
                        listMovies: response[object].movies
                    })
                }
            }
        })
    }

    // componentDidUpdate() {
    //     const movieIdArray = this.state.listMovies.map(movieId => {
    //         axios({
    //             method: "get",
    //             url: `https://api.themoviedb.org/3/movie/${movieId}`,
    //             responseType: "json",
    //             params: {
    //                 api_key: apiKey,
    //                 language: "en-US",
    //                 adult: false,
    //             }
    //         }).then(response => {
    //             console.log(response);
    //         });
    //     })
    // }


    render() {
        return(
            <div>

                <h2>{this.props.match.params.listName}</h2>
                {this.state.listMovies.map(movieId => {
                    return (
                        <p>{movieId}</p>
                    )
                })}
            </div>
        )
    }
}

export default SpecificList