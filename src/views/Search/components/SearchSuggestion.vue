<template>
  <div>
    <van-cell
      icon="search"
      center
      v-for="(item, index) in highlight"
      :key="index"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestion } from '@/api/search'
export default {
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: [String, Number],
      required: true
    }
  },
  components: {},
  watch: {
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    }
  },
  computed: {
    highlight () {
      const reg = new RegExp(this.keywords, 'gi')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  },
  methods: {
    async getSearchSuggestion () {
      try {
        const res = await getSearchSuggestion(this.keywords)
        if (res.data.data.options.length === 0) {
          return this.$toast.fail('没有搜索建议')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped></style>
