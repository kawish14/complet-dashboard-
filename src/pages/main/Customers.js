import React from 'react'
import { loadModules } from 'esri-loader';

export default class Customers extends React.Component{
    constructor(props){
        super(props);
        this.button = React.createRef()
    }
    componentDidMount(){
       let view = this.props.view
       view.ui.add("top-left", this.button)
    }
    render(){
        return(
            <div>
                <button ref={this.button}>kawish</button>
            </div>
        )
    }

}