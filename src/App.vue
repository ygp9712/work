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
    src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAREAA0AAAAACPQAAAPtAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GVgCCYhEICoUQhDILEgABNgIkAxgEIAWFCAdYG50HUZQvSofsx0K8/ZQpMQla+M+PCsHCAezi+f/f739znbvf++ebJoHkjfFHB694Uq8/VAYJQiZkQqNSvZlkmv3Q7uuFAdzIqD6AsU5L6bau1jjr+DMSfv7/v3f6Wz6Pr2lfLaD7XmMsDaRo26c4jMIojv751J62Bf9JqCjMPOQW2rUl8VlHbITAq33xHfB+6NAj5dzBDNaAJgYTotCQkqdGtMftJZ7A8/PLgTjSjAZK15O3alVQ8bX93MZm/8+6YBOyBPoG3ree4lzwhHkF7iAwo2vqa/vevy99X/u5bbMBhn1wgv4EHVQAoZlkTJiThubnCfiQ/LdBAx0sAEvAc7IFQIEpY0ozaKuFVypDRrsiAa4gCw1yFb5Isp3P+d4sOcu0qA5xSZobHOkGrkp40ASporQ02UF1D5Iy4Qh5eNu1c0nUgZ03LyZOID3XWWCYHo6jXrygl7KFtDPiho6yLBlFGQUMM8F87WG/IfEj+n20CiqBvC8VOiNbjiw5FAjO+w7NHo51gc2Hlx4NQVwOHp07MsEwDEt2UD1kD0mTNNXNsvSLFxTHiRrTRvwASrRkV8XeyIcPTXAhPBmo6qJBuhi/Xw0Xst1/ZJmhzYfOobnssZwxOyyR04JUD0HYhLaqKvrUbippXc3iIhKW9QmoKT3cq596Qp43suP4oeZ4Uym28s6tNZgevHtLTWKr7rJTowUq4vjpQ8clTSWZxCdUt2yJAdWjy5cg4BTLl+oRA7JsKRDY7Gs8IgJ/rYONKAdZ4Hb2zGX8/38cRZf//3dgMcFduADRUdEgN8mKygJ56gRs1gLnrcoHPkwlL3rFioaGVauePauvV8AFZpuVq6M0zX9KX69tav0RMx4/en/VzMYRdMcOdEQHBMoavjc24vT27UAQPimneVKPkt+O0+VwsZz/s7U8zKJrIGxx1gVQyxA0aZU/Wyh2ytYMEHRbnEHDlCn8B4Al7yGAVSkQEN1ZCGgmPISAQfdIQOmeCRiZ9gICxroPEDBlf6oAAdOWs8EgNYl9gFTHgip1M+eierBgiFOCVeqRNUfVYwseq6ec97v3tF2xgLMj+qnJDdr6KgSFMbKekpWFps0gZ6aeY+DjCf7ffW2o5Yf80QCnqWkNMZHrB3+ro1qdukA+T63fAH01IVOaDHCd23hmWkZTzonWFmr96zxlwDCtLIMGaRA0+lmZEeq6YFQzMbEi9MpnY6CmNCgNvCLJHxjWZg0Oaq6M8fvA+PLU/ufkDMCd/jvrVSRdOk3PmTTKMX1w2+LTNMZHfscppB5TzB4d0dIypDLKeOaqflRvkQ7onFxUoXewyC08k9beoJfr5FZ7y3AMAAAA) format('woff2'),
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