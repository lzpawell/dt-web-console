import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import JobManagement from './component/JobManagement';
import JobDependencyManagement from './component/JobDependencyManagement';
import AppTitle from './component/AppTitle';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
  state = {
    envirment: "日常环境",
    contentHint : undefined,
    contentPage : undefined,
    activeApp : undefined
  };


  onEnvirmentChange(envirment){
    this.setState({envirment});
    //TODO: reload
  };

  onAppChange(appName){
    this.setState({activeApp : appName});
  }

  hintMapper = {
    JobDependencyManagement : (
      <Breadcrumb style={{ margin: '7px 0 7px 10px'}}>
        <Breadcrumb.Item>dt-web-console</Breadcrumb.Item>
        <Breadcrumb.Item>job依赖</Breadcrumb.Item>
      </Breadcrumb>
    ),

    JobManagement : (
      <Breadcrumb style={{ margin: '7px 0 7px 10px'}}>
        <Breadcrumb.Item>dt-web-console</Breadcrumb.Item>
        <Breadcrumb.Item>job管理</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  contentMapper = {
    JobManagement : (<JobManagement />),
    JobDependencyManagement : (<JobDependencyManagement />),
  }

  envirmentMenu = (
    <Menu>
      <Menu.Item>
        <a  href="javascript:void(0);" onClick={this.onEnvirmentChange.bind(this, '日常环境')} >&nbsp;&nbsp;&nbsp;日常环境&nbsp;&nbsp;&nbsp;</a>
      </Menu.Item>
      <Menu.Item>
        <a  href="javascript:void(0);" onClick={this.onEnvirmentChange.bind(this, '预发环境')} >&nbsp;&nbsp;&nbsp;预发环境&nbsp;&nbsp;&nbsp;</a>
      </Menu.Item>
      <Menu.Item>
        <a  href="javascript:void(0);" onClick={this.onEnvirmentChange.bind(this, '生产环境')} >&nbsp;&nbsp;&nbsp;生产环境&nbsp;&nbsp;&nbsp;</a>
      </Menu.Item>
    </Menu>
  );

  applist = (<Menu>
      <Menu.Item>
        <a  href="javascript:void(0);" onClick={this.onAppChange.bind(this, 'app1')} >app1</a>
      </Menu.Item>
      <Menu.Item>
        <a  href="javascript:void(0);" onClick={this.onAppChange.bind(this, 'app2')} >app2</a>
      </Menu.Item>
      <Menu.Item>
        <a  href="javascript:void(0);" onClick={this.onAppChange.bind(this, 'app3')} >app3</a>
      </Menu.Item>
    </Menu>);


  onOpenContent(contentType){
    this.setState({contentHint : this.hintMapper[contentType], contentPage : this.contentMapper[contentType]});
  }

  // className="header" theme="dark"
  // mode="horizontal" style={{ lineHeight: '64px' }}
  render() {
    return (
      <Layout style={{ height: '100%'}} >
        <Header >
            <Row type="flex" justify="start">
              <Col ><AppTitle fontSize={24}/></Col>
              <Col >
                <Dropdown overlay={this.envirmentMenu} placement="bottomCenter">
                  <span style = {{color : '#fff', display : 'inline-block', marginLeft : '30px'}}>{this.state.envirment}</span>
                </Dropdown> 
              </Col>
              <Col >
                <Dropdown overlay={this.applist} placement="bottomCenter" style={{margin: "200"}}>
                  <span style = {{color : '#fff', display : 'inline-block', marginLeft : '30px'}}>{this.state.activeApp == undefined ? "请选择App" : this.state.activeApp}</span>
                </Dropdown>
              </Col>
            </Row>
        </Header>
        <Layout style={{ height: '100%'}}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1" onClick={this.onOpenContent.bind(this, 'JobManagement')}>job管理</Menu.Item>
              <Menu.Item key="2" onClick={this.onOpenContent.bind(this, 'JobDependencyManagement')}>job依赖</Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ paddingLeft: '10px' }}>
            {this.state.contentHint != undefined ? this.state.contentHint : null}
            <Content style={{ background: '#fff', margin: 0, minHeight: 280 }}>
              {this.state.contentPage}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
