import React from 'react';
import { Card, Table, Modal,Button, message } from 'antd';
import axios from './../../axios/index';

class BasicTable extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }
    componentWillMount() {
        // 根据表头定义的数据;
        const dataSource = [
            {
                id: '0',
                userName: 'jay',
                sex: '1',
                state: '1',
                interest: '1',
                key: 1,
                birthday: '2019-07-04',
                address: '杭州市西湖区骆家庄西苑二区',
                getupTime: '07:00'
            },
            {
                id: '1',
                userName: 'mike',
                sex: '2',
                state: '1',
                interest: '1',
                key: 2,
                birthday: '2019-07-04',
                address: '杭州市西湖区骆家庄西苑二区',
                getupTime: '07:00'
            },
            {
                id: '2',
                userName: 'john',
                sex: '1',
                state: '1',
                interest: '2',
                key: 3,
                birthday: '2019-07-04',
                address: '杭州市西湖区骆家庄西苑二区',
                getupTime: '07:00'
            },
            {
                id: '3',
                userName: 'jobs',
                sex: '1',
                state: '2',
                interest: '1',
                key: 4,
                birthday: '2019-07-04',
                address: '杭州市西湖区骆家庄西苑二区',
                getupTime: '07:00'
            }
        ];
        this.setState({
            dataSource
        });
        this.request();
    }
    //请求mock数据渲染到表格;
    request = () => {

        // axios.get(baseUrl+'/table/list').then((res) => {
        //     console.log(res);
        //     if(res.status == '200') {
        //         this.setState({
        //             dataSource2: res.data.result.list
        //         })
        //     }
        // })
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: 1
                }
                // showLoading: false
            }
        }).then((res) => {
            console.log(res);
            if (res.code == 0) {
                res.result.list.map((item) => {
                    // console.log(item);
                    item.key = item.id - 1;
                });
                // console.log(resData,'resDate');
                
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: []
                });
            }

        });

    }
    onRowClick = (record,index) => {
        console.log(index);
        console.log(record);
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey, //选中的索引
            selectedItem: record // 选中的数据;
        });
        Modal.success({
            title: '当前点击信息',
            content: `当前用户ID: ${record.id}, 当前用户名: ${record.userName}`
        })
    }
    handleDelete = () => {
        console.log(this.state.selectedRowKeys);
        console.log(this.state.selectedRows);
        let rows = this.state.selectedRows;
        let ids = [];
        if(rows.length) {
            rows.map((item) => {
                ids.push(item.id);
            });
            Modal.confirm({
                title: '删除提示',
                content: `你确定要删除${ids.join(',')}`,
                onOk: () => {
                    this.request();
                    message.success('删除成功');
                    
                }
    
            })
        }else{
            message.warn('当前没有选择删除项');
        }
        
    }
    render() {
        // 定义表头
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        "1": "一条咸鱼",
                        "2": "风流浪子",
                        "3": "百度FE",
                        "4": "北大才子",
                        "5": "创业者"
                    }
                    return config[state];
                }
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) { // render 方法处理当前字段;
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        "1": "游泳",
                        "2": "打篮球",
                        "3": "唱跳",
                        "4": "Rap",
                        "5": "高尔夫",
                        "6": "爬山",
                        "7": "踢足球",
                        "8": "打乒乓球"
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'getupTime'
            }
        ];
        let { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys, // 这个属性 是选中 不选中的判断 条件.
            onChange: (selectedRowKeys,selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }

        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}

                    />
                </Card>

                <Card title="动态渲染数据表格" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>

                <Card title="Mock-单选" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        onRow={(record,index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record,index);
                                }
                            }
                        }}
                    />
                </Card>

                <Card title="Mock-复选">
                        <Button style={{margin: '10px 0'}} onClick={() => this.handleDelete()}>删除</Button>
                        <Table 
                            bordered
                            rowSelection={rowCheckSelection}
                            columns={columns}
                            dataSource={this.state.dataSource2}
                            pagination={false}
                        />
                </Card>
            </div>
        )
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
}

export default BasicTable;