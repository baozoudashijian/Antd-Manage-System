import React from 'react';
import { Card, Button, Table, Form, Select, DatePicker, Checkbox, message, Modal } from 'antd';
import axios from '../../axios/index';
import { from } from 'rxjs';

const FormItem = Form.Item;
const Option = Select.Option;

class Order extends React.Component {

    constructor() {
        super();
        this.state = {
            orderConfirmVisble: false,
            orderInfo: {}
        }
        this.params = {
            page: 1
        }
    }
    componentWillMount() {
        this.requestList();
    }
    // 渲染表格数据.
    requestList = () => {
        axios.salary({
            url: '/order/list',
            data: {
                params: this.params
            }
        }).then((res) => {

            let list = res.result.item_list;
            console.log(list);
            this.setState({
                list
            })
        }) 
    }
    //行数据被点击的时候触发;
    onRowClick = (record,index) => {
        console.log(record,index);
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record // 当前点击订单的全部信息;
        })
    }
    handleFilter = () => {
        // 获取筛选的值,作为调用接口传递的参数;
        let fieldsValue = this.props.form.getFieldsValue();
        if(fieldsValue.begin_time == undefined && fieldsValue.end_time == undefined && fieldsValue.pay == undefined && fieldsValue.drive_mode == undefined) {
            message.error('请输入查询条件');
        }
        console.log(fieldsValue);
        // params 也是定义挂在在组件上的.
        this.params = fieldsValue;
        // 重新调用数据重新渲染数据.
        this.requestList()
    }
    //点击结束订单按钮定义的方法
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if(!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        axios.salary({
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            console.log(res);
            this.setState({
                orderConfirmVisble: true,
                orderInfo: res.result
            })
        })
       
    }
    // 确认结束订单
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        axios.salary({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if(res.result == 'Ok') {
                message.success('订单结束成功');
                this.setState({
                    orderConfirmVisble: false,
                    selectedRowKeys: []
                });
                this.requestList();
            }
        })
        this.setState({
            orderConfirmVisble: false
        })
    }
    // 查看订单详情 
    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if(!item) {
            Modal.info({
                title: '提示',
                content: '请选择一条订单信息'
            });
            return;
        }
        
        // 跳转一个详情页;
        window.open(`/#/common/order/detail/${item.id}`,'_blank');

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance'
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ];
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <div>
                <Card>
                    <Form layout="inline">
                        <FormItem label="订单时间">
                            {
                                getFieldDecorator('begin_time')(
                                    <DatePicker showTime={true} placeholder="开始时间" format="YYYY-MM-DD HH:mm:ss" ></DatePicker>
                                )
                            }
                        </FormItem>
                        <FormItem label="~" colon={false}>
                            {
                                getFieldDecorator('end_time')(
                                    <DatePicker showTime={true} placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                                )
                            }
                        </FormItem>
                        <FormItem label="行驶路线">
                            {
                                getFieldDecorator("drive_mode")(
                                    <Select style={{ width: 100 }} placeholder="请选择">
                                        <Option value="1">步行</Option>
                                        <Option value="2">骑行</Option>
                                        <Option value="3">公交</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="支付方式">
                            {
                                getFieldDecorator('pay')(
                                    <div>
                                        <Checkbox>微信支付</Checkbox>
                                        <Checkbox>支付宝</Checkbox>
                                        <Checkbox>银联支付</Checkbox>
                                    </div>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFilter} >查询</Button>
                            <Button>重置</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card style={{marginTop: '10px'}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft: 10}}  onClick={this.handleConfirm} >结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record,index);
                                }
                            }
                        }}

                    />
                </div>
                {/* 结束订单 */}
                <Modal 
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    width={600}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisble: false
                        });
                    }}
                    onOk={this.handleFinishOrder}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )

    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
}

export default Form.create({})(Order);