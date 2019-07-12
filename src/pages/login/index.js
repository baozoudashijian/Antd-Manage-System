import React from 'react';
import { Card, Form, Input, Icon, Checkbox, Button, message } from 'antd';
import './login.less';
import axios from '../../axios';
const FormItem = Form.Item;

class Login extends React.Component {

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        // 验证设置的rules,如果都符合就调用l;
        this.props.form.validateFields((err, value) => {
            if(!err) {
                console.log(userInfo);
                let formData = new FormData();
                let userName = userInfo.userName;
                let password = userInfo.password;
                formData.append('userName',userName);
                formData.append('userPassword',password);
                console.log(formData);
                axios.ajax({
                    url: '/login',
                    data: {
                        params: formData
                    }
                }).then((res) => {
                    // 登录成功
                    message.success(res.msg);
                    // 跳转到响应的页面.
                    // window.open('/#/admin/admin/home','_self');
                })
                
            }
        })
        
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-wrap">
                <div className="login-container">
                    <Form layout="horizontal" style={{width: '450px'}} onSubmit={this.handleSubmit} >
                        <h1 style={{textAlign: 'center'}}>卡狗妹后台管理系统 · 登录</h1>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        },
                                        {
                                            min: 8,
                                            max: 16,
                                            message: '用户名长度为8-16'
                                        },
                                        {
                                            pattern: new RegExp('^\\w+$', 'g'),
                                            message: '用户名必须为字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输出用户名..." />
                                )
                            }

                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: "密码不能为空"
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码..." />
                                )
                            }

                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox style={{float: 'left'}}>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button style={{float: 'left'}} type="primary"  htmlType="submit" >登录</Button>
                        </FormItem>
                    </Form>
                </div>

            </div>
        )
    }
}

export default Form.create()(Login)