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

/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserInfo = () =>
  request({
    url: '/v1_0/user'
  })
/**
 * 发送关注的请求
 * @param {String} target 作者id
 * @returns Promise
 */
export const getUserfollowState = (target) =>
  request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: { target }
  })
export const ChangeUserfollowState = (id) =>
  request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })

export const getUserInfoDetails = () =>
  request({
    url: '/v1_0/user/profile'
  })
export const editUserInfoDetails = (name, gender, birthday) =>
  request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      gender,
      birthday
    }
  })
export const ChangeUserAvatar = (fm) =>
  request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
