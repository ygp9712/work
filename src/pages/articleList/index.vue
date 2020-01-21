<template>
  <div class="container">
    <div class="list">
      <div class="list-item" v-for="(item, index) of articleList" :key="index" @click="toArticle(item)">
        <p class="item-title" v-html="item.title"></p>
      </div>
    </div>
    <div class="pagination" v-if="multiPage">
      <div class="button disable" @click="toBackPage()">上一页</div>
      <span class="page">第{{page}}页</span>
      <div class="button" @click="toNextPage()">下一页</div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  name: 'ArticleList',
  data() {
    return {
      articleList: [],
      page: 1,
      leftBtn: 1,
      rightBtn: 1,
      multiPage: 1
    }
  },
  async mounted () {
    wx.setNavigationBarTitle({
      title: this.$mp.query.name
    }) 
    console.log(this.$mp.query);
    let result =  await request('/getArticleList', {listName: this.$mp.query.listName, page: this.page});
    this.articleList = result;
  },
  methods: {
    toArticle(article) {
      console.log(article);
      wx.navigateTo({
        url:`/pages/article/main?table=${this.$mp.query.listName}&id=${article.id}`
      })
    },
    async toBackPage(){
      console.log('上一页');
      if(this.page === 1) return
      this.page--;
      let result =  await request('/getArticleList', {listName: this.$mp.query.listName, page: this.page});
      this.articleList = result;
    },
    async toNextPage(){
      console.log('下一页');
      let result =  await request('/getArticleList', {listName: this.$mp.query.listName, page: this.page+1});
      if (result[0]){
        this.articleList = result;
        this.page++;
      }
      console.log(result);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .list
      .list-item
        height: 200rpx;
        line-height: 200rpx
        border-bottom: 2rpx solid #f2f2f2;
        box-shadow: 2px 2px 2px #eaeaea;
        .item-title
          display: inline-block;
          line-height: 36rpx;
          vertical-align: middle;
          font-size: 36rpx;
    .pagination
      margin-top: 60rpx;
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