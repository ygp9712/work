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

<style lang="stylus">
  page
    width: 100%
    height: 100%
</style>