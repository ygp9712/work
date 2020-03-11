<template>
  <div class="container">
    <my-question v-if="showMyQ"></my-question>
    <my-reply v-if="showMyR"></my-reply>
    <other-reply v-if="showOtherR"></other-reply>
  </div>
</template>

<script>
import myQuestion from './components/myQuestion.vue';
import myReply from './components/myReply.vue';
import otherReply from './components/otherReply.vue';
export default {
  name: 'personalQR',
  data() {
    return {
      showMyQ: false,
      showMyR: false,
      showOtherR: false
    }
  },
  components: {
    myQuestion,
    myReply,
    otherReply
  },
  onShow() {
    console.log(this.$mp.query.to);
    if(this.$mp.query.to === 'myQuestion') {
      this.showMyQ = true;
      wx.setNavigationBarTitle({
        title: '我的提问'
      })
    } else if (this.$mp.query.to === 'myReply') {
      this.showMyR = true;
      wx.setNavigationBarTitle({
        title: '我的回答'
      })
    } else {
      this.showOtherR = true;
      wx.setNavigationBarTitle({
        title: '他人回复'
      })
    }
  },
  onUnload() {
    this.showMyQ = false;
    this.showMyR = false;
    this.showOtherR = false;
  }
}
</script>

<style lang="stylus" scoped>
  
</style>