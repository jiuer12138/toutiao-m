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

/**
 * 验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const sendCode = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`
  })
