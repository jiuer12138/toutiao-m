<template>
  <div id="commentArea">
    <!-- 上方标题以及作者信息 -->
    <van-nav-bar
      fixed
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
      class="navBar"
    />
    <div class="place"></div>
    <h4>{{ articleObj.title }}</h4>
    <van-cell
      :title="articleObj.aut_name"
      :label="time"
      class="userinfo"
      :border="false"
    >
      <van-button
        type="info"
        round
        class="followBtn"
        :class="{ isfollow: isFollow }"
        @click="isFollowFn"
        :loading="isFollowLoading"
      >
        {{ isFollow ? '已关注' : '关注' }}
        <template #icon>
          <van-icon name="plus" v-show="!isFollow" />
        </template>
      </van-button>
      <template #icon>
        <van-image class="avatar" round :src="articleObj.aut_photo" />
      </template>
    </van-cell>
    <!-- 中间文章内容区域 -->
    <article v-html="articleObj.content" class="markdown-body"></article>
    <van-divider>正文结束</van-divider>
    <!-- 评论区 -->
    <van-list
      class="comment-list"
      :finished="finished"
      finished-text="没有更多了"
    >
      <CommentItem
        :commentlist="commentlist"
        @showPopup="onShowPopup"
      ></CommentItem>
    </van-list>
    <!-- 回复评论弹层 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="isShowPopup"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar>
        <template #title>
          <span v-if="replyCount === undefined">{{ '暂无回复' }}</span>
          <span v-else>{{
            replyCount === 0 ? '暂无回复' : replyCount + '条回复'
          }}</span>
        </template>
      </van-nav-bar>
      <CommentItem
        :commentlist="currentCommentlist"
        @showPopup="onShowPopup"
      ></CommentItem>
      <van-nav-bar title="全部回复" />
      <van-list
        class="comment-list"
        :finished="finished1"
        finished-text="没有更多了"
      >
        <CommentItem :commentlist="commentlist1"></CommentItem>
      </van-list>
      <div class="place"></div>
    </van-popup>
    <van-popup
      duration="0.2"
      :overlay="false"
      v-model="isShowPopup"
      position="bottom"
      :style="{ height: '7%' }"
      ><van-button
        type="info"
        class="CommentBtn"
        round
        @click="isShowCommentOnCommentPopup = true"
        >评论</van-button
      ></van-popup
    >
    <!-- 占位盒子 -->
    <div class="place"></div>
    <!-- 底部tabbar部分 -->
    <van-tabbar class="bottomTabbar">
      <van-button
        type="default"
        class="goCriticism"
        round
        @click="isShow = true"
        >写评论</van-button
      >
      <van-tabbar-item icon="comment-o" :badge="commCount"></van-tabbar-item>
      <van-tabbar-item @click="isCollectedFn">
        <template #icon
          ><van-icon name="star" v-show="isCollected" />
          <van-icon name="star-o" v-show="!isCollected"
        /></template>
      </van-tabbar-item>
      <van-tabbar-item icon="good-job-o" @click="changeAttitude">
        <template #icon
          ><van-icon name="good-job" v-show="Attitude === 1" />
          <van-icon name="good-job-o" v-show="Attitude === -1"
        /></template>
      </van-tabbar-item>
      <van-tabbar-item icon="share" @click="showShare = true"></van-tabbar-item>
    </van-tabbar>
    <!-- 分享组件 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <!-- 评论弹层 -->
    <van-popup v-model="isShow" position="bottom" class="popUp">
      <van-field
        v-model.trim="message"
        rows="2"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      >
        <template #extra>
          <van-button
            @click="CommentOnArticle"
            size="small"
            class="submitBtn"
            :disabled="isDisabled"
            >发布</van-button
          >
        </template>
      </van-field>
    </van-popup>
    <!-- 评论评论的弹层 -->
    <van-popup
      v-model="isShowCommentOnCommentPopup"
      position="bottom"
      class="popUp"
    >
      <van-field
        v-model.trim="message"
        rows="2"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      >
        <template #extra>
          <van-button
            @click="publishComment"
            size="small"
            class="submitBtn"
            :disabled="isDisabled"
            >发布</van-button
          >
        </template>
      </van-field>
    </van-popup>
  </div>
