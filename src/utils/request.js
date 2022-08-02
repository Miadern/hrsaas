import { Message } from 'element-ui'
// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
const service = axios.create({
  //   baseURL: 'http://localhost:8888/api',
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}) // 创建一个axios的实例
service.interceptors.request.use() // 请求拦截器

// 响应拦截器,第一个参数为成功的回调，第二个为失败的回调
service.interceptors.response.use(
  (res) => {
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  function (err) {
    Message.error('服务器异常')
    return Promise.reject(err)
  },
)
export default service // 导出axios实例
