<template>
  <div class="container">
    <div :class="pageClass[showCover]">
      <div class="header">
        <img :src="userInfo.avatarUrl ? userInfo.avatarUrl : '/static/imgs/personal.png'" alt="">
        <div class="user-name">{{userInfo.nickName ? userInfo.nickName : '用户名字'}}</div>
        <div style="width: 100%; text-align: center;color: yellow;">距离2021考研还有</div>
        <div style="width: 100%; text-align: center;color: #ffffff;">{{countdown}}</div>
      </div>
      <div class="QR-area">
        <div class="bar">
          <span class="iconfont iconpinglun3"></span>我的问答
        </div>
        <div class="QR-items">
          <div class="QR-question QR-item" @click="goPersonalQR('myQuestion')">
            <span class="iconwenti iconfont"></span>
            <p>我的提问</p>
          </div>
          <div class="QR-comment QR-item" @click="goPersonalQR('myReply')">
            <span class="iconpinglun iconfont"></span>
            <p>我的回答</p>
          </div>
          <div class="QR-reply QR-item" @click="goPersonalQR('otherReply')">
            <span class="iconhuifu iconfont"></span>
            <p>他人回复</p>
          </div>
        </div>
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
import handleTime from '../../utils/handleTime';
export default {
  data () {
    return {
      userInfo: {},
      showCover: 1,
      pageClass: ['page-wrapper', 'page-wrapper hide'],
      countdown: '',
      aimTime: 1608307200000,
      timer: ''
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
    this.timer = setInterval(() => {
      let nowTime = new Date().getTime();
      this.countdown = handleTime.countDown(this.aimTime - nowTime);
    }, 1000);
  },
  onUnload() {
    clearInterval(this.timer);
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
    },
    goPersonalQR(to) {
      wx.navigateTo({
        url: `/pages/personalQR/main?to=${to}`
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
      font-size: 30rpx;
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
      .QR-area
        width: 100%;
        .bar
          display: block;
          height: 80rpx;
          line-height: 80rpx;
          text-indent: 40rpx;
          background: #ffffff;
          color: #008B00;
          border-bottom: 4rpx solid #f2f2f2;
          box-shadow: 2px 2px 2px #f2f2f2;
          .iconfont 
            margin-right: 10px;
        .QR-items
          display: flex;
          flex-direction: row;
          border-bottom: 4rpx solid #f2f2f2;
          padding: 10px 0;
          .QR-item
            color: #008B00;
            display: flex;
            width: 180rpx;
            align-items: center;
            flex-direction: column;
            .iconfont
              font-size: 60rpx;
            p
              font-size: 24rpx;
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