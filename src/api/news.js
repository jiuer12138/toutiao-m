import request from '@/utils/request'

export const getArticleList = (channelId, timestamp) =>
  request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
export const getArticleDetails = (id) =>
  request({
    url: `/v1_0/articles/${id}`
  })
export const getArticleCollect = (target) =>
  request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: { target }
  })
export const ChangeArticleCollect = (id) =>
  request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })
export const getArticleAttitude = (target) =>
  request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: { target }
  })
export const ChangeArticleAttitude = (id) =>
  request({
    url: `/v1_0/article/likings/${id}`,
    method: 'DELETE'
  })
