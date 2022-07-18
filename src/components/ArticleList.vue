<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onLoad" success-text="刷新成功">
    <van-list
    v-model='loading'
    :finished='finished'
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  @load="onLoad"
  :immediate-check='false'
>
 <ArticleItem v-for="item in articleList" :key="item.art_id" :articleInfo='item'></ArticleItem>
</van-list>
</van-pull-refresh>
  </div>
</template>
<script>
import { getArticleList } from '@/api/news'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'Article',
  data () {
    return {
      articleList: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  props: {
    id: {
      required: true,
      type: [String, Number]
    }
  },
  components: {
    ArticleItem
  },
  created () {
    this.getArticleList()
  },
  computed: {

  },
  methods: {
    async getArticleList () {
      try {
        const res = await getArticleList(this.id, Date.now())
        // console.log(res)
        this.pre_timestamp = res.data.data.pre_timestamp
        this.articleList = res.data.data.results
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('服务器繁忙，请稍后再试！！')
        }
      }
    },
    async onLoad () {
      try {
        if (Math.random() < 0.5) {
          throw new Error('请求失败，点击重新加载')
        }
        const res = await getArticleList(this.id, this.pre_timestamp)
        if (!res.data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshing) {
          this.articleList.unshift(...res.data.data.results)
        } else {
          this.articleList.push(...res.data.data.results)
        }
        this.pre_timestamp = res.data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>
<style scoped>

</style>
