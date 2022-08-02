import { getUserDetailApi, getUserInfoApi, login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: '',
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
    },
    //获取用户信息
    async getUserInfo(context) {
      const res = await getUserInfoApi()
      const resDetail = await getUserDetailApi(res.userId)
      context.commit('setUserInfo', { ...res, ...resDetail })
    },
  },
}
