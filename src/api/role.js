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
