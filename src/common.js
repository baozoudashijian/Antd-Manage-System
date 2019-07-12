import React from 'react';
import {Row} from 'antd';
import Header from './components/header';

class Common extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentWillMount() {

    }
    render() {
        const bl = true;
        return (
            <div>
                <Row>
                    <Header nobrandcrumb={bl} userName="胡汉三" />
                </Row>
                <Row>
                    {this.props.children}
                </Row>
            </div>
        )
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
}

export default Common;