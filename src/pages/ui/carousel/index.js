import React from 'react';
import { Card, Carousel } from 'antd';
import './index.less';

class Carousels extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentWillMount() {

    }
    render() {
        return (
            <div>
                <Card title="文字背景轮播">
                    <Carousel autoplay effect="fade" className="carousel">
                        <div className="car-wrap"><h3>Ant Motion Banner - React</h3></div>
                        <div className="car-wrap"><h3>Ant Motion Banner - Vue</h3></div>
                        <div className="car-wrap"><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>

                <Card title="图片轮播" style={{marginTop: 30}}>
                    <Carousel autoplay effect="fade" className="slider-w">
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" />
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt="" />
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt="" />
                        </div>
                    </Carousel>
                </Card>
            </div >
        )
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
}

export default Carousels;