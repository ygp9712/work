<template>
  <div class="container">
    <div class="question-list">
      <div class="list-item" @click="goQuestion(item)" v-for="(item, index) of questionList" :key="index">
        {{item.title}}
        <p class="item-num">{{item.replyNum}}回复&nbsp&nbsp&nbsp&nbsp{{item.visitNum}}浏览</p>
      </div>
    </div>
    <div class="add-question">
      <span class="iconfont iconbi"></span>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  name: 'question',
  data() {
    return {
      questionList: [/* {
        replyNum: 0,
        visitNum: 0,
        nickname: 'null',
        title: '第一天问'
      },{
        replyNum: 0,
        visitNum: 0,
        nickname: 'null',
        title: '第二天问第二天问第二天问第二天问第二天问第二天问第二天问第二天问第二天问第二天问第二天问第二天问第二天问第二天问第二天问第二天问'
      } */]
    }
  },
  methods: {
    async goQuestion(e) {
      await request('/clickQuestion', { id: e.id })
      console.log(e);
      wx.navigateTo({
        url: `/pages/questionPage/main?id=${e.id}`
      })
    }
  },
  async mounted() {
    this.questionList = await request('/getQuestionList');
  },
}
</script>

<style lang="stylus" scoped>
  .container
    .question-list
      .list-item
        display: block;
        padding: 30rpx 25rpx;
        border-bottom: 2rpx solid #f2f2f2;
        font-weight: bold;
        font-size: 30rpx;
        margin-bottom: 15rpx;
        .item-num
          margin-top: 20rpx;
          font-weight: normal;
          font-size: 26rpx;
          color: #96CDCD;
    .add-question
      position: fixed;
      right: 40px;
      bottom: 40px;
      display: block;
      width: 120rpx;
      height: 120rpx;
      line-height: 120rpx;
      text-align: center;
      border-radius: 50%;
      background: #f2f2f2;
</style>