import request from '@/utils/request'

export const getArticleList = (channelId, timestamp) =>
  request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
