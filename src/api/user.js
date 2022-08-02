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
