import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
//设置token获取的时间
export function setTokenTime() {
  Cookies.set('tokenTime', Date.now())
}
//获取token当时的时间
export function getTokenTime() {
  return Cookies.get('tokenTime')
}
