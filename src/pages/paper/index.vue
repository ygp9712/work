<template>
  <div class="container">
    <zhengzhi :prepaper="this.paper" v-if="currentPaper=='zhengzhi'"></zhengzhi>
    <yingyuyi :prepaper="this.paper" v-if="currentPaper=='yingyuyi'"></yingyuyi>
  </div>
</template>

<script>
import zhengzhi from './components/zhengzhi.vue';
import yingyuyi from './components/yingyuyi.vue';
export default {
  data () {
    return {
      currentPaper: '',
      paper: ''
    }
  },
  components: {
    zhengzhi,
    yingyuyi
  },
  methods: {
  },
  mounted () {
    this.currentPaper = this.$mp.query.port;
    //↓↓↓↓↓↓↓获取试卷↓↓↓↓↓↓↓
    try {
      var value = wx.getStorageSync('paper')
      if (value) {
        this.paper = value;
      }
    } catch (e) {
        console.log('获取试卷失败！');
    }
    //↑↑↑↑↑↑↑↑获取试卷↑↑↑↑↑↑↑
  }
}
</script>

<style lang="stylus" scoped>

</style>