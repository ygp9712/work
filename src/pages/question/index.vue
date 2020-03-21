<template>
  <div class="container">
    <div class="question-list">
      <div class="list-item" @click="goQuestion(item)" v-for="(item, index) of questionList" :key="index">
        {{item.title}}
        <p class="item-num">{{item.replyNum}}回复&nbsp;&nbsp;&nbsp;&nbsp;{{item.visitNum}}浏览</p>
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
        <van-button class="upload" @click="uploadImgHandle()" type="primary">上传图片</van-button>
        <p style="text-align: center; color: red; font-size: 24rpx;">*最多只能上传三张图片</p>
        <div class="temp-img" v-if="tempImg">
          <img class="img-item" :src="item" alt="" v-for="(item, index) of tempImg" :key="index">
        </div>
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
      imageList: [],
      tempImg: [],
      fileIDs: [],
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
      wrongText: '',
      nowPage: 1,
      maxPage: 0,
      cloudPath: ''
    }
  },
  methods: {
    uploadImgHandle()  {
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res=> {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          this.tempImg = tempFilePaths;
        }
      })
      console.log(this.tempImg);
    },
    async goQuestion(e) {
      await request('/clickQuestion', { id: e.id })
      console.log(e);
      wx.navigateTo({
        url: `/pages/questionPage/main?id=${e.id}&isLogin=${this.isLogin}`
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
      this.tempImg = [];
    },
    async addPush() {
      if (this.addQuestion.title == "" || this.addQuestion.content==""||this.addQuestion.title == undefined||this.addQuestion.content == undefined) {
        this.wrongText = '你没有写完！';
        return 
      }
        wx.cloud.init();
        wx.showLoading({
          title: '提交中',
        })
        const promiseArr = []
        //只能一张张上传 遍历临时的图片数组
        for (let i = 0; i < this.tempImg.length;i++) {
          let filePath = this.tempImg[i]
          let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
          //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
          promiseArr.push(new Promise((reslove,reject)=>{
            wx.cloud.uploadFile({
              cloudPath: 'questionImage/'+new Date().getTime() + suffix,
              filePath: filePath, // 文件路径
            }).then(res => {
              // get resource ID
              console.log(res.fileID)
              this.fileIDs = this.fileIDs.concat(res.fileID)
              reslove()
            }).catch(error => {
              console.log(error)
            })
          }))
        }
        Promise.all(promiseArr).then(async (res)=>{
          console.log(this.fileIDs);
          let time = new Date().getTime();
          let answer = await request('/addQuestion', {nickName : this.userInfo.nickName, avatarUrl : this.userInfo.avatarUrl, title : this.addQuestion.title, content : this.addQuestion.content, imageArray : this.fileIDs, time : time})
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
          this.fileIDs = [];
          this.tempImg = [];
          wx.hideLoading()
          wx.showToast({
            title: '提交成功',
          })
        })
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
    this.nowPage = 1;
    this.questionList = await request('/getQuestionList', {page: 1});
    this.maxPage = await request('/getQuestionListMax');
    this.isLogin = wx.getStorageSync('token');
    if (this.isLogin) {
      this.userInfo = wx.getStorageSync('userInfo');
      console.log(this.userInfo);
    }
  },
  async onReachBottom() {
    if(this.maxPage == this.nowPage) return;
    this.nowPage++;
    let data = await request('/getQuestionList', {page: this.nowPage});
    data.forEach((element) => {
      this.questionList.push(element);
    })
    console.log(this.maxPage);
  }
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
        .upload
          margin-top: 20px;
          align-self: center;
        .temp-img
          margin-top: 20px;
          .img-item
            width: 180rpx;
            height: 180rpx;
            border: 1px solid green;
            margin-left: 20rpx;
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