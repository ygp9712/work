<template>
  <div class="container">
    <div class="question-list">
      <div class="list-item" @click="goQuestion(item)" v-for="(item, index) of questionList" :key="index">
        {{item.title}}
        <p class="item-num">{{item.replyNum}}回复&nbsp&nbsp&nbsp&nbsp{{item.visitNum}}浏览</p>
      </div>
    </div>
    <div class="add-question" @click="addOpen()">
      <span class="iconfont iconbi"></span>
    </div>

    <van-overlay class="add-lay" :show="addShow">
      <div class="add-wrapper">
        <span class="add-banner">提出问题</span>
        <van-field
          :value="addQuestion.title"
          label="标题"
          required clearable
          placeholder="请输入问题的标题"
          @change="changeTitle"
        />
        <span class="text"><span style="color: red;">* </span>内容</span>
        <van-field
          :value="addQuestion.content"
          type="textarea"
          placeholder="请输入问题的详细描述"
          autosize
          @change="changeContent"
        />
        <span v-if="wrongText" class="wrong-text">{{wrongText}}</span>
        <div class="div-btn">
          <div class="btn-back btn" @click="addClose()">返回</div>
          <div class="btn-add btn" @click="addPush()">添加</div>
        </div>
      </div>
    </van-overlay>

    <van-dialog
      use-slot
      title="提示"
      :show="showDialog"
      @close="closeDialog"
    >
      <p style="text-align: center;padding: 40px 0;">请先登录</p>
    </van-dialog>
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
      } */],
      addShow: false,
      showDialog: false,
      addQuestion: {},
      isLogin: '',
      userInfo: {},
      wrongText: ''
    }
  },
  methods: {
    async goQuestion(e) {
      await request('/clickQuestion', { id: e.id })
      console.log(e);
      wx.navigateTo({
        url: `/pages/questionPage/main?id=${e.id}`
      })
    },
    closeDialog(){
      this.showDialog = false;
    },
    addOpen() {
      if(this.isLogin) {
        this.addShow = true;
      } else {
        /* console.log('没有登录') */
        this.showDialog = true;
      }
    },
    addClose() {
      this.addShow = false;
    },
    async addPush() {
      if (this.addQuestion.title == "" || this.addQuestion.content==""||this.addQuestion.title == undefined||this.addQuestion.content == undefined) {
        this.wrongText = '你没有写完！';
        return 
      }
      let time = new Date().getTime();
      let answer = await request('/addQuestion', {nickName : this.userInfo.nickName, avatarUrl : this.userInfo.avatarUrl, title : this.addQuestion.title, content : this.addQuestion.content, time : time})
      this.questionList.splice(0, 0,{
        id: answer.insertId,
        replyNum: 0,
        visitNum: 0,
        nickName: this.userInfo.nickName,
        title: this.addQuestion.title
      })
      this.addShow = false;
      this.addQuestion = {};
      this.wrongText = '';
    },
    changeTitle(e) {
      this.addQuestion.title = e.mp.detail;
      /* console.log(this.addQuestion.title); */
    },
    changeContent(e) {
      this.addQuestion.content = e.mp.detail;
    }
  },
  async onShow() {
    this.questionList = await request('/getQuestionList');
    this.isLogin = wx.getStorageSync('token');
    if (this.isLogin) {
      this.userInfo = wx.getStorageSync('userInfo');
      console.log(this.userInfo);
    }
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
    .add-lay
      position: relative;
      .add-wrapper
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        padding: 20rpx;
        /* align-items: center; */
        /* justify-content: center; */
        width: 85%;
        background: #ffffff;
        border-radius: 20rpx;
        .add-banner
          text-align: center;
        .text
          text-indent: 8px;
          font-size: 15px;
        .wrong-text
          margin-top: 10rpx;
          font-size: 26rpx;
          text-indent: 30rpx;
          color: red;
        .div-btn
          display: inline-block;
          text-align: center;
          margin-top: 40rpx;
          .btn
            display: inline-block;
            width: 240rpx;
            height: 100rpx;
            line-height: 100rpx;
            text-align: center;
            border: 2rpx solid #f2f2f2;
            border-radius: 10rpx;
          .btn-back
            margin-right: 50rpx;
            background: #F8F8FF;
          .btn-add
            background: #1989fa;
            color: #ffffff;
</style>