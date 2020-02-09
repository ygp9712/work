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
    src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAPcAA0AAAAACFAAAAOGAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GVgCCWhEICoN8g00LEAABNgIkAxYEIAWFCAdTGykHyI7CtuUTVSOEmS/jMOITD/8/hrvv/T9xr1jFK57Uq4TGITEiRA+NUFZZRJvJ6WvMh8/L3k/SBViaGSmFs9eKpxV4ZbAQz3N1qf6nYMZjrdqrBWj30qgWsVC3p+dgKEDhUOYppTbBZgEM0JsHOQPslsyNmRDwbpdLM/C5cZs/d26CdgyCFIpGoSIRVazDhnxIvQU8At4f/+Afs0gNBVf3yNWkRsT+pD610LyVV8lQEBYEoKBgHAEn0ALjGHtAq2Ypf1IflnwY/HTXagX70TWx+s/qn0MjICCLaCRYE4n08wTgjrFtRYIm0IlmPAb8B1QAhFTkwMp5gGJ89bwKOSbmPSQPIhbxQmbjPsmdvSJ1ksLLIgShUJKKZbmkXwwrmUM68n4CdGJAmiB0Cu8Kxfcg9TH0oS0JxkCYQCvmkKcH+vatMufFPn6/Uxue7O8/uDbmvj646UCnIAhiUW5xYVFhUUlRSXGBKJbIcrEkVWauufGj4tN922J32m1uyqCDvQcU7w/nSiKY2wk4E9D50V+H4F6y5fC+DBdtFD1849oYLfo2rjExev0m1De1p9H28PF9h6vTI/1sX6dyoE9NqajBPhDAvgb7VURNBvphW/gnzMaNzBPmiYqIC0qff/LEeWZriznPgYqKC860ld6cgcOsA9gy/rP+YPt2Lbwepw0Nd5YKe0sdhoZSU0dGHjxISeFAB2ye4VH7qxn/qipFkZ710bHDpe32SO90K7VlC3VPBBAQu/3ddOvmzQAEguOv5KU1CyP/z5pbbcLjYZuvfTQPaJYg2OyqroDat/hltf7Visq0DECgyQ40SLRqxTYAer0AAQzwREBodgIBqckdBBTNHoCAqtkzENCgzQYIaNTsCwhotRbxIKBNX0yBFrUFqwBrQ7d4bep0Rlt0a6ardETbYNBBbaNud7WtTvnSuM1i6DHHfmZN6nCqcSNb9dqZKg0M9NgKnDm0Plcg+3fy/3lupPIgvDNwTBOFZlp1zPD3OLbJ2VPMU5qYWagKbfnx5gvXnaX7eftmpQ8Dg9k59XMTixYK/jgcli2WmYGOreQieJtoaRnYMgp/Rq1JA443PLRItbQo/DmOvVIl7+eSE0bnn4w/B1zH4RiF8+GDLTnpraFONy4k3GxmciR27dyL0YoN3YSQkVGiRkP7BVWbSl9jUWrymfo6PZ9ihlpVp6wzzNC3uAAAAA==) format('woff2'),
        url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAXYAA0AAAAACFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAFvAAAABoAAAAcim1nbUdERUYAAAWcAAAAHgAAAB4AKQANT1MvMgAAAaAAAABCAAAAVjxwSmhjbWFwAAAB+AAAAFAAAAFa0RjNkmdhc3AAAAWUAAAACAAAAAj//wADZ2x5ZgAAAlgAAAGxAAAB/EEuaWpoZWFkAAABMAAAAC8AAAA2F/uEYWhoZWEAAAFgAAAAHQAAACQH8QOFaG10eAAAAeQAAAASAAAAFgxLACBsb2NhAAACSAAAABAAAAAQAOQBYm1heHAAAAGAAAAAHwAAACABFABAbmFtZQAABAwAAAFJAAACiCnmEVVwb3N0AAAFWAAAADsAAABT9R7EfnjaY2BkYGAA4uRlV7zj+W2+MnCzMIDArZQFRgj6fwOLMHMDkMvBwAQSBQAo1AocAHjaY2BkYGBu+N/AEMPCAAIswgyMDKiABQBIcwKAAAAAeNpjYGRgYGBnMGFgZgABJiDmAkIGhv9gPgMADmABVQB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PmF6UMTf8b2CIYW5gaAAKM4LkAOPRDFUAAHjaY2GAABYIVmDwBvEAAyUAeAAAeNpjYGBgZoBgGQZGBhAIAfIYwXwWBgsgzcXAwcDEwPSM6ZnQM7EXZf//MzAg2FKMkp8k34tPgOqFAkY2BrgAIxOQYGJABYwMwx4AAIQLED4AAAAAAAAAAAAoAGQAvAD+eNpdkDFIG3EUxt+7d5cbhJNwl/s7tCG51FxAOSFnckLJQdQhrcVVOlgoVDQJti6C4nJ71CZmjwguDjo4ZAg4BIMd2k1Khyzp5tJuBcF46T+GoLh8fO/xPb4fDxAivT/UoRHQAFRX0JmLYWRaQMZA3EQLI7h8dJzJHB8t4+u033o5/8L/MWXjzVIpa7iukS0tzW0m/DsdGY4mPoMAC73vdEEZ0MEAwJQcxpCCsoWmi05SZ04sFQ1KvIKPfKkgfTwbT4iX1WpLFFvVmZWJ81N82/1Le8XCPtF+obgnYO1kcj1Tbopis1xpUjR88sFv/c6XiEr5/K4g7AIQQM8TgTwYAQY2bw6ArANLgxMHGrTzUgXVWMpCIyCHYgpqOrNDYUymnZTt4nRcgLbfkSSMtNsYkSS/027cStJt40GjdVQNFetBTQs+WvL6sSdn3cXhAVf89Sw+sAD8T31elfOOwStOq/DPy6bMZOYwx+SojoumhU/JBe9L/ZM2a399U7nOXVdyZXv1X2FtcTxx5W0dEh1ucRVr5OHGt5/vp4epA/udlFu42dmu3K8NMn2tcYT/2nuL3QAAAHjafZA9TgMxEIWf8wckEkIgqF1RANr8lCkTKfQIpaNINt6QaNdeeZ1IOQEtFQeg5RgcgBsg0XIKXpZJkyJr7ejzm5nnsQGc4xsK/98l7oQVjvEoXMERMuEq9RfhGvlduI4WPoUb1H+Em7hVA+EWLtQbHVTthLub0m3LCmcYCFdwiifhKvWVcI38KlzHFT6EG9S/hJsY41e4hWtlqQzhYTBBYJxBY4oN4wIxHCySMgbWoTn0ZhLMTE83ehE7mzgbKO9XYpcDHmg554Ap7T23Zr5KJ/5gy4HUmG4eBUu2KY0uInQoG18snNXdqHOw/Z7ttrTYv2uBNcfsUQ1s1Pw92zPSSGwMr5CSNfIyt6QSU49oa6zxu2cp1vNeCIlOvMv0iMeaNHU6925p4sDi5/KMHH20uZI996gcPmNZCHm/3U7EIIpdhj+T2HEZAAAAeNpjYGKAAC4wyciADtjBokyMTIzMjCyMrDyJmRWZefHFGSCKPS8xD0ils2VlJmYk5rPllYF4APKoDU0AAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABgABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9K2UBUYwGgA81wXKAAA=) format('woff'),
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

.iconnanxing:before {
  content: "\e612";
}

.iconjiahao:before {
  content: "\e616";
}

.iconaixin_shixin:before {
  content: "\e602";
}

.iconnvxing:before {
  content: "\e876";
}
/*
  使用阿里Iconfont
  */
</style>