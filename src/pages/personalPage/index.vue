<template>
  <div class="container">
    历史记录页面
    <div class="list">
      <div class="item" v-for="(item, index) of historyList" :key="index" @click="goPage(item)">
        <div class="item-content">
          <span class="item-tag" v-html="tag[item.item_type]"></span>
          <span class="item-title" v-html="item.item_name"></span>
        </div>
      </div>
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
      historyList: []
      //id  item_class item_id item_type user_id
    }
  },
  methods: {
  async goPage(item) {
    let mark = await request('/addHistory', {item_id : item.item_id, item_name: item.item_name,item_type: item.item_type, item_class : item.item_class})
      if(item.item_type === 'book') {
        wx.navigateTo({
          url:`/pages/detail/main?id=${item.item_id}&subject=${item.item_class}&mark=${mark}`
        })
      }

      if(item.item_type === 'article') {
        wx.navigateTo({
          url:`/pages/article/main?table=${item.item_class}&id=${item.item_id}&mark=${mark}`
        })
      }

      if(item.item_type === 'paper') {
        wx.navigateTo({
          url: `/pages/paperList/main?port=${item.item_class}`
        })
      }
    }
  },
  async mounted() {
    let result = await request('/personalHistory');
    this.historyList = result;
    console.log(this.historyList)
  },
}
</script>

<style lang="stylus" scoped>
  .container
    display: block;
    background: #f2f2f2;
    width: 100%;
    .list
      .item
        background: #ffffff;
        margin-bottom: 20rpx;
        .item-content
          display: flex;
          width: 100%;
          font-size: 36rpx;
          background: #ffffff;
          height: 180rpx;
          line-height: 180rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
</style>