<template>
  <div class="content-wrapper">
    <div class="content">
      <div class="banner">
      </div>
      <div class="bar">
        Section I User of English
      </div>
      <img style="width: 100%;" mode="widthFix" :src="imgur+'paperArticle/'+paper.paper+'_1.png'" alt="">
      <!-- 下面是Section I模块 -->
      <div class="select-items">
        <div class="select-item" v-for="item of paper.sectionI" :key="item.id">
          <div class="select-problem">{{item.id + '.' + item.problem}}</div>
          <radio-group 
          :id="item.id - 1"
          @change="clickRadio">
            <radio v-for="(item_, index_) of item.selectList" 
                :key="index_"
                class="select-choose" 
                :name="item_.name"
                :value="item_.name"
                >
            {{item_.value}}
            </radio>
          </radio-group>
          <div class="prompt-wrapper">
            <div class="static" v-bind:class="[{right: item.right}, {wrong: !item.right}]" v-if="correctAnswer.length>0">
              <span>你的答案：{{arr[answer[item.id-1]-1]}}<br></span>
              <span>正确答案：{{arr[correctAnswer[item.id-1]-1]}}</span>
              <div class="answer-btn" @click="showPic(paper.paper+'_'+item.id)">查看解析</div>
            </div>
          </div>
        </div> 
      </div>
      <!-- 上面是Section I模块 -->
      <div class="bar">
        Section II  Reading Comprehension
      </div>
      <p style="text-align: center; font-size: 36rpx; padding: 10px 0;">text 1</p>
      <img style="width: 100%;" mode="widthFix" :src="imgur+'paperArticle/'+paper.paper+'_2.png'" alt="">
      <!-- 下面是Section II text1模块 -->
      <div class="select-items" >
        <div class="select-item" v-for="item of paper.sectionIIText1" :key="item.id">
          <div class="select-problem">{{item.id + '.' + item.problem}}</div>
          <radio-group 
          :id="item.id - 1"
          @change="clickRadio">
            <radio v-for="(item_, index_) of item.selectList" 
                :key="index_"
                class="select-choose" 
                :name="item_.name"
                :value="item_.name"
                >
            {{item_.value}}
            </radio>
          </radio-group>
          <div class="prompt-wrapper">
            <div class="static" v-bind:class="[{right: item.right}, {wrong: !item.right}]" v-if="correctAnswer.length>0">
              <span>你的答案：{{arr[answer[item.id-1]-1]}}<br></span>
              <span>正确答案：{{arr[correctAnswer[item.id-1]-1]}}</span>
              <div class="answer-btn" @click="showPic(paper.paper+'_'+item.id)">查看解析</div>
            </div>
          </div>
        </div> 
      </div>
      <!-- 上面是Section II text 1模块 -->

      <p style="text-align: center; font-size: 36rpx; padding: 10px 0;">text 2</p>
      <img style="width: 100%;" mode="widthFix" :src="imgur+'paperArticle/'+paper.paper+'_3.png'" alt="">
      <!-- 下面是Section II text2模块 -->
      <div class="select-items">
        <div class="select-item" v-for="item of paper.sectionIIText2" :key="item.id">
          <div class="select-problem">{{item.id + '.' + item.problem}}</div>
          <radio-group 
          :id="item.id - 1"
          @change="clickRadio">
            <radio v-for="(item_, index_) of item.selectList" 
                :key="index_"
                class="select-choose" 
                :name="item_.name"
                :value="item_.name"
                >
            {{item_.value}}
            </radio>
          </radio-group>
          <div class="prompt-wrapper">
            <div class="static" v-bind:class="[{right: item.right}, {wrong: !item.right}]" v-if="correctAnswer.length>0">
              <span>你的答案：{{arr[answer[item.id-1]-1]}}<br></span>
              <span>正确答案：{{arr[correctAnswer[item.id-1]-1]}}</span>
              <div class="answer-btn" @click="showPic(paper.paper+'_'+item.id)">查看解析</div>
            </div>
          </div>
        </div> 
      </div>
      <!-- 上面是Section II text 2模块 -->
      <p style="text-align: center; font-size: 36rpx; padding: 10px 0;">text 3</p>
      <img style="width: 100%;" mode="widthFix" :src="imgur+'paperArticle/'+paper.paper+'_2.png'" alt="">
      <!-- 下面是Section II text3模块 -->
      <div class="select-items">
        <div class="select-item" v-for="item of paper.sectionIIText3" :key="item.id">
          <div class="select-problem">{{item.id + '.' + item.problem}}</div>
          <radio-group 
          :id="item.id - 1"
          @change="clickRadio">
            <radio v-for="(item_, index_) of item.selectList" 
                :key="index_"
                class="select-choose" 
                :name="item_.name"
                :value="item_.name"
                >
            {{item_.value}}
            </radio>
          </radio-group>
          <div class="prompt-wrapper">
            <div class="static" v-bind:class="[{right: item.right}, {wrong: !item.right}]" v-if="correctAnswer.length>0">
              <span>你的答案：{{arr[answer[item.id-1]-1]}}<br></span>
              <span>正确答案：{{arr[correctAnswer[item.id-1]-1]}}</span>
              <div class="answer-btn" @click="showPic(paper.paper+'_'+item.id)">查看解析</div>
            </div>
          </div>
        </div> 
      </div>
      <!-- 上面是Section II text 3模块 -->
      <p style="text-align: center; font-size: 36rpx; padding: 10px 0;">text 4</p>
      <img style="width: 100%;" mode="widthFix" :src="imgur+'paperArticle/'+paper.paper+'_5.png'" alt="">
      <!-- 下面是Section II text4模块 -->
      <div class="select-items">
        <div class="select-item" v-for="item of paper.sectionIIText4" :key="item.id">
          <div class="select-problem">{{item.id + '.' + item.problem}}</div>
          <radio-group 
          :id="item.id - 1"
          @change="clickRadio">
            <radio v-for="(item_, index_) of item.selectList" 
                :key="index_"
                class="select-choose" 
                :name="item_.name"
                :value="item_.name"
                >
            {{item_.value}}
            </radio>
          </radio-group>
          <div class="prompt-wrapper">
            <div class="static" v-bind:class="[{right: item.right}, {wrong: !item.right}]" v-if="correctAnswer.length>0">
              <span>你的答案：{{arr[answer[item.id-1]-1]}}<br></span>
              <span>正确答案：{{arr[correctAnswer[item.id-1]-1]}}</span>
              <div class="answer-btn" @click="showPic(paper.paper+'_'+item.id)">查看解析</div>
            </div>
          </div>
        </div> 
      </div>
      <!-- 上面是Section II text 4模块 -->
      <div class="bar">
        Section II  Reading Comprehension Part B
      </div>
      <div class="select-list">
        <p style="font-size: 38rpx; margin-bottom: 20rpx;" v-for="(select, index______) of paper.sectionIIBList" :key="index______">
          {{select}}
        </p>
      </div>
      <img style="width: 100%;" mode="widthFix" :src="imgur+'paperArticle/'+paper.paper+'_6.png'" alt="">
      <!-- 下面是Section II B模块 -->
      <div class="select-items">
        <div class="select-item" v-for="item of paper.sectionIIB" :key="item.id">
          <div class="select-problem">{{item.id + '.' + item.problem}}</div>
          <radio-group 
          :id="item.id - 1"
          @change="clickRadio">
            <radio v-for="(item_, index_) of item.selectList" 
                :key="index_"
                class="select-chooseList" 
                :name="item_.name"
                :value="item_.name"
                >
            {{item_.value}}
            </radio>
          </radio-group>
          <div class="prompt-wrapper">
            <div class="static" v-bind:class="[{right: item.right}, {wrong: !item.right}]" v-if="correctAnswer.length>0">
              <span>你的答案：{{arr[answer[item.id-1]-1]}}<br></span>
              <span>正确答案：{{arr[correctAnswer[item.id-1]-1]}}</span>
              <div class="answer-btn" @click="showPic(paper.paper+'_'+item.id)">查看解析</div>
            </div>
          </div>
        </div> 
      </div>
      <!-- 上面是Section II B模块 -->
      <button  type="primary" @click="handleFinish">提交</button>
      <div class="modal" v-if="modalShow">
        <div class="close" @click="closeModal">X</div>
        <div class="pic-wrapper">
          <scroll-view class="modal-scroll"  scroll-x="true" scroll-y="true" enable-flex="true" >
            <image id="answer-pic" class="modal-pic"  mode="aspectFit" :style="{ width: scaleWidth, height: scaleHeight }" :src="picSrc"></image>
          </scroll-view>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import request from '../../../utils/request';
