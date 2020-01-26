<template>
  <div class="root">
    <div class="bar">
      考研信息
    </div>
    <div class="icons">
      <div class="icon" v-for="(item, index) of buttonList" :key="index" @click="toArticleList(item.name, item.listName)">
        <div class="img-wrapper">
          <img class="icon-img" mode="widthFix" :src="'/static/imgs/button'+ index +'.jpg'" alt="">
        </div>
        <p class="icon-text">
          {{item.name}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexIcon',
  data() {
    return {
      buttonList: [{
        name: '国家政策',
        listName: 'country',
      },{
        name: '院校政策',
        listName: 'college',
      },{
        name: '调剂指南',
        listName: 'adjust',
      },{
        name: '考研动态',
        listName: 'dynamic',
      },{
        name: '经验心得',
        listName: 'experience',
      }] 
    }
  },
  methods: {
    toArticleList (name, listName) {
      wx.navigateTo({
        url: `/pages/articleList/main?name=${name}&listName=${listName}`
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
  .root
    margin-bottom: 30rpx;
    .bar
      display: block;
      height: 100rpx;
      line-height: 100rpx;
      text-indent: 40rpx;
      background: #008B00;
      color: #ffffff;
      border-bottom: 4rpx solid #f2f2f2;
      box-shadow: 2px 2px 2px #f2f2f2;
    .icons
      display: flex;
      flex-wrap: wrap;
      .icon
        position: relative;
        overflow: hidden;
        width: 25%;
        height: 200rpx;
        .img-wrapper
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          .icon-img
            display: block;
            padding: 10rpx;
            margin: 0 auto;
            width: 70%;
        .icon-text
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
</style>