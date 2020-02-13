<template>
  <div class="container">
    <div class="list">
      <van-swipe-cell class="item" :right-width="150" v-for="(item, index) of personalList" :key="index">
        <div  @click="goItem(item)">
          <div class="item-content">
            <span class="item-tag" v-html="tag[item.item_type]"></span>
            <span class="item-title" v-html="item.item_name"></span>
          </div>
        </div>
        <div class="swipe-right" slot="right" @click="deleteItem(item.id, index)">删除</div>
      </van-swipe-cell>
      <!--  -->
    </div>
    <div class="pagination" v-if="maxPage != 1">
      <div :class="leftClass" @click="toBackPage()">上一页</div>
      <span class="page">{{page}} / {{maxPage}}</span>
      <div :class="rightClass" @click="toNextPage()">下一页</div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  name: 'personalPage',
  data() {
    return {
      tag: {paper: '<span style="color: red">[试卷]</span>',
            book: '<span style="color: blue">[书籍]</span>',    
            article: '<span style="color: #008B00">[文章]</span>'
      },
      personalList: [],
      //id  item_class item_id item_type user_id
      page: 1,
      maxPage: 0,
      leftClass: 'button disable',
      rightClass: 'button',
      isLogin: true
    }
  },
  methods: {
    async goItem(item) {
      let isLike = await request('/checkLike', {item_id : item.item_id, item_type: item.item_type, item_class : item.item_class});
      let mark = await request('/addHistory', {item_id : item.item_id, item_name: item.item_name,item_type: item.item_type, item_class : item.item_class})
        if(item.item_type === 'book') {
          wx.navigateTo({
            url:`/pages/detail/main?id=${item.item_id}&subject=${item.item_class}&mark=${mark}&isLike=${isLike}&isLogin=${this.isLogin}`
          })
        }
        if(item.item_type === 'article') {
          wx.navigateTo({
            url:`/pages/article/main?table=${item.item_class}&id=${item.item_id}&mark=${mark}&isLike=${isLike}&isLogin=${this.isLogin}`
          })
        }
        if(item.item_type === 'paper') {
          wx.navigateTo({
            url: `/pages/paperList/main?port=${item.item_class}&isLike=${isLike}`
          })
        }
    },
    async toBackPage() {
      if (this.page === 1) return
        this.page--;
        if (this.page === 1) {
          this.leftClass = 'button disable';
        }
        if (this.rightClass === 'button disable') {
          this.rightClass = 'button';
        }
        let result = await request(`/personal${this.$mp.query.to}`, {page: this.page});
        this.personalList = result;
        wx.pageScrollTo({
          scrollTop: 0
        })
    },
    async toNextPage() {
      console.log('下一页');
        if (this.page === this.maxPage) return
        if (this.page === 1) {
          this.leftClass = 'button';
        }
        this.page++;
        if (this.page === this.maxPage) {
          this.rightClass = 'button disable'
        }
        let result = await request(`/personal${this.$mp.query.to}`, {page: this.page});
        this.personalList = result;
        wx.pageScrollTo({
          scrollTop: 0
        })
    },
    async deleteItem(id, index) {
      await request('/deletePersonal', { type: this.$mp.query.to, id: id });
      this.personalList.splice(index, 1);
    }
  },
  async onShow() {
    wx.setNavigationBarTitle({
      title: this.$mp.query.name
    })
    let result = await request(`/personal${this.$mp.query.to}`, {page: 1});
    this.personalList = result;
    this.maxPage = await request(`/get${this.$mp.query.to}Max`);
  },
  onUnload() {
    this.page = 1;
    this.leftClass = 'button disable';
    this.rightClass = 'button';
  }
}
</script>

<style lang="stylus">
  .container
    display: block;
    background: #f2f2f2;
    width: 100%;
    .van-swipe-cell__right {
      display: inline-block;
      width: 150rpx;
      height: 180rpx;
      font-size: 15px;
      line-height: 180rpx;
      background: red;
      color: #fff;
      text-align: center;
    }
    .list
      .item
        background: #ffffff;
        .item-content
          display: flex;
          padding-left: 10rpx;
          width: 100%;
          font-size: 36rpx;
          background: #ffffff;
          height: 180rpx;
          line-height: 180rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
    .pagination
      margin-top: 60rpx;
      padding-bottom: 60rpx;
      width: 100%;
      display: inline-block;
      text-align: center;
      .page
        font-size: 30rpx;
        padding: 0 20rpx;
      .button
        display: inline-block;
        width: 200rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        color: #ffffff;
        font-size: 34rpx;
        background: #1b644a;
        line-height: 80rpx;
        border: 2rpx solid #f2f2f2
        border-radius: 16rpx;
      .disable
        background: #eaeaea;
</style>