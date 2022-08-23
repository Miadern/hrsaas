import { getUserDetailApi, getUserInfoApi, login } from '@/api/user'
import { resetRouter } from '@/router'
import { setTokenTime } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    //获取token
    async getToken(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res)
      setTokenTime()
    },
    //获取用户信息
    async getUserInfo(context) {
      const res = await getUserInfoApi()
      const resDetail = await getUserDetailApi(res.userId)
      context.commit('setUserInfo', { ...res, ...resDetail })
      return res
    },
    //退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      resetRouter()
      context.commit('permission/setRoutes', [], { root: true })
    },
  },
}
