import React, {Component } from 'react';
import FilterBar from './FilterBar.js'

class Header extends Component {
    constructor(props) {
        super(props)

       
    }

    render(){
        return(
            // taking onFilterSubmit function from Header, passing it down to be used in FilterBar
            <FilterBar
                onFilterSubmit={this.props.onFilterSubmit}
            />
        )
        
    }
}


export default Header
