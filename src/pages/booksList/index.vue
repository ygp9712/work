<template>
  <div>
    <div class="container">
      <div class="listItem" v-for="(item, index) of booksItem" :key="index">
        <img class="pic" :src="item.src" alt="">
        <div class="info">
          <p>书名：{{item.title}}</p>
          <p>作者：{{item.writer}}</p>
          <p>出版：{{item.publisher}}</p>
        </div>
        <div class="price"><span>￥</span>{{item.price}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    booksItem: Array
  },
  data () {
    return {
      booksItem: {}
    }
  },
  mounted () { 
    //👇在路由跳转时使用
    if(this.$mp){
    this.bookItem = JSON.parse(this.$mp.query.booksItem);
    console.log(this.booksItem);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .listItem
      display: flex
      flex-flow: ltr
      padding: 10rpx
      width: 100%
      height: 180rpx
      border-bottom: 2rpx solid #eaeaea
      .pic
        width: 180rpx
        height: 180rpx
      .info
        width: 370rpx
        padding: 20rpx
        font-size: 30rpx
        line-height: 48rpx
      .price
        color: red
        font-size: 40rpx
        font-weight: bold
        padding-top: 60rpx
      
        
</style>