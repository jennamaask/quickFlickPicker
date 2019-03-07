import React, {Component} from 'react'

class Modal extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <form>
            <label htmlFor="text">
            Enter List Name
            <input type="text" id="text"/>
            </label>
            <label htmlFor="submit">
            <input type="submit" id="submit" />
            </label>
            </form>
        )
    }
}

export default Modal