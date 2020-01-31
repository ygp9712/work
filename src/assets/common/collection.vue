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
    }
  },
  methods: {
    async clickHeart() {
      if(this.heartClass === 'heart') {
        this.isLike = await request('/addLike', { id : this.mark});
      } else {
        await request('/deleteLike', {id : this.isLike});
        this.isLike = '';
      }
    }
  },
  watch: {
    mark: function () {
      console.log(this.mark);
    },
    isLike: function () {
      this.isLike == '' ? this.heartClass = 'heart' : this.heartClass = 'heart liked';
    }
  },
  mounted() {
    /* console.log(this.isLike); */
    if(this.isLike) {
      this.heartClass = 'heart liked';
    }
  },
  onShow() {
    if(this.isLike) {
      this.heartClass = 'heart liked';
    }
  },
  onUnload() {
    this.heartClass = 'heart';
  }
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