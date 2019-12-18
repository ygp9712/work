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
          <div class="prompt-wrapper">
            <div class="static" v-bind:class="[{right: item.right}, {wrong: !item.right}]" v-if="correctAnswer.single">
              <span>你的答案：{{arr[answer.single[index]-1]}}<br></span>
              <span>正确答案：{{arr[correctAnswer.single[index]-1]}}</span>
              <div class="answer-btn" @click="showPic(paper.paper+'/s'+item.id)">查看答案</div>
            </div>
          </div>
        </div> 
      </div>
      <!-- 单选模块结束 -->
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
           <div class="prompt-wrapper">
            <div class="static" v-bind:class="[{right: item.right}, {wrong: !item.right}]" v-if="correctAnswer.multi">
                <div>你的答案：
                  <span class="multi-answer" v-for="(answer, index__) of answer.multi[index]" :key="index__">
                    {{arr[answer -1]}}
                  </span>
                </div><br>
                <div>正确答案：
                  <span class="multi-answer" v-for="(cAnswer, index__) of correctAnswer.multi[index]" :key="index___">
                    {{arr[cAnswer -1]}}
                  </span>
                </div>
                <div class="answer-btn" @click="showPic(paper.paper+'/m'+item.id)">查看答案</div>
            </div>
           </div>
        </div> 
        <!-- 多选模块结束 -->
      </div>
      <button class="finish-button" type="primary" @click="handleFinish">提交</button>
      <button class="next-button" type="default">下一模块</button>
      <div class="modal" v-if="modalShow">
        <div class="close" @click="closeModal">X</div>
        <div class="pic-wrapper">
          <img id="answer-pic" class="modal-pic" mode="widthFix" src=""></div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
import config from '../../utils/config';
export default {
  data () {
    return {
      correctAnswer: {},
      answer: {"single": [], "multi": []},
      paper: {},
      arr: ['A','B','C','D'],
      modalShow: false,
      imgur: config.imgur
    }
  },
  methods: {
    async handleFinish () {
      try{
      //检查单选有没有做完
       for(let i=0;i<this.paper.singleChoice.length;i++){
        if (this.answer.single[i] === undefined)
        error("没有做完！");
      }
      
      //检查多选有没有做完
      for(let i=0;i<this.paper.multiChoice.length;i++){
        if (this.answer.multi[i] === undefined || this.answer.multi[i] == '')
        error("没有做完！");
      }

      //从服务器拉取答案
      console.log("做完了！");
      let paper = this.paper.paper;
      let result = await request('/checkAnswer', {paper});
      this.correctAnswer = result;
      
      //核对单选题答案
      for(let i=0;i<this.paper.singleChoice.length;i++){
        if (this.answer.single[i] == this.correctAnswer.single[i])
          {this.paper.singleChoice[i].right = 1;}
      }
      //核对多选题答案
      for(let i=0;i<this.paper.multiChoice.length;i++){
        for(let j=0;j<this.correctAnswer.multi[i].length;j++){
          if(this.answer.multi[i][j] != this.correctAnswer.multi[i][j])
          this.paper.multiChoice[i].right = 0;
        }
      }
      } catch(e) {
        console.log(e);
      }

    },
    clickRadio (event) {
      this.answer.single[event.target.id] = event.target.value;
      /* console.log(event.target.id); 
      console.log(event.target.value); */
    },
    clickMulti (event) {
      this.answer.multi[event.target.id] = event.target.value.sort();
       /* console.log(this.answer.multi[event.target.id]);  */
    },
    closeModal () {
      this.modalShow = false;
    },
    showPic (name) {
      console.log(name);
      let query = wx.createSelectorQuery();
      let pic = query.select('#answer-pic');
      let src = this.imgur+name+'.png';
      pic.src= src;
      console.log(pic);
      this.modalShow = true;
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
  .content
    background: #f3f7fc;
    .banner
      height: 200rpx;
    .bar
      background: white;
      display: block
      text-indent: 40rpx;
      width: 100%;
      line-height: 80rpx;
      height: 80rpx;
      border: 2rpx solid #eaeaea;
      box-shadow: 2rpx 4rpx 6rpx #eaeaea;
      margin-bottom: 10rpx;
      /* background: aqua; */
    .select-item
      background: white;
      margin: 20rpx;
      border: 2rpx #eaeaea solid;
      border-radius: 10rpx;
      padding: 20rpx 10rpx;
      .select-problem
        margin-bottom: 20rpx;
      .select-choose
        display: block;
        margin-bottom: 10rpx;
      .prompt-wrapper
        position: relative;
        .right
          border: 2rpx #eaeaea solid;
          border-radius: 10rpx;
          padding: 10rpx;
          background: #98FB98;
        .wrong
          border: 2rpx #eaeaea solid;
          border-radius: 10rpx;
          padding: 10rpx;
          background: #FF6A6A;
        .answer-btn
          position: absolute;
          background: #eaeaea;
          right: 20rpx;
          top: 50% - 26.8rpx;
          display: block;
          width: 200rpx;
          height: 60rpx;
          text-align: center;
          line-height: 60rpx;
    .modal
      z-index: 20;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      .close
        z-index: 21;
        position: absolute;
        right: 40rpx;
        top: 40rpx;
        text-indent: 23rpx;
        line-height: 100rpx;
        font-size: 80rpx;
        border: 10rpx white solid;
        border-radius: 100rpx;
        color: white;
        width: 100rpx;
        height: 100rpx;
      .pic-wrapper
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%
        .modal-pic
          width: 100%;


</style>