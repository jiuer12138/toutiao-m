<template>
  <div class="user-container">
    <van-nav-bar
      title="个人信息"
      left-arrow
      class="navBar"
      @click-left="$router.back()"
    />
    <van-uploader
      :after-read="afterRead"
      ref="ChooseFile"
      style="display: none"
    />
    <van-cell title="头像" is-link @click="isShowChangeImageFn">
      <van-image class="userAvatar" round :src="userInfo.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="userInfo.name"
      @click="isShowChangeNickname = !isShowChangeNickname"
    />
    <van-cell
      title="性别"
      is-link
      :value="gender"
      @click="isShowChangeGender = !isShowChangeGender"
    />
    <van-cell
      title="生日"
      is-link
      :value="userInfo.birthday"
      @click="isShowChangeBirthday = !isShowChangeBirthday"
    />
    <!-- 更改性别组件 -->
    <van-popup
      v-model="isShowChangeGender"
      position="bottom"
      class="genderPopup"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="columns"
        @confirm="onConfirmChangeGender"
        @cancel="onCancelChangeGender"
      />
    </van-popup>
    <!-- 更改生日组件 -->
    <van-popup
      v-model="isShowChangeBirthday"
      position="bottom"
      class="birthdayPopup"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirmChangeBirthday"
        @cancel="onCancelChangeBirthday"
      />
    </van-popup>
    <!-- 更改昵称组件 -->
    <van-popup
      v-model="isShowChangeNickname"
      position="bottom"
      class="nicknamePopup"
    >
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="isShowChangeNickname = false"
        @click-right="onConfirmChangeNickname"
      />
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
      />
    </van-popup>
    <!-- 更改头像组件 -->
    <van-popup
      v-model="isShowChangeImage"
      position="bottom"
      class="AvatarPopup"
    >
      <VueCropper
        :fileUrl="fileUrl"
        @CanceChangeImage="CancelChangeImageFn"
      ></VueCropper>
    </van-popup>
  </div>
</template>
<script>
import VueCropper from '@/components/VueCropper.vue'
import { getUserInfoDetails, editUserInfoDetails } from '@/api/user'
import dayjs from '@/utils/dayjs'
export default {
  data () {
    return {
      userInfo: {},
      message: '',
      columns: ['男', '女'],
      changeGender: '',
      ChangeBirthday: '',
      ChangeNickname: '',
      isShowChangeImage: false,
      isShowChangeGender: false,
      isShowChangeBirthday: false,
      isShowChangeNickname: false,
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      fileUrl: ''
    }
  },
  components: { VueCropper },
  created () {
    this.getUserInfoDetails()
  },
  computed: {
    gender () {
      return ['男', '女'][this.userInfo.gender]
    }
  },
  methods: {
    CancelChangeImageFn () {
      console.log(1)
      this.isShowChangeImage = false
    },
    async getUserInfoDetails () {
      try {
        const res = await getUserInfoDetails()
        // console.log(res)
        this.userInfo = res.data.data
        this.message = res.data.data.name
      } catch (error) {}
    },
    async editUserInfoDetails () {
      try {
        await editUserInfoDetails(
          this.ChangeNickname,
          this.changeGender,
          this.ChangeBirthday
        )
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      } finally {
        this.getUserInfoDetails()
      }
    },
    onConfirmChangeGender (value, index) {
      console.log(index)
      this.changeGender = index
      this.editUserInfoDetails()
      this.isShowChangeGender = false
    },
    onCancelChangeGender () {
      this.isShowChangeGender = false
    },
    onConfirmChangeBirthday (value) {
      value = dayjs(value).format('YYYY-MM-DD')
      console.log(value)
      this.ChangeBirthday = value
      this.editUserInfoDetails()
      this.isShowChangeBirthday = false
    },
    onCancelChangeBirthday () {
      this.isShowChangeBirthday = false
    },
    onConfirmChangeNickname () {
      this.ChangeNickname = this.message
      this.editUserInfoDetails()
      this.isShowChangeNickname = false
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      this.fileUrl = file.content
      this.isShowChangeImage = true
    },
    isShowChangeImageFn () {
      this.$refs.ChooseFile.chooseFile()
      this.getUserInfoDetails()
    }
  }
}
</script>
<style scoped lang="less">
.user-container {
  height: 100vh;
  background-color: #f5f7f9;
  .userAvatar {
    width: 30px;
    height: 30px;
  }
  .genderPopup {
    height: 308px;
  }
  .birthdayPopup {
    height: 306px;
  }
  .nicknamePopup {
    height: 100%;
  }
  .AvatarPopup {
    height: 100%;
    background-color: #000;
  }
}
.navBar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
