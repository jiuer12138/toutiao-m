import request from '@/utils/request'

export const getMyChannels = () =>
  request({
    url: '/v1_0/user/channels'
  })
