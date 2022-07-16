<template>
  <div>
    <!-- 头部导航按钮 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round>
          <van-icon name="search" />
          搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 标签页 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in MyChanners" :key='item.id'>
      <ArticleList :id='item.id'></ArticleList>
      </van-tab>
      <span class="iconfont icon-gengduo"></span>
    </van-tabs>
  </div>
</template>
<script>
import { getMyChannels } from '@/api/channels'
import ArticleList from '@/components/ArticleList.vue'
export default {
  name: 'Home',
  data () {
    return {
      active: 2,
      MyChanners: []
    }
  },
  created () {
    this.getMyChannels()
  },
  components: { ArticleList },
  mounted () {},
  computed: {},
  methods: {
    async getMyChannels () {
      try {
        const { data: { data } } = await getMyChannels()
        this.MyChanners = data.channels
        console.log(this.MyChanners)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang="less">
//头部搜索
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 278px;
    height: 32px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//标签页css样式
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 33px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 100px;
      height: 41;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 16px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
}

/* 字体图标 */
.icon-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 33px;
  height: 41px;
  font-size: 20px;
  line-height: 41px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/image/gradient-gray-line.png');
  }
}
</style>
