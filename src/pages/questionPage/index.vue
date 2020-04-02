<template>
  <div class="container">
    <div class="question-wrapper">
      <span class="question-title">
        {{item.title}}
      </span>
      <p class="user-info">
        <img :src="item.avatarUrl" alt="" class="user-avatar"/>
        <span class="user-nickname">{{item.nickName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="time">{{item.before}}前</span>
      </p>
      <span class="question-content">
        {{item.content}}
      </span>
      <div class="image-area" style="margin-top: 10px;" v-if="imageList">
        <img :src="item__" alt="" mode="aspectFit" v-for="(item__, index__) of imageList" :key="index__">
      </div>
    </div> 
    <div class="comment-banner">
      <div class="block"></div>
      <span class="iconfont iconpinglun3">&nbsp;全部回贴</span>
    </div>
    <div class="comment-wrapper">
      <div class="comment-item" v-for="(item, index) of commentList" :key="item.id">
        <div class="info">
          <img :src="item.avatarUrl" alt="" class="avatar">
          <span class="nickname">{{item.nickName}}</span>
        </div>
        <div class="content">
          <span class="content-text">
            {{item.content}}
          </span>
        </div>
        <div class="reply-area" v-if="item.showReply">
          <p class="reply-item" @click="clickReply(item_, index)" v-for="(item_, index_) of item.replyList" :key="item_.id">
            {{item_.title}}:&nbsp;{{item_.content}}
          </p>
        </div>
        <div class="other">
          <span class="before">
            {{item.before}}前
          </span>
          <div class="reply" @click="handleReply(item, index)" v-if="item.temp!=true">
            回复
          </div>
        </div>
      </div>
      <div class="no-comment" v-if="commentList == ''">
        <img mode="widthFix" src="/static/imgs/surprised.png" alt="">
        <p class="text">提问暂时无人回复，快来伸出援手吧！</p>
      </div>
    </div>
    <div class="add-wrapper" v-if="showAddComment">
      <div class="block"></div>
      <div class="add-banner">
        <span class="iconfont iconpinglun">&nbsp;发表评论</span>
      </div>
      <div class="add-write">
        <div class="info">
          <img :src="userInfo.avatarUrl" alt="" class="user-avatar">
          <span class="text">说点什么...</span>
        </div>
        <div class="add-area">
          <textarea class="add-textarea" v-model="myComment" 
          cols="10" rows="4" maxlength="200"
          placeholder="点击这里输入…">
          </textarea>
          <div class="add-btn" @click="addComment()">确认</div>
        </div>
      </div>
    </div>
    <div class="reply-wrapper" v-if="showReply">
      <input id="reply-input" v-model="myReply" class="reply-input"
      focus="auto" type="text" @blur="handleBlur()" confirm-type="send" @confirm="addReply()"
      :placeholder="inputText"/>
      <div @click="addReply()" class="reply-btn">发送</div>
    </div>

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
import handleTime from '../../utils/handleTime';
import request from '../../utils/request';
export default {
  name: 'questionPage',
  data() {
    return {
      item: {},
      imageList: [],
      nowTime: '',
      commentList: [/* {"id":8,"question_id":20,"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/1MKp7S9bHm1deG98aG8qJmyrNgfoboiaHZDicE4qFCh5nGLt6dheMSdV1mcsTHgB5icR4R3rRTbDy88SO8A2Zzauw/132","nickName":"鹏","content":"哇哇哇哇哇哇哇哇","time":"1582795666918","likeNum":0},
      {"id":9,"question_id":20,"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/1MKp7S9bHm1deG98aG8qJmyrNgfoboiaHZDicE4qFCh5nGLt6dheMSdV1mcsTHgB5icR4R3rRTbDy88SO8A2Zzauw/132","nickName":"鹏","content":"问问","time":"1582795737164","likeNum":0},
      {"id":10,"question_id":20,"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/1MKp7S9bHm1deG98aG8qJmyrNgfoboiaHZDicE4qFCh5nGLt6dheMSdV1mcsTHgB5icR4R3rRTbDy88SO8A2Zzauw/132","nickName":"鹏","content":"好","time":"1582796169722","likeNum":0},
      {"id":11,"question_id":20,"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/1MKp7S9bHm1deG98aG8qJmyrNgfoboiaHZDicE4qFCh5nGLt6dheMSdV1mcsTHgB5icR4R3rRTbDy88SO8A2Zzauw/132","nickName":"鹏","content":"不好","time":"1582796215927","likeNum":0},
      {"id":13,"question_id":20,"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/1MKp7S9bHm1deG98aG8qJmyrNgfoboiaHZDicE4qFCh5nGLt6dheMSdV1mcsTHgB5icR4R3rRTbDy88SO8A2Zzauw/132","nickName":"鹏","content":"实验","time":"1582859120200","likeNum":0} */],
      nowTime: new Date().getTime(),
      myComment: '',
      myReply: '',
      nowComment: 0,
      isLogin: '',
      replyTo: {switch: 0},
      commentId: 0,
      commentName: '',
      userInfo: {},
      showReply: false,
      addCommentToggle: true,
      showDialog: false,
      inputText: '请输入文字'
    }
  },
  computed: {
    showAddComment() {
      if(this.isLogin && this.addCommentToggle) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    clickReply (item_, index) {
      console.log(item_);
      if(this.isLogin){
        this.showReply = true;
        this.commentId = item_.comment_id;
        this.nowComment = index;
        this.inputText= `回复${item_.nickName}`
        this.showReply = true;
        this.replyTo.switch = 1;
        this.replyTo.id = item_.id;
        this.replyTo.nickName = item_.nickName;
        this.addCommentToggle = false;
      } else {
        this.showDialog = true;
      }
    },
    handleReply(item, index) {
      this.replyTo = {switch: 0};
      if(this.isLogin){
        this.showReply = true;
        this.commentId = item.id;
        this.commentName = item.nickName;
        this.nowComment = index;
        this.addCommentToggle = false;
        console.log(index);
      } else {
        this.showDialog = true;
      }
    },
    handleBlur() {
      this.addCommentToggle = true;
      this.showReply = false;
      this.inputText = '请输入文字';
    },
    closeDialog(){
      this.showDialog = false;
    },
    async addComment() {
      if(!this.myComment){
        return
      } 
      let answer = await request('/addQComment', { question_id: this.item.id, question_title: this.item.title,avatarUrl: this.userInfo.avatarUrl, nickName: this.userInfo.nickName, content: this.myComment, time: this.nowTime })
      this.commentList.splice(this.commentList.length,0,{
        id: answer.insertId,
        question_id: this.item.id,
        avatarUrl: this.userInfo.avatarUrl,
        nickName: this.userInfo.nickName,
        content: this.myComment,
        replyList: [],
        before: '0秒前',
        likeNum: 0,
        time: this.nowTime,
        temp: true
      })
      this.$forceUpdate()
      this.myComment = '';
      console.log(this.commentList);
    },
    async addReply(){
      if(!this.myReply){
        return
      }
      if(this.replyTo.switch === 1){
        console.log('1');
        let answer = await request('/addQReply', { question_id: this.item.id, question_title: this.item.title,comment_id: this.commentId, nickName: this.userInfo.nickName, content: this.myReply, time: this.nowTime, replyTo: this.replyTo.id, replyName: this.replyTo.nickName, isReturn: 1}) 
        this.commentList[this.nowComment].replyList.splice(this.commentList[this.nowComment].replyList.length,0,{
          id: answer.insertId,
          question_id: this.item.id, 
          comment_id: this.commentId, 
          title: `${this.userInfo.nickName} 回复 ${this.replyTo.nickName}`,
          nickName: this.userInfo.nickName, 
          content: this.myReply, 
          time: this.nowTime
        })
        this.$forceUpdate()
        console.log(this.commentList[this.nowComment].replyList);
      } else {
        console.log('2');
        let answer = await request('/addQReply', { question_id: this.item.id, question_title: this.item.title,comment_id: this.commentId, nickName: this.userInfo.nickName, content: this.myReply, time: this.nowTime, replyTo: 'null', replyName: this.commentName, isReturn: 0 })
        this.commentList[this.nowComment].replyList.splice(this.commentList[this.nowComment].replyList.length,0,{
          id: answer.insertId,
          question_id: this.item.id, 
          question_title: this.item.title,
          comment_id: this.commentId,
          title:  this.userInfo.nickName,
          nickName: this.userInfo.nickName, 
          content: this.myReply, 
          time: this.nowTime
        })
        console.log(this.commentList[this.nowComment].replyList);
        this.$forceUpdate()
      } 
      this.myReply = '';
    }
  },
  async onShow() {
    let queryCommentList= [];
    this.showReply = false;
    this.nowTime = new Date().getTime();
    this.item = await request('/getQuestion', { id: this.$mp.query.id })
    this.item.imageArray = this.item.imageArray.replace(/\[|]/g,'').replace(/\"|"/g,'');
    this.item.imageArray = this.item.imageArray.split(',');
    this.item.before = handleTime.formatBefore(this.nowTime - this.item.time);
    queryCommentList = await request('/getQCommentList', { id: this.item.id });
    queryCommentList.forEach(async (element) => {
      element.before = handleTime.formatBefore(this.nowTime - element.time);
      element.replyList = await request('/getQReplyList', { id: element.id });
      element.replyList.forEach((element_) => {
        if (element_.isReturn) {
          element_.title = `${element_.nickName} 回复 ${element_.toName}`;
        } else {
          element_.title = element_.nickName;
        }
      })
      if (element.replyList.length != 0) {
        element.showReply = true
      } else {}
    })
    let timer = setInterval(() => {
      if (queryCommentList.length) {
        this.commentList = queryCommentList;
        console.log('评论list',this.commentList); 
        clearInterval(timer);
      }
    }, 300);
    /* setTimeout(() => {
      this.commentList = queryCommentList;
    }, 300) */
    if(this.$mp.query.isLogin) {
      this.userInfo = wx.getStorageSync('userInfo');
      this.isLogin = true;
      /* console.log(this.userInfo); */
    }
    if(this.item.imageArray != "") {
      wx.cloud.init();
      this.item.imageArray.forEach((element) => {
        wx.cloud.downloadFile({
        fileID: `${element}`
        }).then(res => {
          // get temp file path
          this.imageList.push(res.tempFilePath);
        }).catch(error => {
          // handle error
          console.log(error);
        })
      })
    }
    /*  */
    /* console.log(this.commentList); */
  },
  onUnload() {
    this.commentList = [];
    this.imageList= [];
  }
}
</script>

<style lang="stylus" scoped>
  .container
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    .question-wrapper
      background: #ffffff;
      padding: 0 20px;
      padding-bottom: 20px;
      .question-title
        font-weight: bold;
        font-size: 40rpx;
      .user-info
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        .user-avatar
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
        .user-nickname
          font-size: 30rpx;
          margin-left: 20rpx;
      .question-content
        font-size: 32rpx;
        color: #458B74;
    .comment-banner
      .block
        box-sizing: border-box;
        width: 100%;
        height: 6px;
        margin: 0 0;
        background: #f1f1f1;
      .iconpinglun3
        display: inline-block;
        background: #ffffff;
        width: 100%;
        border-bottom: 1px solid #f2f2f2;
        padding: 10px 20px;
        color: grey;
    .comment-wrapper
      display: block;
      .comment-item
        padding: 20px;
        background: #ffffff;
        border-bottom: 1px solid #eaeaea;
        .info
          font-size: 30rpx;
          height: 80rpx;
          .avatar
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
          .nickname
            margin-left: 10rpx;
        .content
          padding: 10px 0;
          padding-left: 90rpx;
          color: #458B74;
          font-size: 32rpx;
        .reply-area
          display: block;
          padding: 10px;
          margin-left: 90rpx;
          margin-bottom: 10px;
          background: #F5F5F5;
        .other
          .before
            color: 	#D3D3D3;
            font-size: 28rpx;
          .reply
            position: absolute;
            right: 40px;
            display: inline-block;
            height: 40rpx;
            line-height: 40rpx;
            text-align: center;
            width: 80rpx;
            font-size: 28rpx;
            border: 1px solid black;
            border-radius: 6px; 
      .no-comment
        padding: 100rpx 0;
        img 
          display: block;
          margin: 0 auto;
          width: 200rpx;
        .text
          margin-top: 20px;
          font-size: 30rpx;
          text-align: center;
    .add-wrapper
      .block
        display: block;
        background: #f2f2f2;
        height: 6px;
        width: 100%;  
      .add-banner
        .iconpinglun
          display: inline-block;
          background: #ffffff;
          width: 100%;
          border-bottom: 1px solid #f2f2f2;
          padding: 10px 20px;
          color: grey;
      .add-write
        padding: 20px;
        background: #ffffff;
        .info
          .user-avatar
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%; 
          .text
            font-size: 30rpx;
            margin-left: 10px;
        .add-area
          margin-top: 10px;
          .add-textarea
            box-sizing: border-box;
            border-radius: 6px;
            padding: 20rpx;
            background: #f2f2f2;
            height: 100px;
            width: 100%;
          .add-btn
            position: absolute;
            display: block;
            margin: 10px 0;
            right: 60rpx;
            border-radius: 6px;
            width: 140rpx;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            background: green;
            color: #ffffff;
    .reply-wrapper
      position: fixed;
      background: #F8F8FF;
      left: 0;
      bottom: 0;
      height: 50px;
      width: 100%;
      /* padding: 20px 0; */
      border-top: 1px solid black;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .reply-input
        display: block;
        border-radius: 4px;
        margin-left: 20px;
        background: #f2f2f2;
        height: 30px;
        width: 70%;
      .reply-btn
        width: 140rpx;
        height: 30px;
        margin-right: 20rpx;
        line-height: 30px;
        text-align: center;
        border-radius: 4px;
        background: #2E8B57;
        color: #ffffff;
</style>