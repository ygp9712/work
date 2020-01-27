<template>
  <div class="container">
    <div class="banner">选择科目</div>
    <div class="scroll-area">
      <div class="subject-wrapper">
        <div  :class="item.btnClass" v-for="(item, index) of subjectList" 
              :key="index" @click="scrollClick(item.subjectPort, index)">
          {{item.subjectName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../../../utils/bus'; 
export default {
  name: 'BookListScroll',
  data() {
    return {
      nowActive: 0,
      nowSubject: 'english',
      subjectList: [
        {
          subjectName: '英语',
          subjectPort: 'english',
          btnClass: 'subject-item active'
        },
        {
          subjectName: '政治',
          subjectPort: 'politics',
          btnClass: 'subject-item'
        },
        {
          subjectName: '数学',
          subjectPort: 'math',
          btnClass: 'subject-item'
        }
      ]
    }
  },
  methods: {
    scrollClick(port, index) {
      if(index === this.nowActive) return
      this.nowSubject = port;
      Bus.$emit('scrollClick', this.nowSubject)
      this.subjectList[this.nowActive].btnClass = 'subject-item';
      this.subjectList[index].btnClass = 'subject-item active';
      this.nowActive = index;
    }
  },
}
</script>

<style lang="stylus" scoped>
  .container
    background: #f2f2f2;
    .banner
      background: #ffffff;
      width: 100%;
      text-align: center;
      font-size: 28rpx;
      height: 50rpx;
      color: #006400;
      line-height: 50rpx;
    .scroll-area
      width: 100%;
      height: 100rpx;
      background: #ffffff;
      white-space: nowrap;
      overflow: scroll;
      -ms-overflow-style: none;
      .subject-wrapper
        padding: 0 30rpx;
        .subject-item
          display: inline-block;
          line-height: 80rpx;
          margin-top: 10rpx;
          margin-right: 40rpx;
          text-align: center;
          width: 220rpx;
          height: 80rpx;
          border: 2rpx solid #00868B;
          border-radius: 20rpx;
        .active
          color: #ffffff;
          background: #1E90FF;
        .subject-item:last-child
          margin-right: 0;
    ::-webkit-scrollbar
      width: 0;
      height: 0;
      color: transparent;

</style>