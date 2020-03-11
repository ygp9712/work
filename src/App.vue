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
        url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAygAA0AAAAAEeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAMhAAAABoAAAAcisEbfUdERUYAAAxkAAAAHgAAAB4AKQAaT1MvMgAAAaAAAABCAAAAVjxuSmhjbWFwAAACHAAAAHUAAAGiZpJS8Gdhc3AAAAxcAAAACAAAAAj//wADZ2x5ZgAAAsAAAAeyAAAKcPnVGtZoZWFkAAABMAAAAC4AAAA2GE84cWhoZWEAAAFgAAAAHgAAACQH8QOXaG10eAAAAeQAAAA2AAAASj3oA4lsb2NhAAAClAAAACoAAAAqGRoWTm1heHAAAAGAAAAAHQAAACABKABtbmFtZQAACnQAAAFJAAACiCnmEVVwb3N0AAALwAAAAJoAAADW0ueosnjaY2BkYGAA4rLdyQbx/DZfGbhZGEDgVl+VFYL+38AizNwA5HIwMIFEARp+CdAAAHjaY2BkYGBu+N/AEMPCygAELMIMjAyoQBAASP0CkgAAeNpjYGRgYBBhSGTgYgABJiDmArP/g/kMABTFAZYAAAB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PGF6UMTf8b2CIYW5gaAAKM4LkAOOnDFMAAHjaY2GAAMZQBgYWBgYHIFYAYjsgNgbiKiCWAWKQnDdUHMTOBOJ6FlaGPiCtzNAHMgEAjDMErwAAeNpjYGBgZoBgGQZGBhCYA+QxgvksDA1gWgAowvOM4RnTM5ZnHM+En4k9k3im9KziWfVzjudhL8r+/2dggMvyY8pKMUsxSTFK/pP8IflN8qvkG8npklMlOSX2iM+F2ogTMLIxwJUwMgEJJnQFDMMeAADTzCogAAAAAAAAAAAAAAAAkgC6AQoBVAGKAdACOgJ2AswDJANYA6AD7gRABHAE9gU4AAB42mVWfWwUxxWfN7O36/v23sfu4e+9vds7g32272tdwMZgU+MPSAhUbj6M6+AEAwKaRtCkkYlri+aDxMVFIQpJQJGsVqjFqCUYipRQty5FdVLaosiVDQqVIpU/kkgNQkWqb69v7zC5kjvtm7dv3sy8mfd+v1nCk5bs++x3LElUkiDrySbSQ75HSNgf4dUYRKREXK8AFHKDnGoGHU3plBapANkF4WBESKEBzbl35gIBFb/eoEuJnK83qCXTccnHq99QWPJdJbj5cKJYDEjRfj2s6tUtXQCVZRxAajVAl9EYVN5FE/fx229/zKEcPc1BV0u1roZHJxmbTHgCgZAsX/TIcigQuNdsOdnPQ2Oc0tLKolDZ9vCz7TUPKyWlDkfNgbaNI418/8maH298+SzHnX35pbN0LTv2TPuz4e2l4SLUnjlmXDVnDAUKJcEfkKrsF+wmsxMfId5mKsnNgBv18QLwWgRiUAW97000NU281wur0sZMeVuZ8VFdAm71HF4bbG4Orj3c07o/avxXAhnc0b2Ekubsh+z3bB1xkHpCLAVnKHjTyTrQgm6ImIL3VYJgCim+BmRTmN2UXDIsFuNSXv5FEGK8hx8ZEURUsOX5GKrYelARRtbd90RJ1z/olX8fHb33bu7XRhLZC+wc6yCMCMSOURYTEffuJwoJEiIrfiWMj1eGCOiyENFBtngxPBfF0Jup/BD0GKdgDp43Xnp4zqieg7meuZa5lswHc8bfe+gbh0QaqhMPiRCOeXzJZJJV552+c89pK6yg6w95YioVDxXXhaiYz8GPspfYT1gLqSDEChov+DU1X3BSOqKZtRmX/RWg4wmxF415ewCWLfvFDQvsGxC9tpXs1R02KwTsoAnUBdVWm2uc4xYm9vw6KSxztT6y4xUGx9w2G0R5DyE8KcsOs/+wYdxxANcLEo0sR0woqQf+Ij7gT0RQEVXvktmvpOCpLEZc+Bjn6R7jOkxdzxrjdG/2nBGGhfwzHOoMdWjt4euL54+yPQvzi7+l7Uan2hneGw4TzADJDnMEY5FJHVmHBxEzS0NwmXUhm7uP67h33LRpCUbM3mTOEs/1+iDIl5u+ueLR0ykxqbF/RMae6Ptr3xNjkWj0a7VPHdq89cLWzUPBUCh4XzVWO8UzVk/AeoFSi0jbHxiUV41bm4dUtWCUmpsLDorOu2esAQ8OZoIVOGcul5R0ZWfZB6yJSGY9QQqz6Mfw8ziIS7Ku4tlaMPw84yC19E+Go9wfjh6d4biZo41PrfjNaehc/JK9vnvXGGNju3a/TuHEqZo9TUemOW76yPg0UypObTNm/rnzMGOHd+58jdLXSA53N5HrVFKCXEcgv2S+iO6fZJ64XAx77uNyCZ10ZtXTodDTq3aPMYiVbPm3zx10e7/aUlJL2ZjQOV1eWfbhxkCcws6+1ICiDKT69gLVmQrp+vo0sHf2tw1oB6458HftgDbQtv8dQ+2f8ILv5wPBx1YPHqS0u7a2m9KDg03bCvJux8yb0fJEkIicJrpGWAFjeFXk4CDCAdHgk+QEYiCe1lNIwEmNkgXjpsUCVQsLUIUMcHPh4l2L5e7FnFSmkJ+9MCX6fOLXKhs23QqGLW5aGoAS5h5wz6vErNOd2XH2JttH3DnMEMCIBASInkglUIhMVFBtUEQ06ooIW/ujT9LWbn+0W3oy83kTR0v/lvl8LS1l+x4veXzxq0BrSaCVuRan6WeruEz5OfpZS6YM1+HIi9lpNsLW4DoSiZAVuJIS5P2iT0oo8Vx5WxJiRHMDEyU5T5tpXUyIyjJIKX62PbPK6fE46R9RGldH08ViTTO4BbGoe6u7EtZnfkhfYWtE5+Il04utdYpNxpeK1VYObuOCx8pZ4nGr6IENmSE6urjY1ob7HiMetpv+C1ljeS4aGUxGZArmSMQkKRWA156CVSZivhS0oDUu+UW0sMdEI5nmeZjtNVbqnZR26tBgczptxtVQHUBdCC6brdProh2NdFo00FeHP2dW4CtcbuygZhe6GSvvua+wuVw24xPsIbmcqNlfso9YL55VKWnAu8u8e7FA5NxVHAPLEr4QAWHkCj5YB/dxmLvhzvjKfWyo1+3zuV+YgMrjsxw3e/wtU8KNX9mlUvvkt17dNHXbYrk9df62pRHOuHw+17YhZg6b+GLJ963jsx2n7aV++2QsAez2+fyALeO5GMegnv0ArpIivGNKMMYY5L8QLN9QbgRra9tqawEeaOvBbNrQ8P8tydXLEo4iRCet5CHMkCTzeLXmKFT2qyktjaBHckylEfGqhna/mkzLEpP8eMXjJwteL8l0Is0QfghCjUQQhAVopCPLASr8xSUOD1+MExUVWbWqMhnK3FrJynKHe03vd7uTdqHIEfCIDjkgu6+AneeNO1euGHcw9/Yr88aniDZlfh4UBOmn9NHqb6dDUrHf4XPIIa/XX+XyxEpLy4N1ZW4nVIs15Y8MAhii02svLkIykb3LLPT9wglxgVqcaL5g4jzvmmfhxbMIkJDJf/glI0QEWZB1WY9gwvEc8AgK2YUO75sa8K1L/LRj/NqGa+MbjiR23Nk1uCkcvTz83EnGTj6HkjvBhuH7f/rk0eSS188S3ZYNXbdeeH48M5j3MeUJDOF/9NZfGQAAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42m2NWQ7CMAxEM4Um6cIqbsKBUIpCY0AOKE2LOD2u4JORLMue8bMq1Fe1+q+DFFSBAgssUULDwKJCjQYtVlhjgy122NsHcX/PfGwdvYhPKcxNn4MLLhYdlSHTJdvJ8zs47o34V3Js2LHkeptCzGcxtGzloh5yCvlJN8dV52lyM9z8fugUc8qxScHLPHrJlwIeSPM4wz6p/TTvAAAAAAAB//8AAgABAAAADAAAABYAAAACAAEAAwATAAEABAAAAAIAAAAAeNpjYGBgZACCq0vUOUD0rb4qKxgNAD2rBeIAAA==) format('woff'),
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

.iconchahao:before {
  content: "\e604";
}

.iconbeiwanglu:before {
  content: "\e622";
}

.iconshoucang:before {
  content: "\e613";
}

.iconshijian:before {
  content: "\e611";
}

.iconsousuo:before {
  content: "\e67b";
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