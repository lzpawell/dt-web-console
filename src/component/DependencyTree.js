import React, { Component } from 'react';
import G6 from '@antv/g6';
import '@antv/g6/build/g6Plugins.js';
//import '@antv/g6/build/plugin.tool.fisheye'
import 'antd/dist/antd.css';

/**
 * job依赖树结构
 */
const FisheyePlugin = G6.Plugins['tool.fisheye'];


class DependencyTree extends Component{

    constructor(props) {
        super(props);
        this.state = {
            dependencyTreeData: props.dependencyTreeData
        };

        //配置边样式
        G6.registerNode('dependencyTreeCanvas', {
            anchor: [[0, 0.5], [1, 0.5]]
          });
        G6.registerEdge('smooth', {
            getPath: function getPath(item) {
              var points = item.getPoints();
              var start = points[0];
              var end = points[points.length - 1];
              var hgap = Math.abs(end.x - start.x);
              if (end.x > start.x) {
                return [['M', start.x, start.y], ['C', start.x + hgap / 4, start.y, end.x - hgap / 2, end.y, end.x, end.y]];
              }
              return [['M', start.x, start.y], ['C', start.x - hgap / 4, start.y, end.x + hgap / 2, end.y, end.x, end.y]];
            }
        });
    }
    componentWillReceiveProps(nextProps) {

        if(nextProps.dependencyTreeData != undefined){
            this.setState({dependencyTreeData: nextProps.dependencyTreeData}, this.renderDependencyTree);
            //setTimeout(this.renderDependencyTree, 1000);
        }
    }

    tree = undefined;
    renderDependencyTree(){
        if(this.tree == undefined){
            var layout = new G6.Layouts.CompactBoxTree({
                // direction: 'LR', // 方向（LR/RL/H/TB/BT/V）
                getHGap: function getHGap() {
                  // 横向间距
                  return 100;
                },
                getVGap: function getVGap() {
                  // 竖向间距
                  return 10;
                }
            });
    
            this.tree = new G6.Tree({
                id: 'dependencyTreeCanvas', // 容器ID
                //height: window.innerHeight, // 画布高
                layout: layout,
                fitView: 'autoZoom',
                plugins: [
                    new FisheyePlugin({radius: 200})     
                ],
                modes: {
                    //拖拽， 缩放
                    default: ['panCanvas', 'wheelZoom']
                }
            });
    
            this.tree.node({
                shape: 'treeNode',
                size: 10,
                label: function label(model) {
                  if (model.children && model.children.length > 0) {
                    return {
                      text: model.name,
                      textAlign: 'right'
                    };
                  }
                  return {
                    text: model.name,
                    textAlign: 'left'
                  };
                },
                labelOffsetX: function labelOffsetX(model) {
                  if (model.children && model.children.length > 0) {
                    return -10;
                  }
                  return 10;
                }
            }).style({
                fillOpacity: 1
              });
            this.tree.edge({
                shape: 'smooth'
            });
            
        }else{
            
        }
    }


    renderData = (data)=>{
        this.tree.read({
            roots: [data]
        });
    }

    render(){
        setTimeout(this.renderDependencyTree.bind(this), 1000);
        setTimeout(()=>{
            this.renderData({'name' : 'roota', children : [{'name' : 'balala'}] });
        }, 6000);

        setTimeout(()=>{
            this.renderData(this.state.dependencyTreeData);
        }, 3000);
        
        return (<div id="dependencyTreeCanvas" style={{width : "100%", height : "100%"}}></div>);
    }
}


export default DependencyTree;