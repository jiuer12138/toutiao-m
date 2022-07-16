<template>
   <div>
    <router-view></router-view>
    <van-tabbar route class='TabBar'>
  <van-tabbar-item  to='/ '>首页
   <template #icon>
   <span class="iconfont icon-shouye"></span>
   </template>
  </van-tabbar-item>
   <van-tabbar-item  to='/video'>视频
   <template #icon>
   <span class="iconfont icon-shipin"></span>
   </template>
  </van-tabbar-item>
    <van-tabbar-item  to='/qa'>问答
   <template #icon>
   <span class="iconfont icon-wenda"></span>
   </template>
  </van-tabbar-item>
    <van-tabbar-item  to='/profile'>{{!!this.$store.state.user.token ? '我的': '未登录'}}
   <template #icon>
   <span class="iconfont icon-wode"></span>
   </template>
  </van-tabbar-item>
</van-tabbar>
   </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  mounted () {

  },
  computed: {

  },
  methods: {

  }
}
</script>
<style scoped lang='less'>
.TabBar {
  .iconfont{
    font-size: 20px;
  }
}

</style>
