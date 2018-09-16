//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isVip:0,
    TelInput:null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  TelInput :function(e)
  {
    wx.setStorageSync('tel', e.detail.value)
    this.data.TelInput = wx.getStorageSync('tel');
  },
  //事件处理函数
  gotoSearchPage: function(){
    //如果不是VIP用户
    if (wx.getStorageSync('isVip') != 1) {
      //获取用户输入电话号码,从输入框中获取
      wx.request({
        url: getApp().globalData.url +'setOpenidByTel',
        data:{
          openid:wx.getStorageSync('openid'),
          tel:this.data.TelInput
        },
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success:function(res){
          if(res.statusCode==200)
          {
            wx.setStorageSync('isVip', res.data.data.vip);
          }
        }
      })
    }
    wx.navigateTo({
      url: '../select/select',
    })
  },
  onLoad: function () {
    this.setData({
      isVip:wx.getStorageSync('isVip'),
      TelInput:wx.getStorageSync('tel')
    })
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
