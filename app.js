//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        //console.log(code);
        var appId = 'wx742e2f5709ad09cc';
        var secret = 'f9cd5a33ef546520b4ff14c8642ec8b9';
        var that = this;
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            if (res.statusCode == 200) {
              console.log("获取到的openid为：" + res.data.openid)
              wx.setStorageSync('openid', res.data.openid)
              //判断用户是否是vip
              wx.request({
                url: 'https://www.yeahempire.com/getVipByOpenId',
                data:{
                  openid: res.data.openid
                },
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                success:function(res){
                  if (res.statusCode==200){
                    wx.setStorageSync('isVip', res.data.isVip)
                  }
                }
              })
            }
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    resumeCount:0,
    resumeId:0,
  }
})