import JsonP from 'jsonp';

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
}