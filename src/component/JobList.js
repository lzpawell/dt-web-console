import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
    Table, Input, Button, Popconfirm, Modal, Form, Radio
} from 'antd';


class JobTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'jobId',
            dataIndex: 'jobId',
            width: '15%',
        }, {
            title: 'processor',
            dataIndex: 'processor',
            width : '15%'
        }, {
            title: '处理器',
            dataIndex: 'processor',
            width : '15%'
        }, {
            title: '触发方式',
            dataIndex: 'triggerMode',
            width : '10%'
        }, {
            title: 'corntab表达式',
            dataIndex: 'corntabExp',
            width : '10%'
        }, {
            title: '运行时间',
            dataIndex: 'lastRunTime',
            width : '5%'
        },{
            title: '状态',
            dataIndex: 'isActive',
            width : '5%',
            render : (text, record) => {
                return (<div>
                    {record.isActive ? <a href="javascript:;" style={{display : 'inline-block', margin : 5}}>停用</a> : <a href="javascript:;" style={{display : 'inline-block', margin : 5}}>启用</a>}
                </div>);
            }
        },{
            title: '操作',
            dataIndex: 'jobId',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <div>
                            <a href="javascript:;" style={{display : 'inline-block', marginLeft : 5}}>配置</a>
                            <a href="javascript:;" style={{display : 'inline-block', margin : 5}}>检查</a>
                            {record.isRunning ? <a href="javascript:;" style={{display : 'inline-block', margin : 5}}>触发一次</a> : <a href="javascript:;" style={{display : 'inline-block', margin : 5}}>运行时数据</a>}
                            <a href="javascript:;" style={{display : 'inline-block', margin : 5}}>触发历史</a>
                            <a href="javascript:;" style={{display : 'inline-block', margin : 5}}>删除</a>
                        </div>
                    ) : null
            ),
        }];

        this.state = {
            dataSource: [{
                key: '0',
                jobId: 'dslsnkgl-dslkgn-55s-dsa',
                processor: 'xin.awell.balbla.JobProcessor',
                triggerMode : '定时触发',
                corntabExp : '0 */2 * * *',
                isActive : true,
                isRunning : false,
                lastRunTime : '12:15'
            }, {
                key: '1',
                jobId: '135ssfgas-dslkgn-5e5s-dsasa',
                processor: 'xin.awell.cbap.JobProcessor',
                triggerMode : 'api触发',
                corntabExp : '/',
                isActive : false,
                isRunning : true,
                lastRunTime : '03:15'
            }, {
                key: '2',
                jobId: '135ssfgas-dslkgn-5e5s-dsasa',
                processor: 'com.amall.processor.JobProcessor',
                triggerMode : '定时触发',
                corntabExp : '0 */2 * * *',
                isActive : true,
                isRunning : false,
                lastRunTime : '06:23'
            }, {
                key: '3',
                jobId: 'kjsd531sd3sf-153-dsf--s3s51f',
                processor: 'xin.mulin.nbala.SimpleJobProcessor',
                triggerMode : '定时触发',
                corntabExp : '/',
                isActive : true,
                isRunning : false,
                lastRunTime : '22:00'
            }, {
                key: '4',
                jobId: '135ssfgas-8656dssa-531sadwq-23ssadf',
                processor: 'org.baosen.blanlkg.SimpleJobProcessor',
                triggerMode : 'api触发',
                corntabExp : '/',
                isActive : true,
                isRunning : false,
                lastRunTime : '23:15'
            }],
            count: 5,
        };
    }



    render() {
        const {dataSource } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

export default class JobList extends Component {
    render(){
        return (<div>
            <div style={{ marginBottom: 16, marginTop : 30 }}>
                <Button type="primary" onClick={()=>{}}>新建Job</Button>
            </div>
            <JobTable />
        </div>)
    }
}