<template>
  <div class="container">
    <div class="list">
      <div class="listItem"  v-for="(item,index) of papersItem" :key="index" @click="toPaperList(item.port)">
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
      papersItem: [
      {
        title: '政治',
        port: 'zhengzhi'
      },
      {
        title: '数学一',
        port: 'shuxueyi'
      },
      {
        title: '数学二',
        port: 'shuxueer',
      },
      {
        title: '英语一',
        port: 'yingyuyi'
      },
      {
        title: '英语二',
        port: 'yingyuer'
      }]
    }
  },
  methods: {
    toPaperList (port) {
      wx.navigateTo({
        url: `/pages/paperList/main?port=${port}`
      })
    }
  },
  mounted () {

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