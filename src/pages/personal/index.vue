<template>
  <div class="container">
    <div class="header">
      <img :src="userInfo.avatarUrl ? userInfo.avatarUrl : '/static/imgs/personal.png'" alt="">
      <button open-type="getUserInfo" @getuserinfo="handleGetUserInfo">{{userInfo.nickName ? userInfo.nickName : '登录'}}</button>
    </div>
    <div class="cardList">
      <div class="card">
        待做事务
      </div>
      <div class="card">
        我的收藏
      </div>
      <div class="card" @click="goHistory()">
        历史记录
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    wx.getUserInfo({
      success: (res) => {
        //页面刷新时重新渲染用户数据
        this.userInfo = res.userInfo;
      },
      fail: () => {
        console.log('获取用户信息失败');
      }
    })
  },
  methods: {
    handleGetUserInfo (res) {
      console.log(res);
      if (res.mp.detail.userInfo) {
        this.userInfo = res.mp.detail.userInfo;
      }
      console.log(this.userInfo);
    },
    async goHistory () {
      wx.navigateTo({
        url: `/pages/personalPage/main`
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .header
      padding: 40rpx;
      background: #1b644a;
      img 
        width: 100rpx;
        height: 100rpx;
        vertical-align: middle;
        border-radius: 50rpx;
        //放在父元素的垂直中间
      button 
        display: inline-block;
        height: 60rpx;
        line-height: 60rpx;
        margin-left: 40rpx;
        max-width: 200rpx;
        vertical-align: middle;
    .cardList
      .card
        height: 100rpx;
        line-height: 100rpx;
        text-indent: 40rpx;
        border-bottom: 2rpx solid #f2f2f2;
</style>