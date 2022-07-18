<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <div class="myChannels">
        <van-cell title="我的频道">
          <van-button class="editBtn" size="small" round>编辑</van-button>
        </van-cell>

        <van-grid gutter="10px">
          <van-grid-item
            :text="item.name"
            v-for="item in myChannels"
            :key="item.id"
          >
            <template #icon> <van-icon name="cross" /></template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="recommedChannels">
        <van-cell title="推荐频道"></van-cell>
        <van-grid gutter="10px">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in RecommedChannels"
            :key="item.id"
        /></van-grid>
      </div>
    </div>
  </van-popup>
</template>
<script>
import { getAllChannels } from '@/api/channels'
export default {
  data () {
    return {
      isShow: false,
      AllChannels: []
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  components: {},
  created () {
    this.getAllChannels()
  },
  computed: {
    RecommedChannels () {
      return this.AllChannels.filter((item) => {
        return !this.myChannels.find((ele) => ele.id === item.id)
      })
    }
  },
  methods: {
    async getAllChannels () {
      const res = await getAllChannels()
      this.AllChannels = res.data.data.channels
      console.log(this.AllChannels)
    }
  }
}
</script>
<style scoped lang="less">
.popupMain {
  padding-top: 50px;
  .editBtn {
    color: red;
    padding: 0 15px;
    height: 24px;
    border-color: red;
  }

  .myChannels {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
        }
        .van-icon {
          font-size: 12px;
        }
      }
    }
  }
  .recommedChannels {
    // 推荐频道的样式
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      background-color: #eee;
      flex-direction: row;
      .van-grid-item__icon {
        font-size: 0.5rem;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
