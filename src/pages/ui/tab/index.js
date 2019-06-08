import React from 'react';
import { Tabs, Icon, Card, message } from 'antd';
import './index.less';
const TabPane = Tabs.TabPane;


class Tab extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    newTabIndex = 0;
    componentWillMount() {
        const panes = [
            {
                title: '华晨宇',
                content: '烟火里的尘埃',
                key: '1'
            },
            {
                title: '林俊杰',
                content: '不为谁而作的歌',
                key: '2'
            },
            {
                title: '邓紫棋',
                content: '光年之外',
                key: '3'
            }
        ];
        this.setState({
            activeKey: panes[0].key,
            panes
        })
    }
    handleCallback = (key) => {
        // 会默认传入一个key值.
        message.info("你选择了一种水果" + key);
    }
    onChange = (activeKey) => {
        message.success('选择一个你喜欢的明星' + activeKey);
        this.setState({
            activeKey
        })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="3" onChange={this.handleCallback}>
                        <TabPane tab="苹果" key="1" disabled>苹果乐园🍎</TabPane>
                        <TabPane tab="香蕉" key="2" >香蕉乐园🍌</TabPane>
                        <TabPane tab="葡萄" key="3" >葡萄乐园🍇</TabPane>
                        <TabPane tab="橘子" key="4" >橘子乐园🍊</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback} >
                        <TabPane tab={<span><Icon type="plus" />青菜</span>} key="1" >新鲜蔬菜: 青菜</TabPane>
                        <TabPane tab={<span><Icon type="edit" />萝卜</span>} key="2" >新鲜蔬菜: 萝卜</TabPane>
                        <TabPane tab={<span><Icon type="delete" />茄子</span>} key="3" >新鲜蔬菜: 茄子🍆</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab动态页签">
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel) => {
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}
                                >{panel.content}</TabPane>
                            })
                        }

                    </Tabs>
                </Card>

            </div>
        )
    }

}

export default Tab;