import config from '../../../utils/config';
export default {
  props: [ 'prepaper' ],
  data () {
    return {
      correctAnswer: {},
      answer: [],
      paper: {},
      modalShow: false,
      imgur: config.imgur,
      arr: ['A','B','C','D','E','F','G'],
      modalShow: false,
      picSrc: ''
    }
  },
  methods: {
    async handleFinish () {
      try{
      //检查题目有没有做完
      for(let i=0;i<45;i++){
        if (this.answer[i] === undefined)
        {
          wx.showModal({
              title: `第${i+1}道题没做完！`,
              showCancel: false
          })
          return ;
        }
      }
      
      //从服务器拉取答案
      console.log("做完了！");
      let paper = this.paper.paper;
      let result = await request('/checkAnswer', {paper});
      this.correctAnswer = result;
      console.log(this.correctAnswer)
      //核对题目答案
      for(let i=0;i<45;i++){
        if (this.answer[i] == this.correctAnswer[i])
          if (i<20) {
            this.paper.sectionI[i].right = 1;
          } else if (i>=20&&i<25) {
            this.paper.sectionIIText1[i-20].right = 1;
          } else if (i>=25&&i<30) {
            this.paper.sectionIIText2[i-25].right = 1;
          } else if (i>=30&&i<35) {
            this.paper.sectionIIText3[i-30].right = 1;
          } else if (i>=35&&i<40) {
            this.paper.sectionIIText4[i-35].right = 1;
          } else {
            this.paper.sectionIIB[i-40].right = 1;
          }
      }
      } catch(e) {
        console.log(e);
      }
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
    clickRadio (event) {
      this.answer[event.target.id] = event.target.value;
      console.log(this.answer);
      console.log(event.target.id); 
      console.log(event.target.value);
    },
    closeModal () {
      this.modalShow = false;
    },
    showPic (name) {
      let src = this.imgur+'paperAnswer/'+name+'.png';
      this.picSrc = src;
      console.log(src);
      this.modalShow = true;
    }
  },
  mounted () {
    wx.cloud.init();
    this.answer= [];
    this.correctAnswer = {};
    this.paper = this.prepaper;
    
    wx.setNavigationBarTitle({
      title: this.paper.paper
    }) 
  },
  watch: {
    prepaper() {
      this.paper = this.prepaper;
      this.answer= [];
      this.correctAnswer = {};
    }
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
    .select-item, .select-list
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
      .select-chooseList
        display: inline;
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
        .modal-scroll
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
</style>