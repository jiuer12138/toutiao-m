<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        background="#3396fc"
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="goBack"
        @focus="visibleSearchSuggestion"
      />
    </form>
    <component :is="componentName" :keywords='keywords'></component>
    <!-- <SearchHistory></SearchHistory>
    <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult> -->
  </div>
</template>
<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  data () {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  mounted () {},
  computed: {
    componentName () {
      if (this.keywords.trim() === '') return 'SearchHistory'
      if (this.isShowSearchResult) return 'SearchResult'
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch () {
      this.isShowSearchResult = true
    },
    goBack () {
      this.$router.back()
    },
    visibleSearchSuggestion () {
      this.isShowSearchResult = false
    }
  }
}
</script>
<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
