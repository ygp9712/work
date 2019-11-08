<template>
  <div class="container">
    <div class="bookDetail">
      <b class="bookTitle">白夜行</b>
      <img class="bookImg" src="/static/imgs/book2.jpg" alt="">
      <p>作者：东野圭吾</p>
      <p>出版社：人民出版社</p>
      <p>出版日期：2019</p>
      <p>定价：30</p>
    </div>
    <div class="btn">
      分享给好友
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
  .container
    margin: 0 auto
    width: 600rpx
    .bookDetail
      .bookTitle
        margin: 16rpx 0
        text-align: center
        font-weight: bold
        font-size: 42rpx
      .bookImg
        width: 100%
        
      p
      line-height: 46rpx
    .btn
      display: block
      width: 200rpx
      height: 40rpx
      background-color: #eaeaea     
</style>