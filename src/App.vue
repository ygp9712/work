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