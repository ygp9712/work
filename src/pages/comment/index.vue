<template>
  <div class="container">
    <div class="comment-list">
      <van-swipe-cell :right-width="150" v-for="(item, index) of commentList" :key="index">
        <div class="comment-item">
          <p class="comment-content">
            {{item.content}}
          </p>
          <span class="comment-book">
            {{item.book_title}}
          </span>
          <span class="comment-before">
            {{item.before}}前
          </span>
        </div>
        <div class="swipe-right" slot="right" @click="deleteItem(item.id, index)">删除</div>
      </van-swipe-cell>
    </div>
    <div class="pagination" v-if="maxPage>0">
      <div :class="leftClass" @click="toBackPage()">上一页</div>
      <span class="page">{{page}} / {{maxPage}}</span>
      <div :class="rightClass" @click="toNextPage()">下一页</div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
import handleTime from '../../utils/handleTime';
export default {
  name: 'comment',
  data() {
    return {
      currentTime: new Date().getTime(),
      commentList: [],
      page: 1,
      maxPage: 0,
      leftClass: 'button disable',
      rightClass: 'button'
    }
  },
  methods: {
    async deleteItem(id, index) {
      console.log(id);
      await request('/deleteComment', {id: id}, 'POST')
      this.commentList.splice(index,1);
      this.maxPage = await request('/getCommentMax');
    },
    async toBackPage() {
      if (this.page === 1) return
        this.page--;
        if (this.page === 1) {
          this.leftClass = 'button disable';
        }
        if (this.rightClass === 'button disable') {
          this.rightClass = 'button';
        }
        let result = await request('/personalComment', {page: this.page});
        this.commentList = result;
        this.commentList.forEach(element => {
          let beforeTime = this.currentTime - element.time;
          element.before = handleTime.formatBefore(beforeTime);
        });
        wx.pageScrollTo({
          scrollTop: 0
        })
    },
    async toNextPage() {
      console.log('下一页');
        if (this.page === this.maxPage) return
        if (this.page === 1) {
          this.leftClass = 'button';
        }
        this.page++;
        if (this.page === this.maxPage) {
          this.rightClass = 'button disable'
        }
        let result = await request('/personalComment', {page: this.page});
        this.commentList = result;
        this.commentList.forEach(element => {
          let beforeTime = this.currentTime - element.time;
          element.before = handleTime.formatBefore(beforeTime);
        });
        wx.pageScrollTo({
          scrollTop: 0
        })
    }
  },
  async onShow() {
    this.maxPage = await request('/getCommentMax');
    let result = await request('/personalComment', {page : 1});
    this.commentList = result;
    this.commentList.forEach(element => {
        let beforeTime = this.currentTime - element.time;
        element.before = handleTime.formatBefore(beforeTime);
    });
    this.currentTime = new Date().getTime();
  },
  onUnload() {
    this.page = 1;
    this.leftClass = 'button disable';
    this.rightClass = 'button';
  }
}
</script>

<style lang="stylus">
  .container
    .van-swipe-cell__right {
      display: inline-block;
      width: 150rpx;
      height: 180rpx;
      font-size: 15px;
      line-height: 180rpx;
      background: red;
      color: #fff;
      text-align: center;
    }
    .comment-list
      .comment-item
        box-sizing: border-box;
        display: block;
        width: 100%;
        height: 150rpx;
        padding: 20rpx;
        /* padding-right: 60rpx;  */
        background: #f2f2f2;
        .comment-content
          font-size: 44rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-bottom: 10rpx;
        .comment-book
          display: inline-block;
          font-size: 26rpx;
          width: 400rpx;
          color: #B22222;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        .comment-before
          position: relative;
          font-size: 26rpx;
          right: -140rpx;
          color: 	#0000CD;
    .pagination
      margin-top: 60rpx;
      padding-bottom: 60rpx;
      width: 100%;
      display: inline-block;
      text-align: center;
      .page
        font-size: 30rpx;
        padding: 0 20rpx;
      .button
        display: inline-block;
        width: 200rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        color: #ffffff;
        font-size: 34rpx;
        background: #1b644a;
        line-height: 80rpx;
        border: 2rpx solid #f2f2f2
        border-radius: 16rpx;
      .disable
        background: #eaeaea;
</style>