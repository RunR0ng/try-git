/**
 * axios二次封装
 */
import axios from 'axios'
import config from './../config'
import {ElMessege} from 'element-plus'
import router from './../router'
const TOKEN_INVALID='Token认证失效，请重新登陆'
const NETWORK_ERROR='网络环境异常，请稍后重试'

// 创建axios对象
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000
})

// 请求拦截
service.interceptors.request.use((req)=>{
    const headers = req.headers;
    if(!headers.Authorization) headers.Authorization = 'Iris';
    return req;
})

// 响应拦截
service.interceptors.response.use((res)=>{
    const { code, data, msg} = res.data;
    if(code===200){
        return data;
    }else if(code===40001){
        ElMessege.error(TOKEN_INVALID)
        setTimeout(()=>{
            router.push('/login')
        },15000)
        return Promise.reject(TOKEN_INVALID)
    }else{
        ElMessege.error(msg || NETWORK_ERROR)
        return Promise.reject(msg||NETWORK_ERROR)
    }
})

// 请求的核心函数封装
function request(options){
    options.method = options.method || 'get'
    if(options.method.toLowerCase()==='get'){
        options.params = options.data;
    }
    if(config.env === 'prod'){
        service.defaults.baseURL = config.baseApi
    }else{
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}

export default request;