</template>
<script>
import '../../../node_modules/github-markdown-css/github-markdown.css'
import {
  getArticleDetails,
  getArticleCollect,
  ChangeArticleCollect,
  ChangeArticleAttitude,
  getArticleAttitude
} from '@/api/news'
import { getArticleComment, CommenOn } from '@/api/comment'
import { getUserfollowState, ChangeUserfollowState } from '@/api/user'
import dayjs from '@/utils/dayjs'
import CommentItem from './components/CommentItem'
import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      articleObj: {},
      commCount: '',
      isShow: false,
      message: '',
      commentlist: [],
      commentlist1: [],
      currentCommentlist: [],
      loading: false,
      loading1: false,
      finished: false,
      finished1: false,
      offset: '',
      isFollow: false,
      isFollowLoading: false,
      isCollected: false,
      showShare: false,
      Attitude: -1,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ],
      isShowPopup: false,
      artId: '',
      comId: '',
      replyCount: 0,
      isShowCommentOnCommentPopup: false
    }
  },
  components: { CommentItem },
  updated () {
    const imgs = document.querySelectorAll('img')
    console.log(imgs)
    const arr = []
    imgs.forEach((item) => arr.push(item.src))
    console.log(arr)
    imgs.forEach((item, index) =>
      item.addEventListener('click', () => {
        console.log(index)
        ImagePreview({ images: arr, startPosition: index })
      })
    )
  },
  created () {
    this.getArticleDetails()
    this.getArticleComment()
  },
  computed: {
    time () {
      return dayjs(this.articleObj.pubdate).fromNow()
    },
    isDisabled () {
      return this.message.length === 0
    }
  },
  methods: {
    async getArticleDetails () {
      try {
        const id = this.$route.params.id
        const res = await getArticleDetails(id)
        // console.log(res)
        this.articleObj = res.data.data
        this.isFollow = res.data.data.is_followed
        this.isCollected = res.data.data.is_collected
        this.Attitude = res.data.data.attitude
        this.artId = res.data.data.art_id
        this.commCount = res.data.data.comm_count
      } catch (error) {
        console.log(error)
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    // onLoad () {
    //   this.getArticleComment()
    // },
    async isFollowFn () {
      this.isFollowLoading = true
      const id = this.articleObj.aut_id
      if (this.isFollow) {
        try {
          await ChangeUserfollowState(id)
          this.isFollow = false
          this.$toast.success('取消关注')
        } catch (error) {
          this.$toast.fail('取消失败，请重新再试')
        } finally {
          this.isFollowLoading = false
          // this.getArticleDetails()
        }
      } else {
        try {
          await getUserfollowState(id)
          this.isFollow = true
          this.$toast.success('关注成功')
        } catch (error) {
          this.$toast.fail('关注失败，请重新再试')
        } finally {
          this.isFollowLoading = false
          // this.getArticleDetails()
        }
      }
      // this.getArticleDetails()
    },
    async isCollectedFn () {
      const id = this.articleObj.art_id
      if (this.isCollected) {
        try {
          await ChangeArticleCollect(id)
          this.isCollected = false
          this.$toast.success('取消收藏')
        } catch (error) {
          this.$toast.fail('取消失败，请重新再试')
        }
      } else {
        try {
          await getArticleCollect(id)
          this.isCollected = true
          this.$toast.success('收藏成功')
        } catch (error) {
          this.$toast.fail('收藏失败，请重新再试')
        }
      }
      // this.getArticleDetails()
    },
    async changeAttitude () {
      const id = this.articleObj.art_id
      if (this.Attitude === 1) {
        try {
          await ChangeArticleAttitude(id)
          this.Attitude = -1
          this.$toast.success('取消点赞')
        } catch (error) {
          this.$toast.fail('取消失败，请重新再试')
        }
      } else if (this.Attitude === -1) {
        try {
          await getArticleAttitude(id)
          this.Attitude = 1
          this.$toast.success('点赞成功')
        } catch (error) {
          this.$toast.fail('取消失败，请重新再试')
        }
      }
      // this.getArticleDetails()
    },
    async getArticleComment () {
      try {
        const id = this.$route.params.id
        const res = await getArticleComment('a', id, this.offset)
        // console.log(res)

        this.offset = res.data.data.last_id
        this.commentlist = res.data.data.results
        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true
        }
        // console.log(this.commentlist)
        this.loading = false
      } catch (error) {}
    },
    // onLoad () {
    //   // this.getArticleComment()
    // },
    async CommentOnArticle () {
      try {
        await CommenOn(this.artId, this.message)
        const res = await getArticleComment('a', this.artId)
        this.commCount = res.data.data.total_count
        // console.log(res)
        this.commentlist = res.data.data.results
        this.message = ''
        this.isShow = false
        this.$toast.success('评论成功')
      } catch (error) {
        this.$toast.fail('评论失败，请重新再试')
      }
    },
    onShowPopup (item) {
      this.currentCommentlist = [item]
      // console.log(this.currentCommentlist)
      this.replyCount = item.reply_count
      this.isShowPopup = true
      this.CommentOnComments(item.com_id)
      this.comId = item.com_id
    },
    async CommentOnComments (id) {
      const res = await getArticleComment('c', id)
      console.log(res)
      this.commentlist1 = res.data.data.results
    },
    async publishComment () {
      try {
        const res = await CommenOn(this.comId, this.message, this.artId)
        console.log(res)
        this.commentlist1.unshift(res.data.data.new_obj)
        this.message = ''
        this.isShowCommentOnCommentPopup = false
        this.replyCount = this.commentlist1.length
        this.$toast.success('评论成功')
      } catch (error) {
        this.$toast.fail('评论失败，请重新再试')
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
  :deep(.van-icon) {
    color: #fff;
  }
}
.place {
  height: 50px;
}
h4 {
  font-size: 0.53333rem;
  padding: 0.66667rem 0.42667rem;
  margin: 0;
  color: #3a3a3a;
}
.userinfo {
  .avatar {
    margin-top: -5px;
    width: 0.93333rem;
    height: 0.93333rem;
    margin-right: 0.22667rem rem;
  }
  .van-cell__label {
    margin-top: -1px;
    color: #969799;
    font-size: 0.32rem;
    line-height: 0.48rem;
  }
  .van-cell__title {
    font-size: 0.32rem;
    color: #3a3a3a;
    margin-top: -10px;
    margin-left: 10px;
  }
  .followBtn {
    font-size: 0.32rem;
    width: 2.26667rem;
    height: 0.77333rem;
    background: rgb(50, 150, 250);
    border-color: rgb(50, 150, 250);
  }
  .isfollow {
    color: #323233;
    background-color: #fff;
    border: 0.02667rem solid #ebedf0;
  }
}
.bottomTabbar {
  height: 44px;
  .goCriticism {
    margin: 10px 14px;
    width: 3.76rem;
    height: 0.61333rem;
    border: 0.02667rem solid #eee;
    font-size: 0.4rem;
    line-height: 0.61333rem;
    color: #a7a7a7;
  }
  :deep(.van-icon) {
    color: rgb(119, 119, 119);
    font-size: 0.53333rem;
  }
  .van-icon-star:before {
    color: rgb(50, 150, 250);
  }
  .van-icon-good-job:before {
    color: rgb(50, 150, 250);
  }
}
article {
  font-size: 12px;
  padding: 17px 16px;
  :deep(p) {
    margin-bottom: 10px;
  }
  .van-tabbar-item--active {
    color: unset;
  }
}
.popUp {
  height: 120px;
  :deep(.van-field__value) {
    margin-top: 7px;
    width: 298px;
    height: 88px;
    background-color: #f5f7f9;
    .van-field__control {
      padding: 10px 16px 0;
    }
    .van-field__word-limit {
      padding: 0 16px;
    }
  }
  .submitBtn {
    margin-top: 34px;
    margin-right: -0.23333rem;
    margin-left: 0.23333rem;
    color: #6ba3d8;
    border: unset;
    font-size: 0.37333rem;
  }
}
.CommentBtn {
  z-index: 100;
  width: 100%;
  height: 100%;
}
</style>
