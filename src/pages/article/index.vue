<template>
  <div class="container">
    <p class="title" v-html="article.title"></p>
    <div class="detail-wrapper">
      <p class="from" v-html="article.from"></p>
      <p class="time" v-html="article.time"></p>
    </div>
    <div class="content-wrapper">
      <p class="content" v-html="article.content"></p>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  name: 'Article',
  data() {
    return {
      article: {}
    }
  },
  async mounted() {
    let result =  await request('/getArticle', {id: this.$mp.query.id, table: this.$mp.query.table});
    this.article = result[0];
    console.log(this.article);
  }
}
</script>

<style lang="stylus" scoped>
    .title
      display: inline-block;
      width: 100%
      font-size: 40rpx;
      text-align: center;
      margin-bottom: 32rpx;
    .detail-wrapper
      display: inline-block;
      width: 100%;
      height: 80rpx;
      font-size: 32rpx;
      text-align: center;
      margin-bottom: 32rpx;
    .content-wrapper
      padding: 0 48rpx;
      overflow: scroll;
    img
      width: 100%;

</style>