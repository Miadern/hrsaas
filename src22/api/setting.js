import request from '@/utils/request'

/**
 * 根据id查询企业
 *
 */
export function getCompanyInfoApi(id) {
  return request({
    url: `/company/${id}`,
  })
}
