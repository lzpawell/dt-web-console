import React, { Component,Form, Input, Button, } from 'react';
import DependencyTree from './DependencyTree';
import 'antd/dist/antd.css';

class JobDependencyManagement extends Component {

  state = {
    dependencyTreeData : {
      nodes: [{
        id: 'node1',
        label : {
          text: 'balala',
          textAlign: 'right'
        },
        shape: 'treeNode',
        size: 10,
      },{
        id: 'node2',
        label : {
          text: 'subNode',
          textAlign: 'left'
        },
        size : 10,
      }],
      edges: [{
        id: 'edge1',
        target: 'node2',
        source: 'node1'
      }]
    }
  }

  componentDidMount(){

  }


  render() {

//    const {
//      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
//    } = this.props.form;

    console.log(this.props.form)

    return (
      <div>
        <div>
        </div>
        <DependencyTree dependencyTreeData={this.state.dependencyTreeData}/>
      </div>
    );
  }
}

export default JobDependencyManagement;