<template>
  <div class="container">
    <div :class="pageClass[showCover]">
      <div class="header">
        <img :src="userInfo.avatarUrl ? userInfo.avatarUrl : '/static/imgs/personal.png'" alt="">
        <div class="user-name">{{userInfo.nickName ? userInfo.nickName : '用户名字'}}</div>
      </div>
      <div class="card-list">
        <div class="card" @click="goMyComment()">
          我的评论
        </div>
        <div class="card" @click="goTodo()">
          待做事务
        </div>
        <div class="card" @click="goPage('Collection', '我的收藏')">
          我的收藏
        </div>
        <div class="card" @click="goPage('History', '历史记录')">
          历史记录
        </div>
      </div>
    </div>
    <div class="cover" v-if="showCover">
      <button class="cover-btn" type="primary" open-type="getUserInfo" @getuserinfo="handleGetUserInfo">登录</button>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  data () {
    return {
      userInfo: {},
      showCover: 1,
      pageClass: ['page-wrapper', 'page-wrapper hide']
    }
  },
  onShow () {
    wx.getUserInfo({
      success: (res) => {
        //页面刷新时重新渲染用户数据
        this.userInfo = res.userInfo;
        this.showCover = 0;
      },
      fail: () => {
        console.log('获取用户信息失败');
      }
    })
  },
  methods: {
    handleGetUserInfo (res) {
      wx.login({
        success: async (res) => {
        //1、获取用户登录的临时凭证,和用户是否授权没有直接关系，五分钟有效
        let code = res.code;
        //2、发送code给服务器端并获取登录令牌（token）
        let token = await request('/getOpenId', {code});
        //3、将自定义登录状态缓存到storage中
        wx.setStorageSync('token', token);
        wx.setStorageSync('userInfo', this.userInfo);
      },
        fail: () => {
          console.log('login错误');
        }
      })
      
      this.showCover = 0;
      if (res.mp.detail.userInfo) {
        this.userInfo = res.mp.detail.userInfo;
      }
      console.log(this.userInfo);
    },
    goPage (to, name) {
      wx.navigateTo({
        url: `/pages/personalPage/main?to=${to}&name=${name}`
      })
    },
    goTodo () {
      wx.navigateTo({
        url: '/pages/todoList/main'
      })
    },
    goMyComment () {
      wx.navigateTo({
        url: '/pages/comment/main'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .hide
      background: rgba(3,3,3,0.3); 
      filter: blur(5px);
    .page-wrapper
      width: 100%;
      height: 100%;
      .header
        padding: 40rpx;
        background: #1b644a;
        img 
          width: 100rpx;
          height: 100rpx;
          vertical-align: middle;
          border-radius: 50rpx;
          //放在父元素的垂直中间
        .user-name 
          display: inline-block;
          height: 60rpx;
          line-height: 60rpx;
          padding: 0 10rpx;
          border-radius: 10rpx;
          background: #ffffff;
          margin-left: 40rpx;
          max-width: 200rpx;
          vertical-align: middle;
      .card-list
        .card
          height: 100rpx;
          line-height: 100rpx;
          text-indent: 40rpx;
          border-bottom: 2rpx solid #f2f2f2;
    .cover
      position: absolute;
      top: 0;
      z-index: 100;
      height: 100%;
      width: 100%;
      .cover-btn
        position: relative;
        top: 50%;
        transform: translate(0,-50%);
        border: 10rpx solid #34c9cb;
        border-radius: 50%;
        width: 200rpx;
        height: 200rpx;
        line-height: 180rpx;
</style>