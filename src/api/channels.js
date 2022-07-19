import request from '@/utils/request'
import storage from '@/utils/strorage'

export const getMyChannels = () =>
  request({
    url: '/v1_0/user/channels'
  })
export const getAllChannels = () =>
  request({
    url: '/v1_0/channels'
  })

export const DelChannels = (target) =>
  request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
export const addChannels = (id, seq) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })

const CHANNELS_KEY = 'MY_CHANNELS'
export const getMyChannelsList = () => storage.get(CHANNELS_KEY)
export const setMyChannelsList = (channel) => storage.set(CHANNELS_KEY, channel)
