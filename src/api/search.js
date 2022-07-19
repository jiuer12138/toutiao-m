import request from '@/utils/request'

/**
 * 关键词
 * @param {String} q 关键词
 * @returns Promise
 */
export const getSearchSuggestion = (q) =>
  request({
    url: '/v1_0/suggestion',
    params: { q }
  })
