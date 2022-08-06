import request from '@/utils/request'
/**
 * 获取组织架构数据
 * @returns
 */
export function getDeptsApi() {
  return request({
    url: '/company/department',
  })
}

/**
 * 根据ID删除部门
 * @param {*} id 部门ID
 * @returns
 */
export function delDeptsApi(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE',
  })
}

/**
 * 新增部门
 * @param {*} data 部门编码,介绍,负责人名称,部门名称,父级部门ID
 * @returns
 */
export function addDeptsApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data,
  })
}

/**
 * 根据ID查询部门详情
 * @param {*} id 部门ID
 * @returns
 */
export function getDeptByIdApi(id) {
  return request({
    url: '/company/department/' + id,
    method: 'GET',
  })
}

/**
 * 根据ID修改部门详情
 * @param {*} id
 * @returns
 */
export function editDeptByIdApi(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data,
  })
}
