import React from 'react';
import {
    Form, Input, Button,Icon, Modal
  } from 'antd';
import 'antd/dist/antd.css';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const FormItem = Form.Item;

/*
树数据结构
dependencyTreeData: {
    "name": "Modeling Methods",
    "children": array
}
*/
class DependencyOperation extends React.Component{

    onGetDependencyTreeData = (data)=>{
        //父组件有注册onGetDependencyTreeData, 调一下
        if(this.props.onGetDependencyTreeData != undefined){
            this.props.onGetDependencyTreeData(data);
        }
    }

    query = () =>{
        console.log('query');
        console.log(this.props.form.getFieldsValue());
        this.showErrorMsg('查询失败！', "job依赖不存在！")
        this.onGetDependencyTreeData({name : 'balala', children : [{name : "balal123"}, {name : 'mdzz'}]});
    };

    delete = () =>{
        //clean tree data
        this.onGetDependencyTreeData(null);
        console.log(this.props.form.getFieldsValue());
    };

    create = () =>{
        console.log('create');
        console.log(this.props.form.getFieldsValue());
        this.showSuccessMsg("创建依赖", "依赖创建成功！", ()=>{
            this.onGetDependencyTreeData({name : 'balala', children : [{name : "balal123", children : [{name : "itemA"},{name : "itemB"},{name : "itemC"}]}, {name : 'mdzz'}]})
        });
    };

    showErrorMsg = (title, msg, callback)=>{
        Modal.error({
            title: title,
            content: msg,
            onOk : callback,
            onCancel : callback
          });
    }

    showSuccessMsg = (title, msg, callback)=>{
        Modal.success({
            title: title,
            content: msg,
            onOk : callback,
            onCancel : callback
          });
    }

    componentDidMount(){
        //触发表单校验， 禁止掉按钮
        this.props.form.validateFields();
    }

    render(){
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
          } = this.props.form;
          // Only show error after a field is touched.
          const prefixJobError = isFieldTouched('prefixJob') && getFieldError('prefixJob');
          const postfixJobError = isFieldTouched('postfixJob') && getFieldError('postfixJob');
        return (
        <Form layout="inline">
            <FormItem
                validateStatus={prefixJobError ? 'error' : ''}
                help={prefixJobError || ''}
                label={'前置jobId:'}
            >
                {getFieldDecorator('prefixJob', {
                    rules: [{ required: true, message: '前置jobId不能为空！' }],
                    })(
                    <Input placeholder="prefix Job id" />
                )}
            </FormItem>

            <FormItem
                validateStatus={postfixJobError ? 'error' : ''}
                help={postfixJobError || ''}
                label={'后置jobId:'}
            >
                {getFieldDecorator('postfixJob', {
                    rules: [{ required: true, message: '后置jobId不能为空！' }],
                    })(
                    <Input placeholder="postfix Job id" />
                )}
            </FormItem>
            <FormItem>
                <Button
                    type="default"
                    onClick={this.query}
                    disabled={hasErrors(getFieldsError())}
                    icon="search"
                >
                    查询
                </Button>
            </FormItem>

            <FormItem>
                <Button
                    type="primary"
                    onClick={this.create}
                    disabled={hasErrors(getFieldsError())}
                >
                    创建
                </Button>
            </FormItem>

            <FormItem>
                <Button
                    type="danger"
                    onClick={this.delete}
                    disabled={hasErrors(getFieldsError())}
                >
                    删除
                </Button>
            </FormItem>
        </Form>
        );
    }
}

//注入.props.form属性
const DependencyOperationForm = Form.create()(DependencyOperation);

export default DependencyOperationForm;