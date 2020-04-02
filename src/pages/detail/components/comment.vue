<template>
  <div class="container">
    <div class="bar">读者评论</div>
    <div class="book-comment">
      <div class="comment-item" v-for="(item, index) of bookComment" :key="index">
        <div class="comment-info">
          <img mode="widthFix" class="avatar" :src="item.user_avatar" alt="">
          <div class="comment-text">
            <span class="text-name">{{item.user_nickname}}</span>
            <span :class="genderClass[item.user_gender]"></span>
            <p class="text-time">{{item.before}}前</p>
          </div>
        </div>
        <div class="comment-content">
          {{item.content}}
        </div>
      </div>
      <div class="no-comment" v-if="bookComment == ''">暂无评论，快来抢沙发</div>
    </div>
    <div class="my-comment" v-if="isLogin">
      <img mode="widthFix" class="avatar" :src="userInfo.avatarUrl" alt="">
      <span class="title">说点什么...</span>
      <textarea type="text" class="content" 
                v-model="comment"/>
      <button class="btn" size="mini"  @click="handleClick()">提交</button>
    </div>
    <div class="space"></div>
  </div>
</template>

<script>
import request from '../../../utils/request';
import handleTime from '../../../utils/handleTime';
export default {
  name: 'bookComment',
  props: [ 'isLogin', 'bookId', 'bookTitle' ],
  data() {
    return {
      userInfo: {},
      bookComment: [],
      comment: '',
      genderClass: ['iconfont iconnvxing', 'iconfont iconnanxing'],
      currentDate: ''
    }
  },
  methods: {
    async handleClick() {
      if(this.comment === '') return
      let time = new Date().getTime();
      await request('/addComment', {bookId: this.bookId, bookTitle: this.bookTitle,avatarUrl: this.userInfo.avatarUrl, nickName: this.userInfo.nickName, gender: this.userInfo.gender, comment: this.comment, time})
      this.bookComment.splice(0,0,{user_avatar: this.userInfo.avatarUrl, user_nickname: this.userInfo.nickName, user_gender: this.userInfo.gender, content: this.comment, time: this.currentDate, before: '0秒'})
      this.comment = '';
    },
    async getComment() {
      this.bookComment = await request('/getComment', {bookId: this.bookId});
      this.bookComment.forEach(element => {
        let beforeTime = this.currentDate - element.time;
        element.before = handleTime.formatBefore(beforeTime);
      });
    }
  },
  mounted() {
    /* this.getComment(); */
    if (this.isLogin) {
      this.userInfo = wx.getStorageSync('userInfo');
      console.log('已登录');
    }
  },
  watch: {
    bookId (newValue,oldValue) {
      /* console.log(newValue) */
      this.getComment();
      this.currentDate = new Date().getTime()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .avatar
      display: inline-block;
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    .bar
      display: block;
      width: 100%;
      height: 150rpx;
      line-height: 150rpx;
      text-indent: 20rpx;
      font-size: 40rpx;
      font-weight: bold;
      text-align: center;
      /* background: green; */
      color: 	#00C5CD;
    .book-comment
      .comment-item
        padding: 20rpx;
        border: 4rpx solid #eaeaea;
        border-radius: 10rpx;
        margin-bottom: 20rpx;
        .comment-info
          width: 100%;
          height: 100rpx;
          margin-bottom: 20rpx;
          .comment-text
            margin-left: 20rpx;
            display: inline-block;
            font-size: 46rpx;
            .iconnanxing
              color: blue;
            .iconnvxing
              color: pink;
            .iconfont
              margin-left: 20rpx;
            .text-time
              font-size: 32rpx;
        .comment-content
          display: block;
          overflow: hidden;
      .no-comment
        display: block;
        width: 100%;
        height: 200rpx;
        line-height: 200rpx;
        text-align: center;
    .my-comment
      .title
        margin-left: 20rpx;
        line-height: 100rpx;
        font-size: 32rpx;
        color: #00BFFF;
      .content
        box-sizing: border-box;
        padding: 20rpx;
        width: 100%;
        height: 200rpx;
        background: #f2f2f2;
        white-space: wrap;
        border-radius: 20rpx;
      .btn
        margin-top: 20rpx;
    .space
      height: 200rpx;
</style>