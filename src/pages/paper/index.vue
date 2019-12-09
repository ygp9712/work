<template>
  <div class="content-wrapper">
    <div class="content">
      <div class="banner">

      </div>
      <div class="bar">
      单选题
      </div>
      <!-- 下面是单选的模块 -->
      <div class="select-items">
        <div class="select-item" v-for="(item, index) of paper.singleChoice" :key="item.id">
          <div class="select-problem">{{item.id + '.' + item.problem}}</div>
          <radio-group 
          v-model="item.selected"
          @change="clickRadio">
          <radio class="select-choose" 
                 v-for="(choose, index_) of item.selectList" 
                 :key="index_"
                 :name="choose.name"
                 :value="choose.name"
                 >
            <span>{{arr[index_]}}</span>{{choose.value}}
          </radio>
        </radio-group>
        </div> 
      </div>
      <div class="bar">
      多选题
      </div>
      <!-- 下面是多选的模块 -->
      <!-- <div class="select-items">
        <div class="select-item" v-for="(item, index) of paper.multiChoice" :key="item.id">
          <div class="select-problem">{{item.id + '.' + item.problem}}</div>
          <checkbox-group v-model="paper.result.single[item.id-1]">
            <checkbox class="select-choose" 
                      v-for="(choose, index_) of item.selectList" 
                      :key="index_"
                      :name="index_"
                      :value="index_">
              <span>{{arr[index_]}}</span>{{choose}}
            </checkbox>
        </checkbox-group>
        </div> 
      </div> -->
      <button class="finish-button" type="primary" @click="handleFinish">提交</button>
      <button class="next-button" type="default">下一模块</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      paper: {},
      arr: ['A、','B、','C、','D、']
    }
  },
  methods: {
    handleFinish () {
      console.log(this.answer);
    },
    clickRadio (event) {
      
      console.log(event); 
    }
  },
  mounted () {
    this.paper = JSON.parse(this.$mp.query.paper);
    console.log(this.paper);
    wx.setNavigationBarTitle({
      title: this.paper.paper
    }) 
  }
}
</script>

<style lang="stylus" scoped>
  .banner
    height: 200rpx;
  .bar
    display: block
    text-indent: 40rpx;
    width: 100%;
    line-height: 80rpx;
    height: 80rpx;
    border: 2rpx solid #eaeaea;
    box-shadow: 2rpx 4rpx 6rpx #eaeaea;
    margin-bottom: 10rpx;
    /* background: aqua; */
  .select-problem
    margin-bottom: 20rpx;
  .select-choose
    display: block;
    margin-bottom: 10rpx;

</style>