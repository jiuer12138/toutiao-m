<template>
  <div @click="chooseArticle(articleInfo.art_id)">
    <!-- 没有图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="tags"
    />

    <!-- 一张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="tags"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>

    <!-- 三张图片 -->
    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          />
          <span>{{ tags }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
export default {
  data () {
    return {}
  },
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  components: {},
  mounted () {},
  computed: {
    tags () {
      const art = this.articleInfo
      const time = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${time}`
    }
  },
  methods: {
    chooseArticle (id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>
<style scoped></style>
