import React from 'react';
import {Button,Card, notification} from 'antd';
import './index.less';

class Notice extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentWillMount() {

    }
    openNotification = (type,direction) => {
        if(direction) {
            notification.config({
                placement: direction
            })
        }
        notification[type]({
            message: '发工资了',
            description: '生与死轮回不止,我们生,他们死.'
        })
    }
    render() {
        return (
            <div>
                <Card title="通知提醒" className="btnWrap">
                    <Button type="primary" onClick={() => this.openNotification('success')} >Success</Button>
                    <Button type="info" onClick={() => this.openNotification("info")} >Info</Button>
                    <Button type="dashed" onClick={() => this.openNotification("warning")} >Warning</Button>
                    <Button type="danger" onClick={() => this.openNotification("error")} >Error</Button>
                </Card>
                <Card title="通知提醒 · 弹出位置" className="btnWrap">
                    <Button type="primary" onClick={() => this.openNotification('success','topLeft')} >Success</Button>
                    <Button type="info" onClick={() => this.openNotification("info",'topRight')} >Info</Button>
                    <Button type="dashed" onClick={() => this.openNotification("warning",'bottomRight')} >Warning</Button>
                    <Button type="danger" onClick={() => this.openNotification("error",'bottomLeft')} >Error</Button>
                </Card>
            </div>
        )
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
}

export default Notice;