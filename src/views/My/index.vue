<template>
  <div class='my'>
    <!-- 头部 -->

    <header class="banner">
      <!-- 登录状态 -->

      <div v-if="isLogin" class="user-info">
        <van-row></van-row>
        <van-row class="row-2">
          <van-col span="12">
            <van-row class="left-col">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{userInfo.name}}</span>
            </van-row>
          </van-col>

          <van-col span="12">
            <van-row class="code-row">
              <van-button class="code-btn"> 编辑资料 </van-button>
            </van-row>
          </van-col>
        </van-row>

        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon> {{userInfo.art_count}} </template>
            </van-grid-item>

            <van-grid-item text="粉丝">
              <template #icon> {{userInfo.fans_count}} </template>
            </van-grid-item>

            <van-grid-item text="关注">
              <template #icon> {{userInfo.follow_count}} </template>
            </van-grid-item>

            <van-grid-item text="获赞">
              <template #icon> {{userInfo.like_count}} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>

      <!-- 未登录状态 -->

      <div v-else class="login-message" @click="toLogin">
        <img src="../../assets/image/mobile.png" alt="">
        <p :contentEditable='false'>登录 / 注册</p>
      </div>
    </header>

    <!-- 主体 -->

    <main>
      <van-grid column-num=2 clickable class='grid'>
  <van-grid-item  text="收藏">
    <template #icon>
       <span class="iconfont icon-shoucang"></span>
    </template>
  </van-grid-item>
  <van-grid-item  text="历史">
    <template #icon>
       <span class="iconfont icon-lishi"></span>
    </template>
  </van-grid-item>
</van-grid>
<div>
  <van-cell-group>
  <van-cell title="消息通知"  is-link/>
  <van-cell title="小智同学"  is-link />
</van-cell-group>
</div>
    </main>

    <!-- 退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logout">退出</van-button>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user'
export default {
  name: '',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {},
  computed: {
    // 标识是否登录
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '提示',
        message: '确认要退出吗'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    toLogin () {
      this.$router.push('/login')
    },
    async getUserInfo () {
      if (this.isLogin) {
        try {
          const { data: { data } } = await getUserInfo()
          this.userInfo = data
        } catch (error) {
          this.$toast.fail('登录失败')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.my{
  background-color:#f5f7f9;
  height: calc(100vh - 50px);
}
.banner {
  width: 100%;
  height: 200px;
  background: url('../../assets/image/banner.png') no-repeat 0 0 / cover;
}
.user-info {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
    .left-col {
      padding-left: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .mobile {
        padding-left: 10px;
        font-size: 0.4rem;
        color: #efecfc;
      }
    }
  }
  .code-row {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .code-btn {
      margin-left: 110px;
      width: 1.53333rem;
      height: 0.42667rem;
      background: #fff;
      border-radius: 0.21333rem;
      font-size: 0.26667rem;
      color: #666;
      padding: 0;
    }
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    font-size: 16px;
    :deep(.van-grid-item__text) {
      margin-top: 5px;
      color: #fff;
      font-size: 12px;
    }
  }
}
// 主体区域
main {
  .grid {
    margin-bottom: 3px;
    color: #646566;
    // 字体图标
    :deep(.iconfont){
      font-size: 0.6rem;
      &.icon-lishi {
        color: #ffb31d;
      }
      &.icon-shoucang {
        color: #ed5253;
      }
    }
  }
}
.login-btn{
  margin-top: 3px;
  :deep(.van-button__content){
  color: red;
  }
}
.login-message{
  text-align: center;
  img{
    margin-top: 55px;
    width: 66px;
    height: 66px;
  }
  p{
    cursor: pointer;
    margin-top: -1px;
    font-size: 14px;
    color: #fff;
  }
}
</style>
