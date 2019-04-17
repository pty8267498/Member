// axios 接口设置
// import apiConfig from './api.config'
import axios from 'axios';
import router from '../router'
import qs from 'qs';
import { Loading, Message, MessageBox } from 'element-ui'


// 创建一个axios实例 接口统一处理
const service = axios.create({
  // baseURL: apiConfig.baseUrl,   // 接口地址
  // baseURL: process.env.API_ROOT,   // 接口地址
  timeout: 5000 // request timeout
})

// 请求拦截器
var loadinginstace;
service.interceptors.request.use(config => {
  	//  在请求之前做判断
    const token = localStorage.getItem('token');
    config.data = qs.stringify(config.data);
    // config.withCredentials = true;
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    // config.headers['Access-Control-Allow-Origin'] = '*';
  	loadinginstace = Loading.service({ fullscreen: true }); // 显示loading
  	config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type':'application/json' //设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
    };
	if (token) {
		config.headers['token'] = token;
	    // config.headers['X-Token'] = 'getToken()' // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
	}
	return config
}, error => {
  	// Do something with request error 请求错误后做
  	loadinginstace.close();
 	  Message.error({message: '请求超时'});
  	console.log(error) // for debug
  	return Promise.reject(error)
})
// respone interceptor  http 响应拦截器
service.interceptors.response.use(function (response) {
  const res = response.data;
	if (res.Code !== 200) {
		Message({
		  message: res.Message,
		  type: 'error',
		  duration: 5 * 1000
		});
    loadinginstace.close();
    router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
    })
		// 50008:非法的token; 100311:用户名不存在;  100310/500001: 用户未登录或没有权限; 500002: 异地登录
		// if (res.code === "100310" || res.code === '100311' || res.code === '500001' || res.code === '500002') {
		// 	router.replace({
    //             path: '/login',
    //             query: {redirect: router.currentRoute.fullPath}
    //         })
		// }
		return response.data;
//		return Promise.reject('error');
	} else {
		loadinginstace.close();
		return response.data;
	}
}, function (error) {
	console.log('err' + error.message)// for debug
	return Promise.reject(error)
})

export default service
