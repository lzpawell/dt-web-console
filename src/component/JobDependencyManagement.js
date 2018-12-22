import React, { Component, Form, Input, Button, } from 'react';
import {Modal} from 'antd';
import DependencyTree from './DependencyTree';
import DependencyOptionForm from './DependencyOperation';
import 'antd/dist/antd.css';

/*
dependencyTreeData: {
      "name": "Modeling Methods",
      "children": array
    }
*/
class JobDependencyManagement extends Component {

  state = {
    
  }

  componentDidMount() {

  }

  onGetDependencyTreeData = (dependencyTreeData)=>{
    console.log('balalallalalal' + dependencyTreeData);
    if(dependencyTreeData == undefined){
      this.setState({'dependencyTreeData' : []});
    }else{
      this.setState({'dependencyTreeData' : [dependencyTreeData]});
    }
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <div style={{paddingLeft : '40px', paddingTop : '20px'}}>
          <DependencyOptionForm onGetDependencyTreeData={this.onGetDependencyTreeData}/>
        </div>
        
        <div style={{height:'10%'}}></div>

        <div style={{height:'75%'}}>
          <DependencyTree dependencyTreeData={this.state.dependencyTreeData} />
        </div>
      </div>
    );
  }
}

export default JobDependencyManagement;