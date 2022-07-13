<template>
  <div class="">
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class='navBar' @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 表单 -->
    <van-form @submit="login" class='form'>
  <van-field
    v-model="mobile"
    name="mobile"
    placeholder="请输入手机号"
    :rules="[{ required: true}]"
  >
 <template #label>
    <span class="iconfont icon-shouji"></span>
 </template>
  </van-field>
  <van-field
    v-model="code"
    name="code"
    placeholder="请输入验证码"
    :rules="[{ required: true }]"
  >
   <template #label>
    <span class="iconfont icon-yanzhengma"></span>
 </template>
 <template #right-icon>
    <van-button  round size="mini" class='code-btn' >发送验证码</van-button>
 </template>
  </van-field>
  <div style="margin: 16px;">
    <van-button  block type="info" native-type="submit" >登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  components: {

  },
  mounted () {

  },
  computed: {

  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async login () {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>
<style scoped lang='less'>
.navBar{
    background-color:#3296fa;
    :deep(.van-nav-bar__title) {
        color: #fff;
    }
    .van-icon{
        color: #fff;
    }
}
.form{
    :deep(.van-field__label){
        width: 15px;
    }
    .iconfont{
        font-size: 20px;
    }
    .van-button{
        background-color: #6db4fb;
        border-radius: 5px;
        border:none;
        width: 347px;
        height: 44px;
        .van-button__text{
            font-family: MicrosoftYaHei;
            font-size: 15px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 18px;
            letter-spacing: 1px;
            color: #ffffff;
        }
    }
    .code-btn{
        width: 85px;
        height: 23px;
        background-color: #ededed;
        padding: 0 10px;
        border-radius: 12px;
        .van-button__text{
            color: #666666;
            font-size: 12px;
        }
    }
}
</style>
