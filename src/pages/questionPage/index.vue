<template>
  <div class="container">
    <span class="question-title">
      {{item.title}}
    </span>
    <p class="user-info">
      <img :src="item.avatarUrl" alt="" class="user-avatar"/>
      <span class="user-nickname">{{item.nickname}}</span>
      <span class="time"></span>
    </p>
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
  async onLoad() {
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
      .user-avatar
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
      .user-nickname
        font-size: 30rpx;
        margin-left: 20rpx;
</style>