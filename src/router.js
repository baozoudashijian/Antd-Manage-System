import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App.js';
import Admin from './Admin';
import Common from './common';
import Login from './pages/login';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loading from './pages/ui/loading';
import Notice from './pages/ui/notice';
import Message from './pages/ui/message';
import Tab from './pages/ui/tab';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FromLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city';
import Order from './pages/order';
import OrderDetail from './pages/order/detail';
import NoMatch from './pages/nomatch';
import Home from './pages/home';

class IRouter extends React.Component {

    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/admin" render={() => 
                            <Admin>
                                <Switch>
                                    <Route path="/admin" exact component={Home} />
                                    <Route path="/admin/admin/home"  component={Home} />
                                    <Route path="/admin/ui/buttons" component={Buttons} />
                                    <Route path="/admin/ui/modals" component={Modals} />
                                    <Route path="/admin/ui/loadings" component={Loading} />
                                    <Route path="/admin/ui/notification" component={Notice} />
                                    <Route path="/admin/ui/message" component={Message} />
                                    <Route path="/admin/ui/tabs" component={Tab} />
                                    <Route path="/admin/ui/gallery" component={Gallery} />
                                    <Route path="/admin/ui/carousel" component={Carousels} />
                                    <Route path="/admin/form/login" component={FromLogin} />
                                    <Route path="/admin/form/reg" component={FormRegister} />
                                    <Route path="/admin/table/basic" component={BasicTable} />
                                    <Route path="/admin/table/high" component={HighTable} />
                                    <Route path="/admin/city" component={City} />
                                    <Route path="/admin/order" component={Order} />
                                    <Route component={NoMatch} />
                                </Switch> 
                            </Admin>
                        } />
                        <Route path="/common" render={() =>
                            <Common>
                                <Switch>
                                    <Route path="/common/order/detail/:orderId" component={OrderDetail}  />
                                </Switch>
                            </Common>
                        } />
                        <Route component={NoMatch} component={NoMatch} />
                    </Switch>
                </App>
            </HashRouter>
            )
    }
}

export default IRouter;