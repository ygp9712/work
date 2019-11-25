<template>
  <div>
    <p></p>
  </div>

</template>

<script>
export default {
  mounted () {
    wx.login({
      success: (res) => {
        //console.log(res);
        //1、获取用户登录的临时凭证,和用户是否授权没有直接关系，五分钟有效
        let code = res.code;

        //2、发送code给服务器端
        console.log(code);
      }
    })
  }
}
</script>

<style lang="stylus">
  page
    width: 100%
    height: 100%
</style>