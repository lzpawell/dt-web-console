import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
    Table, Input, Button, Popconfirm, Modal, Form, Radio
} from 'antd';


const AddUserPermissionForm = Form.create()(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="增加用户权限"
                    okText="增加"
                    cancelText="取消"
                    onCancel={()=>{
                        this.props.form.resetFields();
                        onCancel();
                    }}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="userId">
                            {getFieldDecorator('userId', {
                                rules: [{ required: true, message: '请输入用户id!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="权限类型" className="collection-create-form_last-form-item">
                            {getFieldDecorator('permission', {
                                initialValue: 'ops', rules: [{ required: true, message: '请选择权限类型!' }]
                            })(
                                <Radio.Group >
                                    <Radio value="owner">owner</Radio>
                                    <Radio value="ops">ops</Radio>
                                </Radio.Group>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);


class AddUserPermissionFormWrapper extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                console.log('表单出错');
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });

            this.props.onHandleAdd(values.userId, values.permission);
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>增加用户权限</Button>
                <AddUserPermissionForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}



class PermissionTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'userId',
            dataIndex: 'userId',
            width: '30%',
        }, {
            title: '权限',
            dataIndex: 'permission',
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <Popconfirm title="确认删除用户权限?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                    ) : null
            ),
        }];

        this.state = {
            dataSource: [{
                key: '0',
                userId: 'awell',
                permission: 'owner',
            }, {
                key: '1',
                userId: 'small yellow',
                permission: 'ops',
            }],
            count: 2,
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    handleAdd = (userId, permission) => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            userId: userId,
            permission: permission,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }

    render() {
        const {dataSource } = this.state;
        const columns = this.columns;
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <AddUserPermissionFormWrapper type="primary" onHandleAdd={this.handleAdd} />
                </div>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}


class MetaDataTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'appName',
            dataIndex: 'appName',
            width: '20%',
        }, {
            title : '我的应用权限',
            dataIndex: 'permission',
            width : '20%',
        },{
            title: 'access-key',
            dataIndex: 'key',
            width: '40%',
        }, {
            title: '操作',
            dataIndex: 'appName',
            width: '20%',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <Popconfirm title="确认注销App?" onConfirm={() => this.handleUnregistry(record.appName)}>
                            <a href="javascript:;">注销app</a>
                        </Popconfirm>
                    ) : null
            ),
        }];

        this.state = {
            dataSource: [{
                key: '0',
                appName: 'app1',
                key: 'salkngl-ldsngd-slgk-dlngdk',
                permission : 'owner'
            }],
        };
    }


    handleUnregistry = (appName) => {
        //TODO: unrigistry app, 同时reload页面
    }

    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        console.log(columns);
        console.log(dataSource);
        return (
            <div style={{width : "70%"}}>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
            </div>
        );
    }
}


export default class AppSettings extends Component {
    render() {
        return this.state.appName != undefined ?
            (<h3>请选择app</h3>)
            :
            (<div style={{ padding: 20 }}>
                <div>
                    <h2>元数据</h2>
                    <MetaDataTable />
                </div>

                <div style={{marginTop : 100}}>
                    <h2>权限管理</h2>
                    <PermissionTable />
                </div>
            </div>);
    }


    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = { appName: props.appName };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.appName != null) {
            this.setState({ appName: newProps.appName });
        }
    }
} 