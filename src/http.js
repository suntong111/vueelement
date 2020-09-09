import axios from 'axios'
import { Loading,Message } from 'element-ui';
import router from './router';

let loading;
function startLoading() {
  loading = Loading.service({
      lock: true,
      text:'拼命加载中',
      background: 'rgba(0,0,0,0,7)'
  })
}

function endLoading() {
    loading.close()
}

axios.interceptors.request.use(config=>{
    startLoading();
    //设置统一请求header
    // if (localStorage.eleToken){
    //     config.headers.Authorization = localStorage.eleToken
    // }
    return config;
},
    error => {
    return Promise.reject(error)
    })

axios.interceptors.response.use(response=>{
    endLoading();
    return response;
},error => {
    endLoading();
    Message.error(error.response.data);
    //获取错误状态码
    // if (status === 401){
    //     Message.error('token失效，请重新登陆')
    //     localStorage.removeItem('eleToken')
    //     router.push('/login')
    // }
    return Promise.reject(error)
})

export default axios
