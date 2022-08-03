import { Message } from 'element-ui'
// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { getTokenTime } from './auth'
import router from '@/router'
const isTimeout = () => {
  //判定token是否过期
  const nowTime = Date.now()
  const oldTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  return nowTime - oldTime > timeout
}

const service = axios.create({
  //   baseURL: 'http://localhost:8888/api',
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}) // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    if (isTimeout()) {
      //如果进入这里说明token超时，跳转回login
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
}) // 请求拦截器

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
  async function (err) {
    //响应错误进入
    if (err?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(err.message)
    }

    return Promise.reject(err)
  },
)
export default service // 导出axios实例
