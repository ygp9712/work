<template>
  <div class="container">
    <div class="comment-list">
      <div class="comment-item" v-for="(item, index) of commentList" :key="index">
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
      currentDate: new Date().getTime(),
      commentList: []
    }
  },
  async onShow() {
    let result = await request('/personalComment');
    this.commentList = result;
    this.commentList.forEach(element => {
        let beforeTime = this.currentDate - element.time;
        element.before = handleTime.formatBefore(beforeTime);
    });
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .comment-list
      .comment-item
        box-sizing: border-box;
        display: block;
        width: 100%;
        height: 150rpx;
        padding: 20rpx;
        /* padding-right: 60rpx;  */
        margin-bottom: 20rpx;
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
</style>