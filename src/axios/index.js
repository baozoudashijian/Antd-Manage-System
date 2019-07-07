import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';

export default class Axios {
    static jsonp(options) {
        return new Promise((resolve,reject) => {
            JsonP(options.url,{
                param: 'callback'
            },function(err,response) {
                if(response.status == '1') {
                    resolve(response);
                }else {
                    reject(response.info);
                }
            })
        });
    }

    static ajax(options) {
        let loading;
        if(options.data && options.data.showLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = "https://www.easy-mock.com/mock/5d1d9e63a433ef460b0cad7b/api";
        return new Promise((resolve, reject) =>{
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if(options.data && options.data.showLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status == 200) {
                    let res = response.data;
                    console.log(response);
                    if(res.code == '0') {
                        resolve(res);
                    }else{
                        // 二次封装 方便做loading; 错误拦截处理;
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        })
    }

    static salary(options) {
        let loading;
        if(options.data && options.data.showLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise((reslove,reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if(options.data && options.data.showLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status == '200') {
                    let res = response.data;
                    if(res.code == '0') {
                        reslove(res);
                    }else{
                        Modal.info({
                          title:'提示',
                          content: res.msg  
                        })
                    }
                }
            })
        })
    }

}