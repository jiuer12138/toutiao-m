<template>
  <div>
    <!--  -->
    <div class="copper">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canScale="option.canScale"
        :canMoveBox="option.canMoveBox"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :fixedBox="option.fixedBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :centerBox="option.centerBox"
        :high="option.high"
        :infoTrue="option.infoTrue"
        :enlarge="option.enlarge"
      ></vueCropper>
    </div>
    <div class="upload_box">
      <!-- <input
        type="file"
        id="uploads"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg"
      /> -->
    </div>
    <!-- 预览 -->
    <div class="show-preview">
      <div class="preview"></div>
      <!-- <span class="previews-txt"> 预览</span> -->
    </div>
    <div class="avatar-btn">
      <van-button type="default" @click="onCancel">取消</van-button>
      <van-button type="primary" @click="startChangeAvatar">完成</van-button>
    </div>
  </div>
</template>
<script>
import { ChangeUserAvatar } from '@/api/user'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      photo: '',
      option: {
        img: '', // 裁剪图片的地址  空 url 地址 || base64 || blob
        outputSize: 1, // 裁剪生成图片的质量 1 0.1 - 1
        outputType: 'jepg', //  裁剪生成图片的格式 jpg (jpg 需要传入jpeg)  jpeg || png || webp
        info: true, //  裁剪框的大小信息  true  true || false
        canScale: true, // 图片是否允许滚轮缩放  true  true || false
        autoCrop: true, // 是否默认生成截图框 false true || false
        // autoCropWidth: 200, // 默认生成截图框宽度 容器的80%  0~max
        // autoCropHeight: 200, // 默认生成截图框高度  容器的80%  0~max
        fixed: true, // 是否开启截图框宽高固定比例  true  true | false
        fixedNumber: [1, 1], // 截图框的宽高比例 [1, 1]  [宽度, 高度]
        full: false, // 是否输出原图比例的截图  false true | false
        fixedBox: true, // 固定截图框大小 不允许改变  false true | false
        canMove: true, // 上传图片是否可以移动  true  true | false
        canMoveBox: false, // 截图框能否拖动 true  true | false
        original: false, // 上传图片按照原始比例渲染 false true | false
        centerBox: true, // 截图框是否被限制在图片里面  false true | false
        high: true, // 是否按照设备的dpr 输出等比例图片  true  true | false
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高 false true | false
        maxImgSize: 2000, // 限制图片最大宽度和高度 2000  0-max
        enlarge: 1, // 图片根据截图框输出比例倍数 1 0-max(建议不要太大不然会卡死的呢)
        mode: 'cover' // 图片默认渲染方式  contain contain , cover, 100px, 100% auto
      }
    }
  },
  props: {
    fileUrl: {
      type: String,
      required: true
    }
  },
  created () {
    this.option.img = this.fileUrl
  },
  methods: {
    onCancel () {
      this.$emit('CanceChangeImage')
    },
    async startChangeAvatar () {
      // console.log(this.$refs.cropper)
      const fm = new FormData()
      this.$refs.cropper.getCropBlob(blob => {
        fm.append('photo', blob)
        this.ChangeUserAvatar(fm)
      })
    },
    async ChangeUserAvatar (fm) {
      try {
        const res = await ChangeUserAvatar(fm)
        this.photo = res.data.data.photo
      } catch (error) {
        console.log(error)
      } finally {
        this.$emit('CanceChangeImage', this.photo)
      }
    }
  }
}
</script>
<style scoped lang="less">
.copper {
  margin-top: calc(50vh - 150px);
  width: 100%;
  height: 300px;
}
.avatar-btn {
  margin-top: calc(27vh - 42px);
  display: flex;
  justify-content: space-between;
  .van-button {
    font-size: 14px;
  }
  .van-button--primary {
    background-color: #000;
    border: 0.02667rem solid #000;
  }
  .van-button--default {
    color: #fff;
    background-color: #000;
    border: 0.02667rem solid #000;
  }
}
</style>
