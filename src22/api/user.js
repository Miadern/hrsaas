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

/**
 * 保存员工基本信息
 * @param {*} id
 * @returns
 */
export function saveUserInfoApi(data, id) {
  return request({
    url: '/sys/user/' + id,
    method: 'PUT',
    data,
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
  })
}
