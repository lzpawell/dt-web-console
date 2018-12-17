import React, { Component, Form, Input, Button, } from 'react';
import DependencyTree from './DependencyTree';
import DependencyOptionForm from './DependencyOperation';
import 'antd/dist/antd.css';

class JobDependencyManagement extends Component {

  state = {
    dependencyTreeData: {
      "name": "Modeling Methods",
      "id": "dependencyTreeRoot",
      "children": [{ "name": "Classification", "children": [{ "name": "Logistic regression" }, { "name": "Linear discriminant analysis" }, { "name": "Rules" }, { "name": "Decision trees" }, { "name": "Naive Bayes" }, { "name": "K nearest neighbor" }, { "name": "Probabilistic neural network" }, { "name": "Support vector machine" }] }, { "name": "Consensus", "children": [{ "name": "Models diversity", "children": [{ "name": "Different initializations" }, { "name": "Different parameter choices" }, { "name": "Different architectures" }, { "name": "Different modeling methods" }, { "name": "Different training sets" }, { "name": "Different feature sets" }] }, { "name": "Methods", "children": [{ "name": "Classifier selection" }, { "name": "Classifier fusion" }] }, { "name": "Common", "children": [{ "name": "Bagging" }, { "name": "Boosting" }, { "name": "AdaBoost" }] }] }, { "name": "Regression", "children": [{ "name": "Multiple linear regression" }, { "name": "Partial least squares" }, { "name": "Multi-layer feedforward neural network" }, { "name": "General regression neural network" }, { "name": "Support vector regression" }] }]
    }

  }

  componentDidMount() {

  }


  render() {
    return (
      <div style={{height:'100%'}}>
        <div style={{paddingLeft : '40px', paddingTop : '20px'}}>
          <DependencyOptionForm />
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