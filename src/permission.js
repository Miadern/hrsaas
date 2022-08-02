import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token //登录的变量
  //已登录
  if (token) {
    //是否要进入登录页
    if (to.path === '/login') return next('/') //1.是  跳到首页
    next() //2.不是  正常通行
  } else {
    //未登录
    const isCludes = whiteList.includes(to.path)
    //是否在白名单
    if (isCludes) return next() //1.是 正常同行
    next('/login') //2.不是  跳转登录页
  }
})
