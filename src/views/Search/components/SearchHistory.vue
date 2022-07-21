<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <van-icon
          name="delete-o"
          v-show="!isShowBtn"
          @click.stop="isShowBtn = !isShowBtn"
        />
        <span style="margin-right: 5%" v-show="isShowBtn" @click="clearAll"
          >全部删除</span
        >
        <span v-show="isShowBtn" @click="isShowBtn = !isShowBtn">完成</span>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in history"
        :key="index"
        @click.stop="changekeyword(item)"
        ><van-icon name="close" @click="closeFn(item)" v-show="isShowBtn"
      /></van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { getHistory, setHistory } from '../storageHistory'
export default {
  data () {
    return {
      isShowBtn: false,
      history: getHistory() || []
    }
  },

  components: {},
  created () {},
  computed: {},
  methods: {
    closeFn (item) {
      this.history = this.history.filter((ele) => ele !== item)
      this.history = Array.from(new Set(this.history))
      setHistory(this.history)
    },
    clearAll () {
      this.history = []
      setHistory(this.history)
    },
    changekeyword (item) {
      this.$emit('changeKeywords', item)
    }
  }
}
</script>
<style scoped></style>
