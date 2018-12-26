import React, { Component } from 'react';
import JobList from './JobList';
import 'antd/dist/antd.css';

class JobManagement extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        job management 
        <div style={{height : 50, background : 'green'}}>
          这里是
        </div>
      </div>
    );
  }
}

export default JobManagement;