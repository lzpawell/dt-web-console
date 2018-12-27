import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { HashRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import JobManagement from './component/JobManagement';
import JobDependencyManagement from './component/JobDependencyManagement';
import AppTitle from './component/AppTitle';
import AppSettings from './component/AppSettings';
import AppRegistryDialog from './component/AppRegistry';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      envirment: "日常环境",
      activeApp: undefined,
      userId: "awell",
      appRegistryDialogVisiable: false
    }
  }

  onEnvirmentChange(envirment) {
    this.setState({ envirment });
    //TODO: reload
  };

  onAppChange(appName) {
    console.log('app change : ' + appName);
    this.setState({ activeApp: appName });
  }

  JobDependencyManagementHint = () => (
    <Breadcrumb style={{ margin: '7px 0 7px 10px' }}>
      <Breadcrumb.Item>dt-web-console</Breadcrumb.Item>
      <Breadcrumb.Item>job依赖</Breadcrumb.Item>
    </Breadcrumb>
  );

  JobManagementHint = () => (
    <Breadcrumb style={{ margin: '7px 0 7px 10px' }}>
      <Breadcrumb.Item>dt-web-console</Breadcrumb.Item>
      <Breadcrumb.Item>job管理</Breadcrumb.Item>
    </Breadcrumb>
  );

  AppPermissionHint = () => (
    <Breadcrumb style={{ margin: '7px 0 7px 10px' }}>
      <Breadcrumb.Item>dt-web-console</Breadcrumb.Item>
      <Breadcrumb.Item>应用权限管理</Breadcrumb.Item>
    </Breadcrumb>
  );
  envirmentMenu = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0);" onClick={this.onEnvirmentChange.bind(this, '日常环境')} >&nbsp;&nbsp;&nbsp;日常环境&nbsp;&nbsp;&nbsp;</a>
      </Menu.Item>
      <Menu.Item>
        <a href="javascript:void(0);" onClick={this.onEnvirmentChange.bind(this, '预发环境')} >&nbsp;&nbsp;&nbsp;预发环境&nbsp;&nbsp;&nbsp;</a>
      </Menu.Item>
      <Menu.Item>
        <a href="javascript:void(0);" onClick={this.onEnvirmentChange.bind(this, '生产环境')} >&nbsp;&nbsp;&nbsp;生产环境&nbsp;&nbsp;&nbsp;</a>
      </Menu.Item>
    </Menu>
  );

  applist = (<Menu>
    <Menu.Item>
      <a href="javascript:void(0);" onClick={this.onAppChange.bind(this, 'app1')} >app1</a>
    </Menu.Item>
    <Menu.Item>
      <a href="javascript:void(0);" onClick={this.onAppChange.bind(this, 'app2')} >app2</a>
    </Menu.Item>
    <Menu.Item>
      <a href="javascript:void(0);" onClick={this.onAppChange.bind(this, 'app3')} >app3</a>
    </Menu.Item>
    <Menu.Item>
      <a href="javascript:void(0);" onClick={
        () => {
          this.setState({ appRegistryDialogVisiable: true }, () => {
            this.setState({ appRegistryDialogVisiable: false })
          })
        }} >注册新的App</a>
    </Menu.Item>
  </Menu>);

  // className="header" theme="dark"
  // mode="horizontal" style={{ lineHeight: '64px' }}
  render() {
    return (
      <div style={{height : '100%'}}>
        <AppRegistryDialog visible={this.state.appRegistryDialogVisiable} onRegistrySuccess={(newAppName) => { 
          console.log('ddsdsdf') 
          //TODO: 将activeApp改为新的appName
          //TODO: 重定向页面到app设置页
          }} />

        <Layout style={{ height: '100%' }} >
          <Header >
            <Row type="flex" justify="start">
              <Col ><AppTitle fontSize={24} /></Col>
              <Col >
                <Dropdown overlay={this.envirmentMenu} placement="bottomCenter">
                  <span style={{ color: '#fff', display: 'inline-block', marginLeft: '30px' }}>{this.state.envirment}</span>
                </Dropdown>
              </Col>
              <Col >
                <Dropdown overlay={this.applist} placement="bottomCenter" style={{ margin: "200" }}>
                  <span style={{ color: '#fff', display: 'inline-block', marginLeft: '30px' }}>{this.state.activeApp == undefined ? "请选择App" : this.state.activeApp}</span>
                </Dropdown>
              </Col>
            </Row>
          </Header>

          <HashRouter>
            <Layout style={{ height: '100%' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu style={{ height: '100%', borderRight: 0 }}>
                  <Menu.Item key="1" ><Link to="/jobManagement">job管理</Link></Menu.Item>
                  <Menu.Item key="2" ><Link to="/jobDependencyManagement">job依赖</Link></Menu.Item>
                  <Menu.Item key="3" ><Link to="/appSettings">app设置</Link></Menu.Item>
                </Menu>
              </Sider>
              <Layout style={{ paddingLeft: '10px' }}>
                <Switch>
                  <Route exact path="/jobManagement" component={this.JobManagementHint} />
                  <Route exact path="/jobDependencyManagement" component={this.JobDependencyManagementHint} />
                  <Route exact path="/appSettings" component={this.AppPermissionHint} />
                </Switch>
                <Content style={{ background: '#fff', margin: 0, height: '100%' }}>
                  <Switch>
                    <Route exact path="/jobManagement" component={JobManagement} params={{ balala: 'ddd' }} />
                    <Route exact path="/jobDependencyManagement" component={JobDependencyManagement} />
                    <Route exact path="/appSettings" component={AppSettings} />
                    <Redirect to={{ pathname: '/jobManagement', state: { from: this.props.location } }} />
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </HashRouter>
        </Layout>
      </div>
    );
  }
}

export default App;
