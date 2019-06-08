import React from 'react';
import { Button, Card, Modal } from 'antd';
import './index.less'

class Modals extends React.Component {
    constructor() {
        super();
        this.state = {
            showModalOne: false,
            showModalTwo: false,
            showModalThree: false,
            showModalFour: false
        }
    }
    componentWillMount() {

    }
    handleOpen = (type) => {
        //麻烦
        // if(type === 'showModalOne') {
        //     this.setState({
        //         showModalOne: true
        //     })
        // }
        // if(type === 'showModalTwo') {
        //     this.setState({
        //         showModalTwo: true
        //     })
        // }
        // if(type === 'showModalThree') {
        //     this.setState({
        //         showModalThree: true
        //     })
        // }
        // if(type === 'showModalFour') {
        //     this.setState({
        //         showModalFour: true
        //     })
        // }

        // switch (type) {
        //     case 'showModalOne':
        //         this.setState({
        //             showModalOne: true
        //         });
        //         break;
        //     case 'showModalTwo':
        //         this.setState({
        //             showModalTwo: true
        //         });
        //         break;
        //     case 'showModalThree':
        //         this.setState({
        //             showModalThree: true
        //         });
        //         break;
        //     case 'showModalFour':
        //         this.setState({
        //             showModalFour: true
        //         });
        //         break;
        // }
        
        //使用技巧的方式实现.
        this.setState({
            [type]: true
        })
    }
    handleComfim = (type) => {
        // 不需要使用if去判断.
        Modal[type]({
            title: '确认?',
            content: '你确定你学会了React了吗?',
            onOk() {

            },
            onCancel() {

            }
        })
    }
    render() {
        return (
            <div>
                <Card title="基础模态框" className="btnWrap">
                    {/* <Button type="primary" onClick={this.handleOpen('show')}>Open</Button> 这种传参数的方式会调用一次 */}
                    {/* <Button type="primary" onClick={this.handleOpen}>Open</Button> 不传参数的写法 */}
                    <Button type="primary" onClick={() => this.handleOpen('showModalOne')}>Open</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModalTwo')} >自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModalThree')} >顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModalFour')} >水平垂直居中</Button>
                </Card>
                <Card title="信息确认" className="btnWrap">
                    {/* <Button type="primary" onClick={this.handleOpen('show')}>Open</Button> 这种传参数的方式会调用一次 */}
                    {/* <Button type="primary" onClick={this.handleOpen}>Open</Button> 不传参数的写法 */}
                    <Button type="primary" onClick={() => this.handleComfim('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleComfim('info')} >Info</Button>
                    <Button type="primary" onClick={() => this.handleComfim('success')} >Success</Button>
                    <Button type="primary" onClick={() => this.handleComfim('warning')} >Warning</Button>
                </Card>
                <Modal
                    title="React"
                    visible={this.state.showModalOne}
                    onCancel={() => {
                        this.setState({
                            showModalOne: false
                        })
                    }}
                    onOk={() => {
                        this.setState({
                            showModalOne: false
                        })
                    }}
                >
                    欢迎使用张荣杰管理系统
                </Modal>
                <Modal
                    title="Vue"
                    visible={this.state.showModalTwo}
                    okText="好的"
                    cancelText="算了"
                    onCancel={() => {
                        this.setState({
                            showModalTwo: false
                        })
                    }}
                    onOk={() => {
                        this.setState({
                            showModalTwo: false
                        })
                    }}
                >
                    Modal自定义修改页脚
                </Modal>
                <Modal
                    title="Angular"
                    visible={this.state.showModalThree}
                    style={{top: '20px'}}
                    onCancel={() => {
                        this.setState({
                            showModalThree: false
                        })
                    }}
                    onOk={() => {
                        this.setState({
                            showModalThree: false
                        })
                    }}
                >
                    Modal距离顶部20px;
                </Modal>
                <Modal
                    title="BackBone"
                    visible={this.state.showModalFour}
                    onCancel={() => {
                        this.setState({
                            showModalFour: false
                        })
                    }}
                    onOk={() => {
                        this.setState({
                            showModalFour: false
                        })
                    }}
                >
                    Moadl水平垂直居中
                </Modal>
            </div>
        )
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
}
export default Modals;