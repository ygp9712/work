<template>
  <div>
    <p></p>
  </div>

</template>

<script>
import request from './utils/request';
export default {
  async mounted () {
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

  }
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
    src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMAAA0AAAAABygAAAKqAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GVgCCShEICoIAgXMLDAABNgIkAxIEIAWFCAdAGygGEdWb5ch+JmRyCfuvxUEZWW+IbKbrVNHWN/Hw/Vr553a/EIDaRAGDTK0L8kQBK1TA7Jg+sfsVOWfTXedQ6FfIFpDI7afr3gcB4zAanMB4AiDvR78uTtXM8wj8eS4uc3DOA7TabaFycWupgmNO8VqxFuYad3DeeKjdCUwQlkLAm4PtysPH6Y0+yq0DlVEXmZBLQkKGSGK7MmQbssfYBt4ffyuJ8mTK5JSWY0oHztTnt+y3unmhWDBDQlyeAOTI0ViAAXKBxpL2KCsJWVS3WATH3zAa/CcAoiwBiAwZ/PMI4HVRLMpAGVARCUOxEJAAEPI6lSs3nv4OOG/GvuJXejOx8HrEzKNvO5befrvi9S8T3vw68d3vk9/+tvTt20nu2mTuhK9fT68Ye45vPFpfxYNHC8faVLL72KYTjaLSkRNrjzf73aQZG/f2ucWTJ4jVWXsFk/p3w8nd2Uf9Xe5S9feSWZrnhY+pWbOkUB+bNVNgSpUL56+l71hIXftOgenk7eXLWrVsRa4vaVlC/n4gELycd7a0aj3+L68kFXs2xUKSF1BeBoLKmJxAYv84gJQACYnmCJTRVQ4yVFQRRQA1fRWAOjoLEMqbIECmnFkC5MpbJ0BS3n4ByqjkgQBllfejABV1in4BKqkVO+QiVUBHbAiwaQM0nQMM0x1lyTdwZr7AM/1Advu3VsyjBdl2TAJUaTERvphF1LVpE5SBvNPO93j8j+yFIZANzv0BTkl2r4MR/lOL6j+6wLwl41TkE0uWBViJlb60FmHRY+M2GdO5z/TIVhBTIh27hjjEEUdS1x3Rj12ZRGiBbXzv9MhWiOnajb+xyk+h5L99PweQI/ZrNluacL4l6hqYWltpaH5sUrq/YkBmJuIAUOigKUYNimfRelOuefmyCPKgAwAA) format('woff2'),
        url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAATcAA0AAAAABygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEwAAAABoAAAAcilpeXUdERUYAAASgAAAAHgAAAB4AKQALT1MvMgAAAZwAAABCAAAAVjxwSAhjbWFwAAAB9AAAAEUAAAFK5j/prWdhc3AAAASYAAAACAAAAAj//wADZ2x5ZgAAAkgAAADYAAABALRZsLVoZWFkAAABMAAAAC8AAAA2F9V7UWhoZWEAAAFgAAAAHAAAACQH3gOFaG10eAAAAeAAAAARAAAAEgwAACBsb2NhAAACPAAAAAwAAAAMACgAgG1heHAAAAF8AAAAHwAAACABEgBAbmFtZQAAAyAAAAFJAAACiCnmEVVwb3N0AAAEbAAAACwAAABArrwOMnjaY2BkYGAA4keFq6/F89t8ZeBmYQCBW9HSqxD0/wYWBuYGIJeDgQkkCgBAiQqJAHjaY2BkYGBu+N/AEMPCAAJAkpEBFbAAAEcKAm142mNgZGBgYGUwYWBmAAEmIOYCQgaG/2A+AwAOKgFTAHjaY2BkYWCcwMDKwMDUyXSGgYGhH0IzvmYwYuQAijKwMjNgBQFprikMDs+YnokxN/xvYIhhbmBoAAozguQA3IkL8wAAeNpjYYAAFghWYGAAAAD6AC0AAAB42mNgYGBmgGAZBkYGEHAB8hjBfBYGDSDNBqQZGZieMT0T+/+fgQFCSzFKvoOqBwJGNgY4h5EJSDAxoAJGhmEPALIbCbYAAAAAAAAAAAAAAAAoAIB42l2MPWvCUABF7/X5kkFQJM+8pZUYITql0GgyiA9E565O/gU39+z+CsHf4ODs6N4hS8Yu3YWWZ/2gtLgc7nDOBRGcP0UpalCAZyq+NmxTK8elE/UYM+Bisx2Pt5sFR6k9PM+e7PEl4cd8PQmNCSfr+XTVt18+NRv9JQRwzqsQOWrQSAA6cH3oFFkEEbNnmF3+6/S6w5ih47a6dSpfJ602X9NsmBgOogoKW0rJoCgYSGnLYn+S8rS/sbOjF3rcNZVq/k2RX7V/2ffbb3Ah3x/0+wR+ACtLQ0N42n2QPU4DMRCFn/MHJBJCIKhdUQDa/JQpEyn0CKWjSDbekGjXXnmdSDkBLRUHoOUYHIAbINFyCl6WSZMia+3o85uZ57EBnOMbCv/fJe6EFY7xKFzBETLhKvUX4Rr5XbiOFj6FG9R/hJu4VQPhFi7UGx1U7YS7m9JtywpnGAhXcIon4Sr1lXCN/CpcxxU+hBvUv4SbGONXuIVrZakM4WEwQWCcQWOKDeMCMRwskjIG1qE59GYSzExPN3oRO5s4GyjvV2KXAx5oOeeAKe09t2a+Sif+YMuB1JhuHgVLtimNLiJ0KBtfLJzV3ahzsP2e7ba02L9rgTXH7FENbNT8Pdsz0khsDK+QkjXyMrekElOPaGus8btnKdbzXgiJTrzL9IjHmjR1OvduaeLA4ufyjBx9tLmSPfeoHD5jWQh5v91OxCCKXYY/k9hxGQAAAHjaY2BigAAuMMnIgA5YwaJMjEyMzDyJmRWZefHFGSCKLSszMSMxHwBR9AemAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABAABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9K1o6VUwGgA6zQWeAAA=) format('woff'),
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