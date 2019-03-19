import Vue from 'vue';
import { Message } from 'element-ui';
import axios from 'axios'
import qs from 'qs'
import baseUrl from './baseurl'
console.log('baseUrl: ', baseUrl);

// const { PREFIX } = process.env
// console.log('process.env: ',  JSON.stringify(process.env));


axios.defaults.timeout =  60000;
axios.defaults.baseURL = baseUrl
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token');
// const baseURL = process.env.baseURL
console.log('process.env: ', process.env);
// console.log('baseURL: ', baseURL);


axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(config.method === 'post'){
    config.data = qs.stringify(config.data)
  }
  // config.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get("BOBLOG_ADMIN_TOKEN");
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

export class http {
    static handleSuccess(respond) {
        const { data, status } = respond
        if (status >= 200 && status < 400) {
          if(data.code!=0) {
            Message({
              message: data.msg,
              type: 'warning'
            });
          }
            return data
        }
    }
    static handleError(respond) {
      Message({
        message: '网络繁忙, 请重试...',
        type: 'warning'
      });
      return new Error()
    }
    static get(url, data) {
        return axios.get(url, {params: data}).then(this.handleSuccess).catch(err=>this.handleError)
    }
    static post(url, data) {
        return axios.post(url, data).then(this.handleSuccess).catch(this.handleError)
    }
}

export const getDate = (time)=> {
    var now = new Date(time),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}
