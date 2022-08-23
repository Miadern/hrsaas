import router, { constantRoutes, asyncRouters } from '@/router'

router
export default {
  namespaced: true,
  state: {
    routes: [],
    point: [],
  },
  mutations: {
    setRoutes(state, newRoute) {
      state.routes = [...constantRoutes, ...newRoute]
    },
    setPoint(state, payload) {
      state.point = payload
    },
  },
  actions: {
    filterRoutes(context, roles) {
      const newRoute = asyncRouters.filter((item) => {
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRoutes', newRoute)
      context.commit('setPoint', roles.points)
      router.addRoutes([
        ...newRoute,
        { path: '*', redirect: '/404', hidden: true },
      ])
    },
  },
}
