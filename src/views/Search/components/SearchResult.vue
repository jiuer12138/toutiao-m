<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="(item, index) in resultsList"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { getSearchResult } from '@/api/search'
export default {
  data () {
    return {
      resultsList: [],
      page: 1,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  props: {
    keywords: {
      type: [String, Number],
      required: true
    }
  },
  components: {},
  created () {
    this.getSearchResults()
  },
  computed: {},
  methods: {
    async onLoad () {
      this.page++
      this.getSearchResults()
    },
    async getSearchResults () {
      try {
        const res = await getSearchResult(this.keywords, this.page)
        if (res.data.data.results.length === 0) {
          this.finished = true
          this.$toast.fail('没有更多内容~~')
        }
        if (this.refreshing) {
          this.resultsList = [...res.data.data.results, ...this.resultsList]
        } else {
          if (this.loading) {
            this.resultsList = [...this.resultsList, ...res.data.data.results]
          } else {
            this.resultsList = res.data.data.results
          }
        }
        this.loading = false
        this.refreshing = false
        // console.log(res.data.data.results)
      } catch (error) {
        console.log(error)
      }
    },
    onRefresh () {
      this.page++
      this.getSearchResults()
    }
  }
}
</script>
<style scoped></style>
