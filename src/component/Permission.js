import React, { Component } from 'react';
import 'antd/dist/antd.css';

export default class AppPermission extends Component{
    render(){
        return this.state.appName == undefined ? 
            (<h3>请选择app</h3>) 
            : 
            (<div></div>);
    }


    componentDidMount(){

    }

    constructor(props){
        super(props);
        this.state = {appName : props.appName};
    }

    componentWillReceiveProps(newProps){
        if(newProps.appName != null){
            this.setState({appName : newProps.appName});
        }
    }
} 