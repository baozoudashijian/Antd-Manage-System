import React from 'react';
import { Button, Card, message } from 'antd';

class Message extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }
    componentWillMount() {

    }
    showMessage = (type) => {
        message[type]("恭喜你,React课程晋级成功！") 
    }
    render() {
        return (
            <div>
                <Card title="全局提示框" className="btnWrap">
                    <Button type="primary" onClick={() => this.showMessage('success')} >Success</Button>
                    <Button type="info" onClick={() => this.showMessage('info')} >Info</Button>
                    <Button type="dotted" onClick={() => this.showMessage('warning')} >Warning</Button>
                    <Button type="danger" onClick={() => this.showMessage('error')} >Danger</Button>
                    <Button type="primary" onClick={() => this.showMessage('loading')} >Loading</Button>
                </Card>
            </div>
        )
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }

}

export default Message;