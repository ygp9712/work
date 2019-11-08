<template>
  <div id="container">
    <swiper @change="handleChange" circular :indicator-dots="index !== 3" indicator-active-color="white">
      <swiper-item>
        <img src="/static/imgs/test1.png" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/test2.png" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/test1.png" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/test2.png" alt="">
      </swiper-item>
    </swiper>
    <button @click="toIndex" class="btn" v-show=" index === 3">开始体验</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleChange (event) {
      //更新index的状态值
      this.index = event.mp.detail.current
    },
    toIndex () {
      //跳转index
      wx.navigateTo({
        url: '/pages/detail/main'
      })
    }
  },
  data() {
    return {
     index: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
   #container
     width: 100%
     height: 100%
     swiper 
       width: 100%
       height: 100%
       img
         width: 100%
         height: 100%
    .btn
      position: absolute
      left: 50%
      bottom: .5rem
      margin-left: -140rpx
      width: 280rpx
      height: 80rpx
      text-align: center
      line-height:80rpx     
      display:block
      background:black
      color: white
</style>