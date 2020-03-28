<template>
  <div class="container">
    <div class="list">
      <div class="listItem"  v-for="(item,index) of papersItem" :key="index" @click="toPaperList(item)">
        <div class="item-content">
          {{item.title}}
        </div></div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  data () {
    return {
      isLogin: '',
      papersItem: [
      {
        title: '政治',
        port: 'zhengzhi'
      },
      {
        title: '英语一',
        port: 'yingyuyi'
      }/* ,
      {
        title: '英语二',
        port: 'yingyuer'
      } */]
    }
  },
  methods: {
    async toPaperList (item) {
      wx.showLoading();
      if (this.isLogin) {
        await request('/addHistory', {item_id : 'null', item_name : item.title,item_type: 'paper', item_class : item.port})
      }
      wx.hideLoading();
      wx.navigateTo({
        url: `/pages/paperList/main?port=${item.port}`
      })
    }
  },
  onShow () {
    this.isLogin = wx.getStorageSync('token');
  },
}
</script>

<style lang="stylus" scoped>
  .container
    display: block;
    background: #f2f2f2;
    height: 100%;
    .list
      display: flex;
      flex-wrap: wrap;
      .listItem
        position: relative
        display: inline-block;
        box-sizing: border-box;
        flex-direction: row;
        line-height: 270rpx;
        text-align: center;
        width: 50%;
        height: 300rpx;
        .item-content
          position: absolute;
          display: block;
          top: 50%;
          left: 50%;
          background: #ffffff;
          width: 90%;
          height: 90%;
          transform: translate(-50%,-50%);
          border-radius: 16rpx;
          box-shadow: 4rpx 4rpx 15rpx grey;
</style>