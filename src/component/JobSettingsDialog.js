import React, {Component} from 'react';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import {
    Input, Button, Popconfirm, Modal, Form, Radio
} from 'antd';
import { userInfo } from 'os';


/*
通过props  saveRef  传入引用 t， 我们会为 t注入当前JobSettingsDialog instance
然后通过t.jobSettingsDialog获得dialog,
通过调用dialog.updateExistJobSettings || dialog.createNewJob
展开job设置窗口

state.runtimeData
{
    mode : "update" || "create",
    jobId : if mode == update, this property should exists
    onSuccessCallback : function 成功或者失败后回调这个方法
}
*/
const JobSettingsDialog = Form.create()(
    // eslint-disable-next-line
    class extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                runtimeData : {
                    //update || create
                    mode : "update"   
                }
            }

            const {saveRef} = props;
            if(saveRef != undefined){
                saveRef.jobSettingsDialog = this;
            } 
        }

        //外面直接调这个函数打开窗口
        updateExistJobSettings = (jobId, onUpdateSuccess) =>{
            console.log("配置已经存在的job");
        };        

        createNewJob = (onCreateCallback)=>{
            console.log("新建job");
        }

        onCancel = ()=>{
            //clear runtime data
            this.props.form.resetFields();
            this.setState({runtimeData : {}});
        }

        onOk = ()=>{
            //进行数据交互  typeof 怎么写？ if runtimeDate == undefined then  throw error
            if(this.state.runtimeData != undefined && typeof this.state.runtimeData.onSuccessCallback == 'function'){
                this.state.runtimeData.onSuccessCallback();
            }
        }

        render() {
            const form = this.props.form;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="job配置"
                    okText={this.state.runtimeData.mode == 'create' ? "新建" : "更新"}
                    cancelText="取消"
                    onCancel={this.onCancel}
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

export default JobSettingsDialog;