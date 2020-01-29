<template>
  <div class="wrapper" @click="clickHeart()">
    <p :class="heartClass">&#10084;</p>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  name: 'collection',
  props: [ 'isLike', 'mark' ],
  data() {
    return {
      heartClass: 'heart',
      historyMark: this.mark,
      likeNum: this.isLike
    }
  },
  methods: {
    async clickHeart() {
      console.log(this.historyMark);
      if(this.heartClass === 'heart') {
        this.likeNum = await request('/addLike', { id : this.historyMark});
        this.heartClass = 'heart liked';
      } else {
        await request('/deleteLike', {id : this.likeNum});
        this.heartClass = 'heart';
      }
    }
  },
  mounted() {
    if(this.likeNum) {
      this.heartClass = 'heart liked';
    }
  },
}
</script>

<style lang="stylus" scoped>
  .wrapper
    position: fixed;
    bottom: 20rpx;
    right: 20rpx;
    display: block;
    width: 120rpx;
    height: 120rpx;
    background: #ffffff;
    border-radius: 50%;
    border: 2rpx solid #eaeaea;
    .heart
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 80rpx;
      color: #eaeaea;
      transform: translate(-50%,-50%);
    .liked
      color: red;
</style>