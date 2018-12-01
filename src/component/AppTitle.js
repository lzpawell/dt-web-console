import React, { Component } from 'react';
import 'antd/dist/antd.css';

class AppTitle extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <h3 style={{color:"red", display : "inline", fontSize : this.props.fontSize}}>dt-web-console</h3>
        );
    }
}

AppTitle.defaultProps={
    fontSize : '30'
};

export default AppTitle;