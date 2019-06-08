import React from 'react';
import { Button, Card, Spin, Icon, Alert } from 'antd';

class Loading extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }
    componentWillMount() {

    }
    render() {
        const icon = <Icon type="loading" />
        return (
            <div>
                <Card title="Spin用法">
                    <Spin size="small" style={{ marginRight: '30px' }} />
                    <Spin style={{ marginRight: '30px' }} />
                    <Spin size="large" style={{ marginRight: '30px' }} />
                    <Spin size="large" indicator={icon} style={{ marginRight: '30px' }} />
                </Card>
                <Card title="内容遮罩">
                    <Alert
                        message="React"
                        description="学习react高级课程"
                        type="info"
                    />
                    <Spin>
                        <Alert
                            message="Vue"
                            description="学习Vue高级课程"
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="Angular"
                            description="学习Angular高级课程"
                            type="danger"
                        />
                    </Spin>
                    <Spin tip="加载中..." indicator={icon}>
                        <Alert
                            message="BackBone"
                            description="学习BackBone高级课程"
                            type="primary"
                        />
                    </Spin>

                </Card>
                
            </div>
        )
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
}
export default Loading;