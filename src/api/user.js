import request from '@/utils/request'

/**
 * 登录
 * @param {*} data {mobile,password}
 * @returns
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data,
  })
}

/**
 * 获取用户基本资料
 * @returns
 */
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'post',
  })
}

/**
 * 获取员工基本信息
 * @param {*} id 员工ID
 * @returns
 */
export function getUserDetailApi(id) {
  return request({
    url: '/sys/user/' + id,
  })
}
