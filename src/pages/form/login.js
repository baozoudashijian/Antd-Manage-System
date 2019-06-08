import React from 'react';
import {Card, Form, Input, Button, Checkbox, Icon, message} from 'antd';
const FormItem = Form.Item;

class FormLogin extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentWillMount() {

    }
    handleSubmit = () => {
        // 点击提交登陆表单的时候获取输入框的值 [获取通过getFieldDecorator的值].
        let userInfo = this.props.form.getFieldsValue();
        console.log(userInfo);
        // 我们需要验证 当所有Input都符合校验规则的时候我们才可以提交;
        this.props.form.validateFields((err,values) => {
            if(!err) {
                message.success(`${userInfo.userName} 恭喜你,完成本次表单校验的规则,当前你的用户名密码为: ${userInfo.userPwd}`);
            }
        })
    }
    render() {
        console.log(this);
        //使用getFieldDecorator去设置输入框的值.
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="登陆行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" >登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登陆水平表单" style={{marginTop: 10}} >
                    <Form style={{width: 300}}>
                        <FormItem>
                            {
                                // 加入getFieldDecorator校验的话,输入框的值改变的话,会一直去重新渲染组件.
                                // 设置校验规则,设置这个输入框的name属性[方便获取输入框的值]
                                getFieldDecorator('userName',{
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        },
                                        {
                                            min: 5,
                                            max: 10,
                                            message: '长度不在范围内'
                                        },
                                        {
                                            pattern:new RegExp('^\\w+$','g'),
                                            message: '用户名必须为字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                                )
                            }                          
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember',{
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit} >登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    
}
// 使用Form.create的方法 this.props多出一个form属性 【调用这个方法暴露出form属性.form属性中存在很多方法符合我们调用.】.
export default Form.create()(FormLogin);

//export default From.create()(); 通过这个方法给当前组件添加配置属性this.props.form
// 修改表单 设置name 设置校验规则通过 getFiledDecorator
// 点击提交表单的时候 去获取Input输入框内的数据 this.props.form.getFieldsValue();
// this.props.form.validateFields 去校验输入框中的值是否符合要求.
