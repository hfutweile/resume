//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  gotoSearchPage: function(){
    //如果不是VIP用户
    if (wx.getStorageSync('isVip') == false) {
      //获取用户输入电话号码,从输入框中获取
      var Tel=''
      wx.request({
        url: 'https://www.yeahempire.com/setOpenidByTel',
        data:{
          openid:wx.getStorageSync('openid'),
          tel:Tel
        },
        header: {
          'content-type': 'json'
        },
        success:function(res){
          if(res.statusCode==200)
          {
            wx.setStorageSync('isVip', res.data.status)
          }
        }
      })
    }
    wx.navigateTo({
      url: '../select/select',
    })
  },
  onLoad: function () {
    if(wx.getStorageSync('isVip')==false)
    {
      //显示输入框
    }
    else if(wx.getStorageSync('isVip'))
    {
      //隐藏输入框
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
