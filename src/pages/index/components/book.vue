<template>
  <div class="root">
    <div class="bar">
      推荐图书
    </div>
    <div class="bookList">
      <div class="list">
        <div @click="toDetail(item)" class="bookItem" v-for="(item, index) of booksArr" :key="index" >
          <img :src="item.src" alt="">
          <p class="bookTitle">{{item.title}}</p>
          <p class="bookWriter">{{item.writer}}</p>
        </div>
        <div class="bookitem more" @click="toBookList()">
          更多
        </div>
      </div>
    </div>
  </div >
</template>

<script>
export default {
  name: 'IndexBook',
  data() {
    return {
      booksArr: [{
        src: 'http://img10.360buyimg.com/n1/jfs/t1/36854/19/1565/207321/5cb3e59dEa8f397ca/f3ce691a81601d88.jpg',
        title: '2021考研英语红宝书考研英语词汇',
        writer: '考研英语命题研究组 ',
        year: 2020,
        price: 75.60,
        publisher: '西北大学出版社',
        authContent: '暂无内容',
        content: `红宝书·考研英语真题的导向性和稀有性是毋庸置疑的。目前考研英语真题相关辅导书籍和资料，无外乎两大编排模式：<br>
              　　一是将考研英语真题彻底打乱、拆解，然后按照考核题型重新分类编排。这样对不同题型的命题特点及解题方法的掌握与提高，效果明显，但这种编排模式却破坏了真题套题原有的完整性，因而，起不到真题应有的检测作用，影响了考生整体把握考研英语试题的能力。</br>
              　　二是将考研英语真题以完整的套题形式按年份（顺序或倒序）进行编排。其优点是测试性强，对整套试题的结构、题型及考点分布的理解和把握具有宏观、系统的特点，对考生体验解题的真实感受、积累解题经验很有价值。其重要性亦是不言而喻的。但这种编排方式对基础较为薄弱的考生来说不利于从细微处理解和掌握考核知识点，有“囫囵吞枣”的弊端。</br>
              　　为了综合上述两种编排方式的优点，使其达到优势互补的效果，本书创造性地把考研英语近十余年的真题划分为两个部分：<br>
              　　第一部分，对2005——2009年五年的考研英语真题按不同题型进行归类编排，以各个击破的方式逐一攻克五大题型及其相关的知识点和考点。<br>
              　　第二部分，对2010——2019年十年的考研英语真题按原有的套题形式进行编排，以应试的方式进行检测，使考生发现自己的薄弱环节，并进一步深入研究真题，从而帮助考生全面提高应试水平和能力。<br>
              　　本书遵循由简单到复杂、从局部到整体的原则，先分类突破，再整合提高。通过科学、合理、高效地使用真题，全面提升应试能力。`
      },{
        src: 'http://img10.360buyimg.com/n1/jfs/t1/101845/15/10913/332723/5e21aed7E7c2a7158/d2b2f851e26dc933.jpg',
        title: '张宇考研数学(2021)36讲+1000题（数一）',
        writer: '张宇',
        year: 2020,
        price: 205.20,
        publisher: '高等教育出版社',
        authContent: '张宇：博士，全国著考研数学辅导专家，教育部“国家精品课程建设骨干教师”，全国畅销书《张宇高等数学18讲》《张宇线性代数9讲》《张宇概率论与数理统计9讲》《张宇考研数学题源探析经典1000题》《张宇考研数学真题大全解》《张宇考研数学闭关修炼一百题》《考研数学命题人终极预测8套卷》《张宇考研数学最后4套卷》作者，高等教育出版社原《全国硕士研究生入学统一考试数学考试大纲解析》一书编者之一。',
        content: '《张宇高等数学18讲》 、《张宇概率论与数理统计9讲》、《张宇线性代数9讲》全面覆盖考试大纲，在基础知识点的讲解之后，给出相应的例题对知识点做具体阐述，并适当配以注释，说明考试中常考的方式和易出现的错误，最后给出习题供考生加强对知识点的理解和对做题技巧的把握。这样循序渐进，让考生对数学知识从懵懂到融会贯通。由于本书有原命题人参与，使内容更具有针对性。'
      },{
        src: 'http://img3m6.ddimg.cn/53/21/28485026-1_u_3.jpg',
        title: '2021肖秀荣考研政治知识点精讲精练',
        writer: '肖秀荣',
        year: 2020,
        price: 69.8,
        publisher: '国家开放大学出版社',
        authContent: '肖秀荣，福建人，中央民族大学教授、研究生导师, 长期从事马克思主义基本理论的研究与教学工作。1967年毕业于北京大学国际政治系（现北大国际关系学院），1991年至2004年为教育部考试中心全国硕士研究生政治理论入学统一考试命题组成员，曾任政治命题组副组长及学科组组长，参与历年考研政治大纲的修订和《政治理论复习参考书》（“红宝书”）的编写。14年的考研政治命题经验无疑使肖秀荣教授成为最具影响力的命题专家。',
        content: '本书完全按照新考研思想政治理论大纲要求进行编写，包括马克思主义基本原理概论、*思想和中国特色社会主义理论体系概论、中国近现代史纲要、思想道德修养与法律基础和形势与政策以及当代世界经济与政治五部分内容。每部分前面给出本部分课程综述、框架体系和复习建议，帮助考生清晰掌握本门课程的结构体系，理清复习思路。每部分正文严格按照大纲以章为单位，每章包括内容提要、重要知识点提示、命题人说、知识点框架图、知识点讲解、经典真题和仿真模拟题七部分内容，以“高频考点”“重要考点”等提示语表明相应知识点的重要程度，以绿色字体标注重要考点，内容全面、层次分明、重点突出，堪称考研政治知识点复习经典大全，既有权威性，又有实用性。与去年相比，本书在体例与内容上都有很大变化。从考试的角度讲，这些变化是命题的重点。'
      }]
    }
  },
  methods: {
    toDetail (bookItem) {
      wx.navigateTo({
        url:'/pages/detail/main?bookItem=' + JSON.stringify(bookItem)
      })
    },
    toBookList () {
      wx.navigateTo({
        url:'/pages/bookList/main'
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
  .bar
    display: block;
    height: 100rpx;
    line-height: 100rpx;
    text-indent: 40rpx;
    background: #008B00;
    color: #ffffff;
    border-bottom: 4rpx solid #f2f2f2;
    box-shadow: 2px 2px 2px #f2f2f2;
  .bookList
    .list
      display: flex;
      flex-wrap: wrap;
      .bookItem
        box-sizing: border-box; //将边框算进宽度之中去
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 2rpx solid #eee;
        &:nth-child(2n + 1) //取奇数的子元素即：（0+1），（2+1）等
          border-right: 2rpx solid #eee;
        //弹性盒子嵌套
        .bookTitle
          display: inline-block;
          font-size: 26rpx;
          line-height: 50rpx;
          width: 300rpx;
          height: 50rpx;
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          text-align: center;
        .bookWriter
          font-size: 20rpx;
          line-height: 50rpx;
        img
          width: 200rpx;
          height: 200rpx;
          margin: 15rpx 0;
      .more
        width: 50%;
        line-height: 300rpx;
        text-align: center;
</style>