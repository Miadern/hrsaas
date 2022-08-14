import request from '@/utils/request'

/**
 * 获取员工简单列表
 * @returns
 */
export function getEmployeesApi() {
  return request({
    url: '/sys/user/simple',
  })
}

/**
 * 获取员工列表
 */
export function getEmployeesInfoApi(params) {
  return request({
    url: '/sys/user',
    params,
  })
}

/**
 * 删除员工
 */
export function delUser(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE',
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data,
  })
}

/**
 * 批量导入员工
 *
 * **/
export function importEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data,
  })
}
