<template>
  <div class="root">
    <div class="bar">
      推荐图书
    </div>
    <div class="bookList">
      <div class="list">
        <div @click="toDetail(item.id, item.subject)" class="bookItem" v-for="(item, index) of booksArr" :key="index" >
          <img :src="item.src" alt="">
          <p class="bookTitle">{{item.title}}</p>
          <p class="bookWriter">{{item.writer}}</p>
        </div>
        <div class="bookitem more" @click="toBookList()">
          更多
        </div>
      </div>
    </div>
  </div >
</template>

<script>
import request from '../../../utils/request';
export default {
  name: 'IndexBook',
  data() {
    return {
      booksArr: [{
        src: 'http://img10.360buyimg.com/n1/jfs/t1/36854/19/1565/207321/5cb3e59dEa8f397ca/f3ce691a81601d88.jpg',
        title: '2021考研英语红宝书考研英语词汇',
        writer: '考研英语命题研究组',
        id: 1,
        subject: 'english'
      },{
        src: 'http://img10.360buyimg.com/n1/jfs/t1/101845/15/10913/332723/5e21aed7E7c2a7158/d2b2f851e26dc933.jpg',
        title: '张宇考研数学(2021)36讲+1000题（数一）',
        writer: '张宇',
        id: 1,
        subject: 'math'
      },{
        src: 'http://img3m6.ddimg.cn/53/21/28485026-1_u_3.jpg',
        title: '2021肖秀荣考研政治知识点精讲精练',
        writer: '肖秀荣',
        id: 1,
        subject: 'politics'
      }]
    }
  },
  methods: {
    async toDetail (id, subject) {
      await request('/addHistory', {item_id : id, item_type: 'book', item_class : subject})
      wx.navigateTo({
        url:`/pages/detail/main?id=${id}&subject=${subject}`
      })
    },
    toBookList () {
      wx.navigateTo({
        url:'/pages/bookList/main'
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
  .bar
    display: block;
    height: 100rpx;
    line-height: 100rpx;
    text-indent: 40rpx;
    background: #008B00;
    color: #ffffff;
    border-bottom: 4rpx solid #f2f2f2;
    box-shadow: 2px 2px 2px #f2f2f2;
  .bookList
    .list
      display: flex;
      flex-wrap: wrap;
      .bookItem
        box-sizing: border-box; //将边框算进宽度之中去
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 2rpx solid #eee;
        &:nth-child(2n + 1) //取奇数的子元素即：（0+1），（2+1）等
          border-right: 2rpx solid #eee;
        //弹性盒子嵌套
        .bookTitle
          display: inline-block;
          font-size: 26rpx;
          line-height: 50rpx;
          width: 300rpx;
          height: 50rpx;
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          text-align: center;
        .bookWriter
          font-size: 20rpx;
          line-height: 50rpx;
        img
          width: 200rpx;
          height: 200rpx;
          margin: 15rpx 0;
      .more
        width: 50%;
        line-height: 300rpx;
        text-align: center;
</style>