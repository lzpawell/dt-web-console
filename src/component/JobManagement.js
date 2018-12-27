import React, { Component } from 'react';
import JobList from './JobList';
import 'antd/dist/antd.css';

class JobManagement extends Component {
  render() {
    console.log(this.props);
    return (
      <div style={{marginLeft : 10, marginRight : 10}}>
        <JobList />
      </div>
    );
  }
}

export default JobManagement;