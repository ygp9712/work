<template>
  <div id="container">
    <swiper circular indicator-dots="true" indicator-active-color="white">
      <swiper-item v-for="(item, index) of swiperArr" :key="index">
        <img :src="item.src" alt="">
      </swiper-item>
    </swiper>
    <index-icon></index-icon>
    <index-book></index-book>
  </div>
</template>

<script>
import IndexIcon from './components/icon.vue';
import IndexBook from './components/book.vue';
export default {
  components: {
    IndexIcon,
    IndexBook
  },
  data () {
    return {
      swiperArr: [{
        src: '/static/imgs/test1.png'
      },{
        src: '/static/imgs/test2.png'
      }
      ]
    }
  },
  methods: {
    toBooksList (bookItem) {
      wx.navigateTo({
        url:'/pages/booksList/main?bookItem=' + JSON.stringify(bookItem)
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
  #container
    swiper 
      width: 100%;
      height: 400rpx; //iphone6设计稿下的1rpx = 0.5px
      img 
        width: 100%;
        height: 100%;

            
</style>