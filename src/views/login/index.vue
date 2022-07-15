<template>
  <div class="">
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="navBar" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 表单 -->
    <van-form @submit="login" class="form" ref='form'>
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRule"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRule"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down :time="60*1000" format="ss s" v-if='isShowCountDown' @finish='isShowCountDown=false'/>
          <van-button v-else round size="mini" class="code-btn" @click="sendCode" native-type="button">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'

import { mobileRule, codeRule } from './rule'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      mobileRule,
      codeRule,
      isShowCountDown: false
    }
  },
  components: {},
  mounted () {},
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async login () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        const status = error.response.status
        let msg = '登录错误，请刷新~~'
        this.$toast.fail(msg = status === 400 ? error.response.data.message : msg)
      }
    },
    async sendCode () {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode(this.mobile)
        this.isShowCountDown = true
      } catch (error) {
        if (!error.response) this.$toast.fail('手机号不正确~')
        const status = error.response.status
        if (status === 404 || status === 429) { this.$toast.fail(error.response.data.message) }
      }
    }
  }
}
</script>
<style scoped lang="less">
.navBar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-field__label) {
    width: 15px;
  }
  .iconfont {
    font-size: 20px;
  }
  .van-button {
    background-color: #6db4fb;
    border-radius: 5px;
    border: none;
    width: 347px;
    height: 44px;
    .van-button__text {
      font-family: MicrosoftYaHei;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 18px;
      letter-spacing: 1px;
      color: #ffffff;
    }
  }
  .code-btn {
    width: 85px;
    height: 23px;
    background-color: #ededed;
    padding: 0 10px;
    border-radius: 12px;
    .van-button__text {
      color: #666666;
      font-size: 12px;
    }
  }
}
</style>
