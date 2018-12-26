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
                    title="注册App"
                    okText="增加"
                    cancelText="取消"
                    onCancel={onCancel}
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

export default class JobList extends Component {
    render(){
        return (<div>
            hello 这里是jobList
        </div>)
    }
}