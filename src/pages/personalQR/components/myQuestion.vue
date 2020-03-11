<template>
  <div class="container">
    <div class="year-list" v-for="(item, index) in yearList" :key="index">
      <p class="year-text">{{item.year}}年</p>
      <div class="question-item" v-for="(item_, index_) of item.questionList" :key="item_.id" @click="goQuestion(item_.id)">
        <p class="item-title">{{item_.title}}</p>
        <span class="item-date">{{item_.date}}</span>
        <span class="item-more iconfont iconshenglvehao" @click.stop="handleMore(item_.id, index, index_)"></span>
      </div>
    </div>

    <div class="list-end" v-if="nowPage == maxPage">没有更多内容了</div>

    <van-popup
      class="popup" @close="onClose"
      :show="showPopup" position="bottom"
    >
      <div class="padding"></div>
      <div class="delete popup-item" @click="deleteQuestion()">删除</div>
      <div class="cancel popup-item" @click="onClose()">取消</div>
    </van-popup>
  </div>
</template>

<script>
import request from '../../../utils/request';
export default {
  name: 'myQuestion',
  data() {
    return {
      yearList: [],
      showPopup: false,
      nowId: 0,
      nowIndex: [],
      nowPage: 1,
      maxPage: 0
    }
  },
  methods: {
    async goQuestion(id) {
      await request('/clickQuestion', { id: id })
      wx.navigateTo({
        url: `/pages/questionPage/main?id=${id}&isLogin=true`
      })
    },
    handleMore(id, index, index_) {
      this.nowId = id;
      this.showPopup = true;
      this.nowIndex[0] = index;
      this.nowIndex[1] = index_;
      console.log(this.nowIndex);
    },
    onClose() {
      this.showPopup = false;
    },
    async deleteQuestion() {
      await request('/deleteQuestion', { id: this.nowId });
      this.yearList[0].questionList.splice(this.nowIndex[1],1);
      this.showPopup = false;
    },
    async getQuestionList(page) {
      this.questionList = await request('/personalQuestion', {page: page});
      /* this.$set(this.yearList, 2020, []); */
      this.questionList.forEach((element) => {
      let date = new Date(parseInt(element.time))
      element.date = (date.getMonth() + 1)+'月' + (date.getDay() + 1)+'日';
      element.year = date.getFullYear();
      let yearArray = this.yearList.map((item, index, array) => {
        return item.year;
      })
      if (yearArray.indexOf(element.year) >= 0) {
        this.yearList[yearArray.indexOf(element.year)].questionList.push(element);
        /* this.yearList[index].questionList.unshift(element); */
      } else {
        this.yearList.push({year: element.year, questionList: []})
        this.yearList[this.yearList.length - 1].questionList.unshift(element);
      }
    })
    }
  },
  async mounted() {
    this.maxPage = await request('/getQuestionMax');
    this.getQuestionList(1);
  },
  onReachBottom() {
    console.log(this.nowPage);
    console.log(this.maxPage);
    if(this.maxPage == this.nowPage) return;
    this.nowPage++;
    
    this.getQuestionList(this.nowPage);
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .year-list
      .year-text
        font-size: 60rpx;
        text-indent: 20px;
        border-bottom: 2px solid #f2f2f2;
      .question-item
        width: 100%;
        padding: 20px;
        border-bottom: 1px solid #f2f2f2;
        .question-item:last-child
          border-bottom: 0;
        .item-title
          width: 90%;
          max-height: 100rpx;
          font-size: 45rpx;
          margin-bottom: 10px;
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
        .item-date
          height: 60rpx;
          font-size: 35rpx;
          color: #458B74;
        .item-more
          position: absolute;
          right: 20px;
          font-size: 50rpx;
    .list-end
      width: 100%;
      text-align: center;
      font-size: 30rpx;
      line-height: 80rpx;
      height: 80rpx;
      background: #f2f2f2;
    .popup
      .popup-item
        padding: 10px 0;
        height: 100rpx;
        line-height: 100rpx;
        width: 100%;
        text-align: center;
      .delete
        border-bottom: 1px solid #eaeaea;
      
</style>