<template>
  <div>
    <p></p>
  </div>

</template>

<script>
import request from './utils/request';
export default {
  /* async mounted () {
    wx.login({
      success: async (res) => {
        //console.log(res);
        //1、获取用户登录的临时凭证,和用户是否授权没有直接关系，五分钟有效
        let code = res.code;
        //2、发送code给服务器端并获取登录令牌（token）
        let token = await request('/getOpenId', {code});
        console.log('登录令牌是：',token);
        //3、将自定义登录状态缓存到storage中
        wx.setStorageSync('token', token);
      }
    })
  
    //测试地址token
    let result = await request('/test');
    console.log('验证结果:', result);
  } */
}
</script>

<style>
page {
  width: 100%;
  height: 100%
}
  /*
  使用阿里Iconfont
  */
  @font-face {
    font-family: 'iconfont';
    src: url(data:application/font-woff2;charset=utf-8;base64,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) format('woff2'),
        url(data:application/font-woff;charset=utf-8;base64,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) format('woff'),
        url('/assets/styles/iconfont/iconfont.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconshenglvehao:before {
  content: "\e708";
}

.iconwenti:before {
  content: "\e756";
}

.iconhuifu:before {
  content: "\e60f";
}

.iconwenzhang:before {
  content: "\e610";
}

.icontushuqikan:before {
  content: "\e618";
}

.iconpinglun:before {
  content: "\e678";
}

.iconpinglun3:before {
  content: "\e600";
}

.iconbi:before {
  content: "\e608";
}

.iconnanxing:before {
  content: "\e612";
}

.iconnvxing:before {
  content: "\e876";
}

.iconjiahao:before {
  content: "\e616";
}

.iconaixin_shixin:before {
  content: "\e602";
}


/*
  使用阿里Iconfont
  */
</style>