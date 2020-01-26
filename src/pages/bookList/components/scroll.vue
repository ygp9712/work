<template>
  <div class="container">
    <div class="banner">选择科目</div>
    <div class="scroll-area">
      <div class="subject-wrapper">
        <div class="subject-item" v-for="(item, index) of subjectList" :key="index" @click="scrollClick(item.subjectPort)">
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
      nowSubject: 'english',
      subjectList: [
        {
          subjectName: '英语',
          subjectPort: 'english'
        },
        {
          subjectName: '政治',
          subjectPort: 'politics'
        },
        {
          subjectName: '数学',
          subjectPort: 'math'
        }
      ]
    }
  },
  methods: {
    scrollClick(port) {
      this.nowSubject = port;
      Bus.$emit('scrollClick', this.nowSubject)
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
        .subject-item:last-child
          margin-right: 0;
    ::-webkit-scrollbar
      width: 0;
      height: 0;
      color: transparent;

</style>