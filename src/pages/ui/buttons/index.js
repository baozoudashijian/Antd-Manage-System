import React from 'react';
import { Button, Card, Icon, Radio } from 'antd';
import './index.less';

class Buttons extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            size: 'default'
        }
    }
    handle = () => {
        this.setState({
            loading: !this.state.loading
        })
    }
    handleRadio = (e) => {
        console.log(e.target.value);
        this.setState({
            size: e.target.value
        })
    }
    render() {
        return (
            <div>
                <Card title="基础按钮" className="btnWrap">
                    <Button type="primary">ZRJms</Button>
                    <Button>ZRJms</Button>
                    <Button type="dashed"> ZRJms</Button>
                    <Button disabled>ZRJms</Button>
                </Card>

                <Card title="图形按钮" className="btnWrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search" ></Button>
                    <Button type="primary" icon="search" ></Button>
                    <Button type="primary" icon="search" >搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>

                <Card title="loading按钮" className="btnWrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handle}>关闭</Button>
                </Card>

                <Card title="按钮组">
                    <Button.Group>
                        <Button type="primary">
                            <Icon type="left"></Icon>
                            返回
                        </Button>
                        <Button type="primary">
                            前进
                            <Icon type="right"></Icon>
                        </Button>
                    </Button.Group>
                </Card>

                <Card title="按钮尺寸" className="btnWrap">
                    <Radio.Group value={this.state.size} onChange={this.handleRadio}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>ZRJms</Button>
                    <Button type="primary" size={this.state.size}>ZRJms</Button>
                    <Button type="dashed" size={this.state.size}>ZRJms</Button>
                    <Button type="danger" size={this.state.size}>ZRJms</Button>
                </Card>

                <Card title="按钮尺寸" className="btnWrap">
                    <Radio.Group value={this.state.size} onChange={this.handleRadio}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>ZRJms</Button>
                    <Button type="primary" size={this.state.size}>ZRJms</Button>
                    <Button type="dashed" size={this.state.size}>ZRJms</Button>
                    <Button type="danger" size={this.state.size}>ZRJms</Button>
                </Card>

                <Card title="按钮尺寸" className="btnWrap">
                    <Radio.Group value={this.state.size} onChange={this.handleRadio}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>ZRJms</Button>
                    <Button type="primary" size={this.state.size}>ZRJms</Button>
                    <Button type="dashed" size={this.state.size}>ZRJms</Button>
                    <Button type="danger" size={this.state.size}>ZRJms</Button>
                </Card>

            </div>
        )
    }
}

export default Buttons;