<template>
  <div id="container">
    <swiper circular indicator-dots="true" indicator-active-color="white">
      <swiper-item v-for="(item, index) of swiperArr" :key="index">
        <img :src="item.src" alt="">
      </swiper-item>
    </swiper>
    <div class="booksList">
      <div class="booksNav">
        <span>全部商品</span>
        <span class="more"> > </span>
      </div>
      <div class="list">
        <div @click="toDetail" class="bookItem" v-for="(item, index) of booksArr" :key="index" >
          <img :src="item.src" alt="">
          <p class="bookTitle">《{{item.title}}》</p>
          <p class="bookWriter">{{item.writer}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperArr: [{
        src: '/static/imgs/test1.png'
      },{
        src: '/static/imgs/test2.png'
      },{
        src: '/static/imgs/test3.png'
      }],
      booksArr: [{
        src: '/static/imgs/book1.jpg',
        title: '白夜行',
        writer: '东野圭吾'
      },{
        src: '/static/imgs/book2.jpg',
        title: '嫌疑人X的献身',
        writer: '东野圭吾'
      },{
        src: '/static/imgs/book3.jpg',
        title: '放学后',
        writer: '东野圭吾'
      }]
    }
  },
  methods: {
    toDetail () {
      wx.navigateTo({
        url:'/pages/detail/main'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
   #container
    swiper 
      width: 100%
      height: 400rpx //iphone6设计稿下的1rpx = 0.5px
      img 
        width: 100%
        height: 100%
    .booksList
      .booksNav
        line-height: 80rpx
        padding: 10rpx
        .more
          float: right
      .list
        display: flex
        flex-wrap: wrap
        .bookItem
          box-sizing: border-box //将边框算进宽度之中去
          width: 50%
          display: flex
          flex-direction: column
          align-items: center
          border-bottom: 2rpx solid #eee
          &:nth-child(2n + 1) //取奇数的子元素即：（0+1），（2+1）等
            border-right: 2rpx solid #eee
          //弹性盒子嵌套
          .bookTitle
            font-size: 26rpx
            line-height: 50rpx
          .bookWriter
            font-size: 20rpx
            line-height: 50rpx
          img
            width: 200rpx
            height: 200rpx
            margin: 15rpx 0

            
</style>