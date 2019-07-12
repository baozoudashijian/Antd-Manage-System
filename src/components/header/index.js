import React from 'react';
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils/utils';
import axios from '../../axios';

class Header extends React.Component {
    static defaultProps = {
        userName: '张荣杰'
    }
    state = {
        sysTime: ''
    }
    componentWillMount() {
        
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());

            this.setState({
                sysTime
            })
        }, 1000);
        this.getWeatherAPIData();
    }
    getWeatherAPIData() {
        let city = "北京";

        axios.jsonp({
            url: 'https://restapi.amap.com/v3/weather/weatherInfo?city=' + encodeURIComponent(city) + '&key=3899a6bb87abc703105b4257e530e94f'
        }).then((res) => {
            if (res.status == '1') {
                let data = res.lives[0];
                console.log(data);
                this.setState({
                    province: data.province,
                    weather: data.weather
                })
            }
        })
    }
    render() {
        const hasBrandCrumb = this.props.nobrandcrumb;
        return (
            <div className="header">
                {console.log(hasBrandCrumb)}
                <Row className={'header-top ' + (hasBrandCrumb ? 'header-top-bg': '') } >
                    {
                        hasBrandCrumb ? 
                            <Col span={12} style={{textAlign: 'left'}}>
                                <img className="logo" src="/assets/logo-ant.svg" alt="" />
                                <span className="sign">卡狗妹后台管理系统</span>
                            </Col>
                            :''

                    }
                    
                    <Col span={hasBrandCrumb ? 12 : 24}>
                        {console.log(this.props)}
                        <span>欢迎，{this.props.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    hasBrandCrumb ? '' :
                        <Row className="brandcrumb" >
                            <Col span={4} className="breadcrumb-title">
                                首页
                            </Col>
                            <Col span={20} className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-img">
                                    {this.state.province}
                                </span>
                                <span className="weather-detail">{this.state.weather}</span>
                            </Col>
                        </Row>
                        
                }
            </div>
        )
    }
}

export default Header;