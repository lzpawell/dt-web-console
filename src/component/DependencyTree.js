import React, { Component } from 'react';
import G6 from '@antv/g6';
import 'antd/dist/antd.css';

/**
 * job依赖树结构
 */
class DependencyTree extends Component{

    constructor(props) {
        super(props);
        this.state = {
            dependencyTreeData: props.dependencyTreeData
        };

        console.log("constructor")
        console.log(this.state)
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.dependencyTreeData != undefined){
            this.setState({dependencyTreeData: nextProps.dependencyTreeData}, this.renderDependencyTree);
            console.log("props update")
            console.log(this.state)
            setTimeout(this.renderDependencyTree, 1000);
        }
    }

    renderDependencyTree(){
        let graph = new G6.Graph({
            container: 'dependencyTreeCanvas',
            width:800,
            height:500
        });
        graph.read(this.state.dependencyTreeData);

        console.log("render dependency tree")
        console.log(this.state)
    }

    render(){
        console.log("render")
        console.log(this.state)
        setTimeout(this.renderDependencyTree.bind(this), 1000);
        return (<div id="dependencyTreeCanvas" style={{width : "100%", height : "100%"}}></div>);
    }
}


export default DependencyTree;