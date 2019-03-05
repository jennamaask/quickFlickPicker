import React, { Component } from 'react';
import YouTube from 'react-youtube';


class MoreInfo extends Component {
    constructor(props){
        super(props);
    }
    
    render (){
        return(
            <li className="moreInfo">
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
                // opts={opts}
                // onReady={this._onReady}
                />
            </li>
        )
    }
};

export default MoreInfo


