import React from 'react';
import {
    Form, Input, Button,Icon
  } from 'antd';
import 'antd/dist/antd.css';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const FormItem = Form.Item;


class DependencyOperation extends React.Component{

    query = () =>{
        console.log('query');
        console.log(this.props.form.getFieldsValue());
    };

    delete = () =>{
        console.log('delete');
        console.log(this.props.form.getFieldsValue());
    };

    create = () =>{
        console.log('create');
        console.log(this.props.form.getFieldsValue());
    };

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