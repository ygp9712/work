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
          :id="item.id - 1"
          @change="clickRadio">
            <radio v-for="(choose, index_) of item.selectList" 
                 :key="index_"
                 class="select-choose" 
                 :name="choose.name"
                 :value="choose.name"
                 >
             <span>{{arr[index_]}}、</span>{{choose.value}}
            </radio>
          </radio-group>
          <div v-if="correctAnswer.single">
            <span>你的答案：{{arr[answer.single[index]-1]}}<br>
                  正确答案：{{arr[correctAnswer.single[index]-1]}}</span>
          </div>
        </div> 
      </div>
      <div class="bar">
      多选题
      </div>
      <!-- 下面是多选的模块 -->
      <div class="select-items">
        <div class="select-item" v-for="(item, index) of paper.multiChoice" :key="item.id">
          <div class="select-problem">{{item.id + '.' + item.problem}}</div>
          <checkbox-group 
            :id="item.id - 1"
            @change="clickMulti">
            <checkbox class="select-choose" 
                      v-for="(choose, index_) of item.selectList" 
                      :key="index_"
                      :name="choose.name"
                      :value="choose.name">
              <span>{{arr[index_]}}、</span>{{choose.value}}
            </checkbox>
        </checkbox-group>
        </div> 
      </div>
      <button class="finish-button" type="primary" @click="handleFinish">提交</button>
      <button class="next-button" type="default">下一模块</button>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  data () {
    return {
      correctAnswer: {},
      answer: {"single": [], "multi": []},
      paper: {},
      arr: ['A','B','C','D']
    }
  },
  methods: {
    async handleFinish () {
      try{
       for(let i=0;i<this.paper.singleChoice.length;i++){
        if (this.answer.single[i] === undefined)
        error();
      }

      for(let i=0;i<this.paper.multiChoice.length;i++){
        if (this.answer.multi[i] === undefined || this.answer.multi[i] == '')
        error();
      }
      console.log("做完了！");
      let paper = this.paper.paper;
      let result = await request('/checkAnswer', {paper});
      this.correctAnswer = result;
      console.log(this.answer);
      console.log(this.correctAnswer);
      } catch(e) {
        console.log("你没有做完！");
      }

    },
    clickRadio (event) {
      this.answer.single[event.target.id] = event.target.value;
      /* console.log(event.target.id); 
      console.log(event.target.value); */
    },
    clickMulti (event) {
      this.answer.multi[event.target.id] = event.target.value;
      /* console.log(event); */
    }
  },
  mounted () {
    this.correctAnswer = {},
    this.paper = JSON.parse(this.$mp.query.paper);
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