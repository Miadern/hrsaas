import request from '@/utils/request'

/**
 *获取所有角色列表
 */
export function getRoleApi(params) {
  return request({
    url: '/sys/role',
    params,
  })
}

/**
 * 添加角色
 */
export function addRoleApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data,
  })
}

/**
 * 根据ID获取角色详情
 * @param {*} id
 * @returns
 */
export function getRoleInfoApi(id) {
  return request({
    url: `/sys/role/${id}`,
  })
}

/**
 * 给角色分配权限
 * @param {*} data
 * @returns
 */
export function editRoleInfoApi(data) {
  return request({
    url: `/sys/role/assignPrem`,
    method: 'PUT',
    data,
  })
}
