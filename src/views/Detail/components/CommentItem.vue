<template>
  <div>
    <van-cell
      v-for="(item, index) in commentlist"
      :key="index"
      :title="item.aut_name"
    >
      <div @click="giveALike(item)">
        <van-icon name="good-job" v-show="item.is_liking" />
        <van-icon name="good-job-o" v-show="!item.is_liking" />
        <span
          class="like-count"
          :class="{ active: item.is_liking  }"
          v-if="item.like_count === 0"
          >赞</span
        >
        <span v-else :class="{ active: item.is_liking }">{{ item.like_count }}</span>
      </div>
      <template #icon>
        <van-image
          width="1rem"
          height="1rem"
          round
          :src="item.aut_photo"
          class="comment-avatar"
        />
      </template>
      <template #label>
        <p class="comment-content">{{ item.content }}</p>
        <p>
          <span class="comment-pubdate">{{ Time(item.pubdate) }}</span
          ><van-button class="reply-btn" round @click="replyFn(item)"
            >回复<span>{{ item.reply_count }}</span></van-button
          >
        </p>
      </template>
    </van-cell>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
import { giveALike, giveUpTheLike } from '@/api/comment'
export default {
  data () {
    return {
    }
  },
  props: {
    commentlist: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  mounted () {},
  computed: {
    Time () {
      return function (pubdate) {
        return dayjs(pubdate).fromNow()
      }
    }
  },
  methods: {
    replyFn (item) {
      const id = item.com_id
      const count = item.reply_count
      console.log(count)
      this.$emit('showPopup', id, count)
    },
    async giveALike (item) {
      console.log(item)
      if (item.is_liking) {
        const res = await giveUpTheLike(item.com_id)
        console.log(res)
      } else {
        const res = await giveALike(item.com_id)
        console.log(res)
      }
      this.isLike = !this.isLike
      this.$emit('giveALike')
    }
  }
}
</script>
<style scoped lang="less">
.van-cell {
  height: 118px;
}
.van-cell__title {
  color: #406599;
  font-size: 0.34667rem;
}
.comment-avatar {
  margin-right: 0.33333rem;
}
.comment-content {
  font-size: 0.42667rem;
  color: #222;
  word-break: break-all;
  text-align: justify;
}
.comment-pubdate {
  font-size: 0.25333rem;
  color: #222;
  margin-right: 0.33333rem;
}
.reply-btn {
  width: 1.8rem;
  height: 0.64rem;
  line-height: 0.64rem;
  font-size: 0.28rem;
  color: #222;
}
.like-count {
  color: #323233;
}
.van-icon {
  color: #323233;
}
.van-icon-good-job:before {
  color: rgb(50, 150, 250);
}
.active {
  color: rgb(50, 150, 250);
}
</style>
