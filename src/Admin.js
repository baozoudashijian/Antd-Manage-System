import React from 'react';
import './Admin.css';
import './style/common.less';
import Header from './components/header';
import Footer from './components/footer';
import NavLeft from './components/navleft';
import Home from './pages/home/';
import { Input,Button,Row,Col } from 'antd';
import 'antd/dist/antd.css';

class Admin extends React.Component {
  render() {
    return (
        <Row className="container">
          <Col span={3} className="nav-left">
            <NavLeft/>
          </Col>
          <Col span={21} className="main">
            <Header>

            </Header>
            <Row className="content"> 
              {/* <Home /> */}
              {this.props.children}
            </Row>
            <Footer>

            </Footer>
          </Col>
        </Row>
    );
  }

}

export default Admin;
