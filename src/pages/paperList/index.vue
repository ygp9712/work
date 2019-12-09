<template>
  <div class="container">
    <div class="paperItem" v-for="(item, index) of paperList" :key="index" @click="goPaper(item)">
      {{item.paper}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paperList: ["1","2","3"]
    }
  },
  methods:{
    goPaper (paper) {
      wx.navigateTo({
        url:'/pages/paper/main?paper=' + JSON.stringify(paper)
      })
    }
  },
  mounted () {
    this.paperList = JSON.parse(this.$mp.query.paperList);
  }
}
</script>

<style lang="stylus" scoped>
  .paperItem
    width: 100%
    height: 100rpx
    border-bottom: 2rpx solid #eaeaea 
    line-height: 100rpx
</style>