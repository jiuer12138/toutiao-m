import request from '@/utils/request'

/**
 * 登录
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) =>
  request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: { mobile, code }
  })
