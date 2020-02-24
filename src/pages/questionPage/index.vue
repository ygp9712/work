<template>
  <div class="container">
    <span class="question-title">
      {{item.title}}
    </span>
    <p class="user-info">
      <img :src="item.avatarUrl" alt="" class="user-avatar"/>
      <span class="user-nickname">{{item.nickName}}&nbsp&nbsp&nbsp&nbsp</span>
      <span class="time">{{item.time}}</span>
    </p>
    <span class="question-content">
      {{item.content}}
    </span>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  name: 'questionPage',
  data() {
    return {
      item: {}
    }
  },
  async onShow() {
    this.item = await request('/getQuestion', { id: this.$mp.query.id })
    console.log(this.item);
  }
}
</script>

<style lang="stylus" scoped>
  .container
    margin: 0 20rpx;
    .question-title
      font-weight: bold;
      font-size: 40rpx;
    .user-info
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      .user-avatar
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
      .user-nickname
        font-size: 30rpx;
        margin-left: 20rpx;
    .question-content
      font-size: 32rpx;
      color: #458B74;
</style>