<template>
  <div class="container">
    <div class="list">
      <div class="list-item" v-for="(item, index) of articleList" :key="index" @click="toArticle(item)">
        <p class="item-title" v-html="item.title"></p>
        <span class="item-time">{{item.time}}</span>
      </div>
    </div>
    <div class="pagination" v-if="multiPage">
      <div :class="leftClass" @click="toBackPage()">上一页</div>
      <span class="page">{{page}} / {{maxPage}}</span>
      <div :class="rightClass" @click="toNextPage()">下一页</div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  name: 'ArticleList',
  data() {
    return {
      isLogin: '',
      articleList: [],
      page: 1,
      maxPage: 0,
      leftBtn: 1,
      rightBtn: 1,
      multiPage: 1,
      leftClass: 'button disable',
      rightClass: 'button'
    }
  },
  async onShow () {
    wx.setNavigationBarTitle({
      title: this.$mp.query.name
    }) 
    this.isLogin = wx.getStorageSync('token');
    let result =  await request('/getArticleList', {listName: this.$mp.query.listName, page: this.page});
    let result2 = await request('/getArticleListMax', {listName: this.$mp.query.listName});
    this.articleList = result;
    this.maxPage = Math.ceil(result2[0]["count(*)"] / 8);
    if(this.maxPage === 1) {
      this.multiPage = 0;
    } else {
      this.multiPage = 1;
    }
  },
  onUnload() {
    this.page = 1;
    this.leftClass = 'button disable';
    this.rightClass = 'button';
  },
  methods: {
    async toArticle(article) {
      /* console.log(article); */
      let mark, isLike;
      if(this.isLogin) {
        mark = await request('/addHistory', {item_id : article.id, item_name: article.title,item_type: 'article', item_class : this.$mp.query.listName})
        isLike = await request('/checkLike', {item_id : article.id, item_type: 'article', item_class : this.$mp.query.listName});
      }
      setTimeout(() => {
        if(this.isLogin) {
          wx.navigateTo({
            url:`/pages/article/main?table=${this.$mp.query.listName}&id=${article.id}&mark=${mark}&isLike=${isLike}&isLogin=${this.isLogin}`
          })
        } else  {
          wx.navigateTo({
            url:`/pages/article/main?table=${this.$mp.query.listName}&id=${article.id}&isLogin=${this.isLogin}`
          })
        }
      }, 0);
      
    },
    async toBackPage(){
      console.log('上一页');
      if (this.page === 1) return
      this.page--;
      if (this.page === 1) {
        this.leftClass = 'button disable';
      }
      if (this.rightClass === 'button disable') {
        this.rightClass = 'button';
      }
      let result =  await request('/getArticleList', {listName: this.$mp.query.listName, page: this.page});
      this.articleList = result;
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
    async toNextPage(){
      console.log('下一页');
      if (this.page === this.maxPage) return
      if (this.page === 1) {
        this.leftClass = 'button';
      }
      this.page++;
      if (this.page === this.maxPage) {
        this.rightClass = 'button disable'
      }
      let result =  await request('/getArticleList', {listName: this.$mp.query.listName, page: this.page});
        this.articleList = result;
        wx.pageScrollTo({
          scrollTop: 0
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .list
      .list-item
        position: relative;
        height: 200rpx;
        line-height: 200rpx
        border-bottom: 2rpx solid #f2f2f2;
        box-shadow: 2px 2px 2px #eaeaea;
        .item-title
          display: inline-block;
          line-height: 36rpx;
          vertical-align: middle;
          font-size: 36rpx;
        .item-time
          position: absolute;
          font-size: 30rpx;
          color: #D3D3D3;
          bottom: -60rpx;
          right: 20rpx;
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