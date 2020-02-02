<template>
  <div class="container">
    <div class="affair-list">
      <van-swipe-cell class="affair" :left-width="65" :right-width="65"  v-for="(item, index) of affairList" :key="index">
        <div class="swipe-left" slot="left">选择</div>
        <div class="content">
          <p class="affair-name">
            {{item.name}}
          </p>
          <p class="affair-place">
            {{item.place}}
          </p>
          <span class="affair-time">
            {{item.time}}
          </span>
        </div>
        <div class="swipe-right" slot="right">删除</div>
      </van-swipe-cell>
    </div>

    <div class="add-affair" @click="handleAdd()">
      <span class="iconfont iconjiahao"></span>
      <span class="add-text">添加接下来的待做事务</span>
    </div>


    <van-overlay class="add-lay" :show="addShow">
      <div class="add-wrapper">
        <van-field
          :value="addName" required
          clearable label="名称"  
          placeholder="请输入事务名称"
          @change="changeName"
        />
        <van-field
          :value="addTime"  required
          clearable label="时间"
          placeholder="格式：YYYY-MM-DD"
          icon="clock-o"
          @change="changeTime"
          @clickIcon="clickTime"
        />
        <van-field
          :value="addPlace" required
          clearable label="地点"  
          placeholder="请输入事务地点"
          @change="changePlace"
        />
        <van-field
          :value="addDetail"  label="备注"
          type="textarea" autosize
          @change="changeDetail"
        />
        <span v-if="wrongText" class="wrong-text">{{wrongText}}</span>
        <div class="div-btn">
          <div class="btn-back btn" @click="addClose()">返回</div>
          <div class="btn-add btn" @click="addPush()">添加</div>
        </div>
      </div>
    </van-overlay>


    <van-popup :show="isShowDatetime" position="bottom">
      <van-datetime-picker
        type="date"
        :value="currentDate"
        @confirm="onDateConfirm"
        @cancel="onDateCancel"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import request from '../../utils/request';
import format from '../../utils/formatDateStr';
export default {
  name: 'todoList',
  data() {
    return {
      affairList: [],
      addShow: false,
      isShowDatetime: false,
      addName: '',
      addTime: '',
      addPlace: '',
      addDetail: '',
      wrongText: '',
      currentDate: new Date().getTime(),
      minDate: new Date().getTime(),
      maxDate: new Date((new Date().getFullYear() + 2), 11, 1).getTime()
    }
  },
  methods: {
    clickTime() {
      this.isShowDatetime = true;
    },
    onDateConfirm (e) {
        let time = format(new Date(e.mp.detail));
        this.addTime = time;
        this.isShowDatetime = false;
        this.$emit('onConfirm', {value: this.addTime, time: e.mp.detail})
    },
    onDateCancel () {
      this.isShowDatetime = false;
    },
    handleAdd() {
      this.addShow = true;
    },
    async addPush() {
      console.log(this.addName,this.addTime,this.addPlace)
      if(this.addName == '' || this.addTime == '' || this.addPlace == ''){
        this.wrongText = '你没有写完！';
        return 
      }
      let regExp = /^(?:(?!0000)[0-9]{4}([-/.]?)(?:(?:0?[1-9]|1[0-2])([-/.]?)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])([-/.]?)(?:29|30)|(?:0?[13578]|1[02])([-/.]?)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2([-/.]?)29)$/;
      let answer = regExp.test(this.addTime);
      if(answer != 1) {
        this.wrongText = '你的日期输入有误!'
        return 
      }
      let result =  await request('/addTodo', {name: this.addName, time: this.addTime, place: this.addPlace, detail: this.addDetail});
      this.addShow = false;
      this.addName = '';
      this.addTime = '';
      this.addPlace = '';
      this.addDetail = '';
    },
    addClose() {
      this.addShow = false;
    },
    changeName(event) {
      this.addName = event.mp.detail;
    },
    changeTime(event) {
      this.addTime = event.mp.detail;
    },
    changePlace(event) {
      this.addPlace = event.mp.detail;
    },
    changeDetail(event) {
      this.addDetail = event.mp.detail;
    }
  },
  async onShow() {
    let result = await request('/personalTodo');
    this.affairList = result;
    console.log(result);
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .affair-list
      .affair
        .van-swipe-cell__left
          display: inline-block;
          width: 65rpx;
          line-height: 150rpx;
          color: #ffffff;
          text-align: center;
          background: green;
        .content
          position: relative;
          display: inline-block;
          width: 100%;
          height: 150rpx;
          background: #f2f2f2;
          .affair-name
            margin-top: 20rpx;
            margin-left: 20rpx;
            font-size: 50rpx;
          .affair-place
            margin-left: 20rpx;
            font-size: 30rpx;
            color: #000080;
          .affair-time
            position: absolute;
            top: 50%;
            right: 20rpx;
            font-size: 40rpx;
            color: red;
            transform: translate(0, -50%);
    .add-affair
      position: relative;
      display: block;
      margin: 0 auto;
      margin-top: 20rpx;
      width: 90%;
      height: 150rpx;
      border: 4rpx solid black;
      border-radius: 100rpx;
      line-height: 150rpx;
      .iconjiahao
        position: absolute;
        font-size: 100rpx;
        padding-left: 40rpx;
      .add-text
        margin-left: 200rpx;
        font-size: 36rpx;
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