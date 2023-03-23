// 对于axios进行二次封装
import axios from "axios";
import nProgress from "nprogress";
import 'nprogress/nprogress.css';
import store from "@/store";
// 1.利用axios对象的方法create，去创建一个axios实例
// 2.
const requsts = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径中会出现api
    baseURL: 'http://gmall-h5-api.atguigu.cn/api/',
    //代表请求时间超时 
    timeout: '5000',
})

// 添加请求拦截器
requsts.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，header请求头
    // 在发送请求之前做些什么,

    // console.log(store,'pp')
    if(store.state.detail.nanoid_id){
        config.headers.userTempId = store.state.detail.nanoid_id
    }
    // 进度条开始
    nProgress.start()

    return config;
})

// 添加响应拦截器
requsts.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情

    // 进度条结束
    nProgress.done()
    return response.data;
    },(error)=>{
        // 响应失败的回调函数 
        return Promise.reject(new Error('faile'))
        // return Promise.reject(new Promise(()=>{}))
    } )

export default requsts