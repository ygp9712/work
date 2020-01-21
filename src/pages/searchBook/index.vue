<template>
  <div class="container">
    <div class="list">
      <div class="listItem"  v-for="(item,index) of papersItem" :key="index" @click="toPaperList(item.paperList)">
        {{item.title}}</div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  data () {
    return {
      papersItem: []
    }
  },
  methods: {
    toPaperList (paperList) {
      wx.navigateTo({
        url:'/pages/paperList/main?paperList=' + JSON.stringify(paperList)
      })
    }
  },
  async mounted () {
      //获取用户输入的内容
       let result =  await request('/getList');
       this.papersItem = result;
      //发送请求给服务器获取数据
  },
}
</script>

<style lang="stylus" scoped>
  .list
    display: flex;
    flex-wrap: wrap;
    .listItem
      display: inline-block;
      box-sizing: border-box;
      flex-direction: row;
      line-height: 200rpx;
      text-align: center;
      width: 50%;
      height: 200rpx;
      border-bottom: 2rpx solid #eee;
      &:nth-child(2n + 1) //取奇数的子元素即：（0+1），（2+1）等
        border-right: 2rpx solid #eee;
</style>