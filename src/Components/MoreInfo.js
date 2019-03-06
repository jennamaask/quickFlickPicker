import React, { Component } from 'react';
import YouTube from 'react-youtube';


class MoreInfo extends Component {
    constructor(props){
        super(props);
    }
    // using props to create a div with more info about the selected film
    render (){
        return(
            <div className="moreInfo">
                <p>
                <span>Description:</span>
                {this.props.description}
                </p>
                <p>
                <span>Cast:</span>
                {this.props.cast}
                </p>
                <p>
                <span>Directors:</span>
                {this.props.directors}
                </p>
                <p>
                <span>Genres:</span>
                {this.props.genres}
                </p>
                <YouTube
                videoId={this.props.trailer}
                // these are the options for the video opts={opts} onReady={this._onReady}
                />
            </div>
        )
    }
};

export default MoreInfo


