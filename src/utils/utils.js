import { Pagination } from "antd";

export default {
    // 序列化时间戳 
    formateDate(time) {
        if(!time) return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() +'\xa0'+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },

    // 分页 [注: 分页不对的问题是返回数据不正确的问题,因为easymock数据是随机生成数据的.]
    pagination(data,callback) {
        console.log(data, callback);
        return {
            onChange: (current)=>{
                callback(current);
            },
            current: data.result.page,
            pageSize:data.result.page_size,
            total: data.result.total_count,
            showTotal: () => {
                return `共${data.result.total_count}条`
            },
            showQuickJumper: true
        }
    }
}