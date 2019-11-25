<template>
  <div class="searchContainer">
    <div class="searchHeader">
      <input @confirm="handleSearch" confirm-type="搜索" v-model="searchContent" class="searchInput" type="text" placeholder="书中自有黄金屋" placeholder-class="placeholder">
      <span v-show="searchContent" @click="clearSearch" class="clear">X</span>
    </div>
    <div v-if="booksItem">
    <books-list :booksItem="booksItem"></books-list>
    </div>
  </div>
</template>

<script>
import BooksList from '../booksList/index';
import request from '../../utils/request';
export default {
  data () {
    return {
      searchContent: "",
      booksItem: []
    }
  },
  methods: {
    clearSearch () {
      this.searchContent = "",
      this.booksItem = ""
    },
    async handleSearch () {
      let data = {
        req: this.searchContent
      }
      //获取用户输入的内容
       let result =  await request('/searchBooks', data);
       this.booksItem = result;
      //发送请求给服务器获取数据
    }
  },
  components: {
    BooksList
  }
}
</script>

<style lang="stylus" scoped>
  .searchContainer
    .searchHeader
      position: relative
      width: 80%
      height: 80rpx
      margin: 10rpx auto
      border-bottom: 2rpx solid #1b644a
      .searchInput
        height: 100%
        width: 100%
        line-height: 80rpx
        font-size: 28rpx
        text-indent: 200rpx
      .clear
        z-index: 10
        position: absolute
        top: 22rpx
        font-size: 28rpx
        right: 10rpx
        
</style>