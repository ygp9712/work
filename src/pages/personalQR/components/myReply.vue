<template>
  <div class="container">
    <div class="tab">
      <div :class="tabClass[0]" @click="changeToggle(true)">我的评论</div>
      <div :class="tabClass[1]" @click="changeToggle(false)">我的回帖</div>
    </div>
    <div class="comment-list" v-if="showToggle">
      <div class="comment-item" @click="goQuestion(item.question_id)" v-for="(item, index) of commentList" :key="item.id">
        <p class="item-content">
          {{item.content}}
        </p>
        <p class="item-title">
          标题：{{item.question_title}}
        </p>
        <span class="item-before">
          {{item.before}}前
        </span>
        <span class="iconfont iconshenglvehao" @click.stop="handleMore(item.id, index, 'comment')"></span>
      </div>
    </div>
    <div class="reply-list" v-if="!showToggle">
      <div class="reply-item" @click="goQuestion(item_.question_id)" v-for="(item_, index_) of replyList" :key="index_">
        <p class="item-content">
          回复 {{item_.toName}}: {{item_.content}}
        </p>
        <p class="item-title">
          标题：{{item_.question_title}}
        </p>
        <span class="item-before">
          {{item_.before}}前
        </span>
        <span class="iconfont iconshenglvehao" @click.stop="handleMore(item_.id, index_, 'reply')"></span>
      </div> 
    </div>

    <div class="list-end" v-if="nowPage == maxPage">没有更多内容了</div>

    <van-popup
      class="popup" @close="onClose"
      :show="showPopup" position="bottom">
      <div class="padding"></div>
      <div class="delete popup-item" @click="handleDelete()">删除</div>
      <div class="cancel popup-item" @click="onClose()">取消</div>
    </van-popup>
  </div>
</template>

<script>
import request from '../../../utils/request';
import handleTime from '../../../utils/handleTime';
export default {
  name: 'myReply',
  data() {
    return {
      showToggle: true,
      nowTime: new Date().getTime(),
      commentList: [],
      replyList: [],
      tabClass: ['tab-item active', 'tab-item'],
      nowPage: 1,
      maxPage: 0,
      showPopup: false,
      deleteType: '',
      deleteId: 0,
      deleteIndex: 0,
    }
  },
  methods: {
    clickReply(item){
      console.log(item);
    },
    changeToggle(bool) {
      if(this.showToggle == bool) return;
      this.nowPage = 1;
      if(bool == true) {
        this.getCommentList();
        this.tabClass = ['tab-item active', 'tab-item'];
      } else {
        this.getReplyList();
        this.tabClass = ['tab-item', 'tab-item active'];
      }
      this.showToggle = bool;
    },
    handleMore(id, index, type) {
      console.log(type)
      this.deleteId = id;
      this.deleteIndex = index;
      this.deleteType = type;
      this.showPopup = true;
    },
    async handleDelete() {
      if(this.deleteType === "reply") {
        await request('/deleteQReply', { id: this.deleteId })
        this.replyList.splice(this.deleteIndex, 1);
      }  else {
        await request('/deleteQComment', { id: this.deleteId })
        this.commentList.splice(this.deleteIndex, 1);
      }
      this.showPopup = false;
    },
    onClose() {
      this.showPopup = false;
    },
    async goQuestion(id) {
      await request('/clickQuestion', { id: id })
      wx.navigateTo({
        url: `/pages/questionPage/main?id=${id}&isLogin=true`
      })
    },

    async getCommentList() {
      this.maxPage = await request('/getQCommentMax');
      console.log(this.maxPage);
      this.commentList = await request('/personalQComment', {page: 1});
      this.commentList.forEach((element) => {
        element.before = handleTime.formatBefore(this.nowTime - element.time);
      })
      console.log(this.commentList);
    },
    async getReplyList() {
      this.maxPage = await request('/getQReplyMax');
      console.log(this.maxPage);
      this.replyList = await request('/personalQReply', {page: 1});
      this.replyList.forEach((element) => {
        element.before = handleTime.formatBefore(this.nowTime - element.time);
      })
      console.log(this.replyList);
    }
  },
  mounted() {
    this.nowTime = new Date().getTime();
    this.getCommentList();
  },
  async onReachBottom() {
    if(this.maxPage == this.nowPage) return
    console.log(this.nowPage);
    console.log(this.maxPage);
    this.nowPage++;
    let data;
    if(this.showToggle == true) {
        data = await request('/personalQComment', {page: this.nowPage});
        data.forEach((element) => {
          element.before = handleTime.formatBefore(this.nowTime - element.time);
          this.commentList.push(element);
        })
        console.log(data);
      } else {
        data = await request('/personalQReply', {page: this.nowPage});
        data.forEach((element) => {
          element.before = handleTime.formatBefore(this.nowTime - element.time);
        })
        console.log(data);
      }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .tab
      width: 100%;
      height: 100rpx;
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #f2f2f2;
      .tab-item
        width: 50%;
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
      .active
        background: green;
        color: #ffffff;
    .comment-list
      .comment-item
        padding: 20rpx;
        width: 100%;
        border-bottom: 1px solid #eaeaea;
        .item-content
          font-size: 50rpx;
          height: 80rpx;
          width: 600rpx;
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
    .reply-list
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
    .list-end
      width: 100%;
      text-align: center;
      font-size: 30rpx;
      line-height: 80rpx;
      height: 80rpx;
      background: #f2f2f2;
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