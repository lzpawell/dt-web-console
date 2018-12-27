import React, { Component } from 'react';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import {
    Input, Button, Popconfirm, Modal, Form, Radio
} from 'antd';


const AppRegistryForm = Form.create()(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onRegistry, form,
            } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="注册App"
                    okText="注册"
                    cancelText="取消"
                    onCancel={()=>{
                        this.props.form.resetFields();
                        onCancel();
                    }}
                    onOk={onRegistry}
                >
                    <Form layout="vertical">
                        <Form.Item label="appName">
                            {getFieldDecorator('appName', {
                                rules: [{ required: true, message: '请输入应用名!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);


export default class AppRegistryDialog extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    onRegistry = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                console.log('表单出错');
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });

            //TODO: 注册成功后调onRegistrySuccess
            this.props.onRegistrySuccess();
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    componentWillReceiveProps(newProps){
        if(true == newProps.visible){
            this.setState({visible : newProps.visible});
        }
    }

    render() {
        return (
            <div>
                <AppRegistryForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onRegistry={this.onRegistry}
                />
            </div>
        );
    }
}
