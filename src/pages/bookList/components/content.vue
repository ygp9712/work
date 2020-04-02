<template>
  <div class="container" @touchmove="touchmoveCallback" @touchstart="touchstartCallback">
    <div class="book-items">
      <div class="book" v-for="(item, index) of bookList" :key="index" @click="toDetail(item.id, item.title)">
        <div class="img">
          <img class="book-img" mode="widthFix" :src="item.src" alt="">
        </div>
        <div class="main">
          <div class="box-wrapper">
            <span class="book-title">{{item.title}}</span>
            <span class="book-writer">{{item.writer}}</span>
            <span class="book-publisher">{{item.publisher}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../../../utils/bus'; 
import request from '../../../utils/request';
export default {
  name: 'ListContent',
  data() {
    return {
      isLogin: '',
      bookList: [],
      subject: 'english',
      startX: '',
      timer: ''
    }
  },
  methods: {
    touchstartCallback(e) {
      this.startX = e.clientX;
      // 当两根手指放上去的时候，将距离(distance)初始化。
    },
    touchmoveCallback(e) {
      //函数防抖
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (this.startX - e.clientX > 100) {
          /* console.log('向左滑动了') */
          Bus.$emit('toRight', this.subject)
        } else if (this.startX - e.clientX < -100) {
          /* console.log('向右滑动了'); */
          Bus.$emit('toLeft', this.subject)
        }
      }, 300)  
    },
    async toDetail (id, title) {
      let mark, isLike;
      if (this.isLogin) {
        console.log('添加历史记录');
        mark = await request('/addHistory', {item_id : id, item_name: title,item_type: 'book', item_class : this.subject});
        isLike = await request('/checkLike', {item_id : id, item_type: 'book', item_class : this.subject});
      }
      setTimeout(() => {
        if (this.isLogin){
          wx.navigateTo({
            url: `/pages/detail/main?id=${id}&subject=${this.subject}&mark=${mark}&isLike=${isLike}&isLogin=${this.isLogin}`
          })
        } else {
          wx.navigateTo({
            url: `/pages/detail/main?id=${id}&subject=${this.subject}&isLogin=${this.isLogin}`
          })
        }
      }, 0);
    },
    async getList() {
      let result = await request('/getBookList', {subject : this.subject});
      this.bookList = result;
    }
  },
  mounted() {
    Bus.$on('scrollClick', (port) => {
      this.subject = port;
      this.getList();
    })
    this.getList();
    this.isLogin = wx.getStorageSync('token');
  },
  onShow () {
    this.getList();
    this.isLogin = wx.getStorageSync('token');
  }
}
</script>

<style lang="stylus" scoped>
  .container
    height: 100%;
    margin-top: 30rpx;
    .book-items
      display: flex;
      flex-direction: column;
      align-items: center;
      .book
        display: block;
        width: 92%;
        height: 300rpx;
        background: #ffffff;
        margin-bottom: 60rpx;
        border-radius: 15rpx;
        .img
          position: relative;
          width: 30%
          height: 100%;
          float: left;
          .book-img
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
        .main
          height: 100%;
          width: 70%;
          overflow: hidden;
          .box-wrapper
            padding: 20rpx;
            display: flex;
            flex-direction: column;
            .book-title
              display: block;
              width: 100%;
              height: 100rpx;
              font-size: 37rpx;
              overflow: hidden
              text-overflow: ellipsis
            .book-writer 
              margin: 30rpx 0rpx;
              font-size: 34rpx;
              color: #FF8C69;
            .book-publisher
              color: 	#1C86EE;
</style>