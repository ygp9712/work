<template>
  <div class="container">
    <div class="other-reply">
      <div class="reply-item" @click="goQuestion(item.question_id)" v-for="(item, index) of replyList" :key="index">
        <p class="item-content">
          {{item.nickName}} 回复了我: {{item.content}}
        </p>
        <p class="item-title">
          标题：{{item.question_title}}
        </p>
        <span class="item-before">
          {{item.before}}前
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../../utils/request';
import handleTime from '../../../utils/handleTime';
export default {
  name: 'otherReply',
  data() {
    return {
      nowTime: '',
      replyList: [],
      showPopup: false,
      nowId: ''
    }
  },
  methods: {
    async goQuestion(id) {
      await request('/clickQuestion', { id: id })
      wx.navigateTo({
        url: `/pages/questionPage/main?id=${id}&isLogin=true`
      })
    },
    handleMore(id) {
      console.log(id)
      this.nowId = id;
      this.showPopup = true;
    },
    async getReplyList() {
      this.replyList = await request('/otherQReply');
      this.replyList.forEach((element) => {
        element.before = handleTime.formatBefore(this.nowTime - element.time);
      })
      console.log(this.replyList);
    },
    handleDelete() {
      this.showPopup = false;
    },
    onClose() {
      this.showPopup = false;
    },
  },
  mounted() {
    this.nowTime = new Date().getTime();
    this.getReplyList();
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .other-reply
      .reply-item
        padding: 20rpx;
        width: 100%;
        border-bottom: 1px solid #eaeaea;
        .item-content
          font-size: 45rpx;
          height: 70rpx;
          width: 700rpx;
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
        .item-title
          font-size: 26rpx;
          height: 40rpx;
          width: 400rpx;
          color: grey;
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
        .item-before
          font-size: 26rpx;
        .iconfont
          position: absolute;
          right: 40rpx;
          font-size: 50rpx;
    .popup
      .popup-item
        padding: 10px 0;
        height: 100rpx;
        line-height: 100rpx;
        width: 100%;
        text-align: center;
      .delete
        border-bottom: 1px solid #eaeaea;
</style>