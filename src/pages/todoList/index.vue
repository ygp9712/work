<template>
  <div class="container">
    待做事务
    <div class="add-affair" @click="handleAdd()">
      <span class="iconfont iconjiahao"></span>
      <span class="add-text">添加接下来的待做事务</span>
    </div>
    <van-popup class="add-pop" :show="addShow" 
              @close="addClose" round closeable 
              :custom-style="addPopStlye"
              close-icon-position="right">
      <van-field
        :value="addName" required
        clearable label="名称"
        placeholder="请输入事务名称"
      />
      <van-field
        :value="addTime" 
        clearable label="时间"
        placeholder="格式：YYYY--MM--DD"
        icon="clock-o"
        :click-icon="clickTime()"
      />
  </van-popup>


  <van-datetime-picker
    v-if="isShowDatetime"
    type="date"
    :value="currentDate"
    @confirm="onDateConfirm"
    @cancel="onDateCancel"
    :min-date="minDate"
    :max-date="maxDate"
/>
  </div>
</template>

<script>
import format from '../../utils/formatDateStr';
export default {
  name: 'todoList',
  data() {
    return {
      addShow: false,
      isShowDatetime: false,
      addPopStlye: "height: 1000rpx; width: 600rpx;",
      addName: '',
      dateVal: '',
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
        let time = format(new Date(e.mp.detail))
        this.dateVal = time
        console.log(time);
        this.isShowDatetime = false
        this.$emit('onConfirm', {value: this.dateVal, time: e.mp.detail})
    },
    onDateCancel () {
      this.isShowDatetime = false
    },
    handleAdd() {
      console.log(this.addShow);
      this.addShow = true;
    },
    addClose() {
      console.log(this.addShow);
      this.addShow = false;
    },
    onInput (event) {
      this.currentDate = event.detail;
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .add-affair
      position: relative;
      display: block;
      margin: 0 auto;
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
    .add-wrapper
      margin-top: 40rpx;
</style>