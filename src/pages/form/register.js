import React from 'react';
import {Card,Radio, Form,Input, Select, InputNumber, Switch, DatePicker, TimePicker} from 'antd';
import RadioGroup from 'antd/lib/radio/group';
import moment  from 'moment';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;
const Option = Select.Option;

class FormRegister extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentWillMount() {

    }
    componentDidMount(){

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }

        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal" >
                        <FormItem label="用户名" {...formItemLayout} >
                            {
                                getFieldDecorator('userName',{
                                    initiaValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout} >
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        }
                                    ]
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout} >
                            {
                                getFieldDecorator('gender',{
                                    initiaValue: '1'
                                })(
                                    <RadioGroup>
                                        <Radio value="1" >男</Radio>
                                        <Radio value="2" >女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout} >
                            {
                                getFieldDecorator('state', {
                                    initialValue: '2'
                                })(
                                    <Select>
                                        <Option value="1">搁浅</Option>
                                        <Option value="2">借口</Option>
                                        <Option value="3">枫</Option>
                                        <Option value="4">晴天</Option>
                                        <Option value="5">以父之名</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('hobby',{
                                    initialValue: ['2','5']
                                })(
                                    <Select mode="multiple">
                                        <Option value="1" >音乐</Option>
                                        <Option value="2" >历史</Option>
                                        <Option value="3" >动漫</Option>
                                        <Option value="4" >跑步</Option>
                                        <Option value="5" >骑行</Option>
                                        <Option value="6" >桌球</Option>
                                        <Option value="7" >游泳</Option>
                                        <Option value="8" >爬山</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('married', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    initiaValue: moment('2018-08-08')
                                })(
                                    <DatePicker 
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout} >
                            {
                                getFieldDecorator('address',{
                                    initialValue: '北京海淀区上地六村'
                                })(
                                    <TextArea 
                                        autosize={{minRows: 4, maxRows: 6}}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="早期时间" {...formItemLayout}>
                            {
                                getFieldDecorator('getupTime') (
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        
                    </Form>
                </Card>
            </div>
        )
    }
    componentWillUnmount() {

    }
} 
export default Form.create()(FormRegister); // 使用antd对本组件进行加工;