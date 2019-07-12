import React from 'react';
import { Card } from 'antd';
import axios from '../../axios';
import './detail.less';

class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            orderInfo: {}
        }
    }
    componentWillMount() {
        //获得传递过来的参数ID
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId);
        }
    }
    getDetailInfo = (orderId) => {
        axios.salary({
            url: '/order/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then((res) => {
            console.log(res);
            this.setState({
                orderInfo: res.result
            });
            this.renderMap(res.result);
        })
    }
    // 渲染出地图
    // 单车上有SIM卡会实时向服务器发送位置信息,然后服务器发送给前台前台根据位置信息不停的去改变位置.
    // 1.我们引进js是在index.html的script标签[并不是npm安装import引入的方式]下引入.
    renderMap = (result) => {
        // 调用这个两步会出现地图.
        this.map = new window.BMap.Map('orderDetailMap');
        // this.map.centerAndZoom('北京', 11);
        // 给地图添加上控件
        this.addMapControl();
        // 绘制起点到终点.
        this.drawBikeRoute(result.position_list);
        // 绘制单车服务区
        this.drawServiceArea(result.area);
    }
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }))
        map.enableScrollWheelZoom(); // 添加鼠标
        console.dir(map);
    }
    drawBikeRoute = (positionList) => {
        let startPoint = '';
        let endPoint = '';
        console.log(positionList);
        if(positionList.length > 0) {
        let first = positionList[0];
        let last = positionList[positionList.length - 1];
        // 开始的位置
        startPoint = new window.BMap.Point(first.lon, first.lat);
        let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        });
        // 结束的位置
        endPoint = new window.BMap.Point(last.lon, last.lat);
        let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        let startMarker = new window.BMap.Marker(startPoint, {icon: startIcon});
        let endMarker = new window.BMap.Marker(endPoint, {icon: endIcon});
        this.map.addOverlay(startMarker); // 进行到这一步才能在地图上看到点.
        this.map.addOverlay(endMarker);

        // 起点绘制到终点.
        let trackPoint = [];
        for(let i=0; i<positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        let polyline = new window.BMap.Polyline(trackPoint, {
            strokeColor: '#1869AD',
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyline);
        this.map.centerAndZoom(endPoint, 13);
    }

}
// 绘制服务区
drawServiceArea = (positionList) => {
        let trackPoint = [];
        for(let i=0; i<positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        });
        this.map.addOverlay(polygon);
}
render() {
    // 拿到请求参数id去请求详细信息,展示在页面上.
    return (
        <div>
            <Card>
                <div id="orderDetailMap" className="order-map"></div>
                <div className="detail-items">
                    <div className="item-title">基础信息</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">用车模式:</div>
                            <div className="detail-form-content">{this.state.orderInfo.mode == 1 ? '服务区' : '停车点'}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">订单编号:</div>
                            <div className="detail-form-content">{this.state.orderInfo.order_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">车辆编号:</div>
                            <div className="detail-form-content">{this.state.orderInfo.bike_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">用户姓名:</div>
                            <div className="detail-form-content">{this.state.orderInfo.user_name}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">手机号码:</div>
                            <div className="detail-form-content">{this.state.orderInfo.mobile}</div>
                        </li>
                    </ul>
                </div>

                <div className="detail-items">
                    <div className="item-title">行驶轨迹</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">行程起点</div>
                            <div className="detail-form-content">{this.state.orderInfo.start_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行程终点</div>
                            <div className="detail-form-content">{this.state.orderInfo.end_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行驶里程</div>
                            <div className="detail-form-content">{this.state.orderInfo.distance / 1000}公里</div>
                        </li>
                    </ul>
                </div>
            </Card>
        </div>
    )
}
componentDidMount() {

}
componentWillUnmount() {

}
}
export default Detail;