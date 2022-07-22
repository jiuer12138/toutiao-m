import request from '@/utils/request'
export const getArticleComment = (type, source, offset) =>
  request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset
    }
  })
export const CommenOn = (target, content, id) =>
  request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: id
    }
  })
export const giveALike = (id) =>
  request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: id
    }
  })
export const giveUpTheLike = (id) =>
  request({
    url: `/v1_0/comment/likings/${id}`,
    method: 'DELETE'
  })
