//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        console.log(code);
        var appId = 'wx23808f489a86950b';
        var secret = '7ec544e09d72c5d6fc348a542c3107e6';
        var that = this;
        //从后台获取openid
        wx.request({
          url: getApp().globalData.url+"getopenid",
          data:{
            appID:appId, 
            appSecret:secret, 
            code:code
          },
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            if (res.statusCode == 200) {
              console.log(res.data);
              wx.setStorageSync('openid', res.data.openid)
              //判断用户是否是vip
              wx.request({
                url: getApp().globalData.url + 'getVipByOpenidAndTel',
                data: {
                  openid: res.data.openid,
                  tel: wx.getStorageSync('tel')
                },
                method: 'POST',
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                success: function (res) {
                  if (res.statusCode == 200) {
                    wx.setStorageSync('isVip', res.data.data.vip)
                    console.log(getApp().globalData.isVip)
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
    url: 'https://www.yeahempire.com/xiaomai/',
    resumeCount:0,
  }
})