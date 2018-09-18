Page({
  data: {
    inputShowed: false,
    inputVal: "",
    resume:[],
    content: [],
    hy: [],
    xb: [],
    nl: [],
    xl: [],

    hyopen: false,
    xbopen: false,
    nlopen: false,
    xlopen: false,
    hyshow: false,
    xbshow: false,
    nlshow: false,
    xlshow: false,
    currentItem:0,
    select1: '',
    select2: '',
    shownavindex: '',
    hyid:-1,
    xbid:-1,
    nlid:-1,
    xlid:-1,
  },
  onLoad: function() {
    this.setData({
      hy: [{ name: '不限' },
      {name:'销售/客服/营销'},
      {name: '财务'},
      {name: '人力资源/行政后勤'},
      {name: 'IT/互联网/通信'},
      {name: '房地产/物业'},
      {name: '建筑'},
        { name: '金融' },
        { name: '交通/物流' },
        { name: '生产/制造' },
        { name: '传媒/设计/推广' },
        { name: '教育/翻译' },
        { name: '法律' },
        { name: '商场/服务/收银' },
        { name: '能源/环保/农业' },
        { name: '医药' },
        { name: '酒店/餐饮/快消' },
        { name: '普工' },
        { name: '兼职/实习' },
      {name:'其他'},],
      xb: [{ name: '不限' }, { name: '男' },
        { name: '女' },],
      nl: [
        {name:'不限'}, 
        { name: '20-30岁' },
        { name: '30-40岁' },
        { name: '40-50岁' },
        { name: '50-60岁' },
        { name: '60岁以上' },],
      xl: [
        {name:'不限'}, 
        {name:'专科'},
        {name:'本科'},
        {name:'研究生'},
        {name: '博士生'},]
    })
    //根据用户nickname获取可访问的简历
    var app = getApp();//取得全局App({..})实例
    var userInfo = app.globalData.userInfo;//取得全局变量需要的值
    var that=this;
    wx.request({
      url: getApp().globalData.url +'getResume',
      data:{
        openid: wx.getStorageSync('openid')
      },
      method:'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.statusCode == 200)
        {
          getApp().globalData.resumeCount=0;
          var isVip = wx.getStorageSync('isVip');
          console.log(isVip)
          //判断是不是vip，不是的话，隐藏电话号码信息，暂时未完成
          var Resume=res.data.data
          if(isVip!=1){
            for (var i = 0; i < Resume.length; i++) {
              Resume[i].tel = "**";
            }
          }
          that.setData({
            resume: Resume,
          })
        }
      }
    })
  },

  tagChoosehy: function (e) {
    var ids = e.currentTarget.dataset.id;  //获取自定义的id   
    this.setData({
      id: ids, //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    this.data.hyid=ids
  },
  tagChoosexb: function (e) {
    var ids = e.currentTarget.dataset.id;  //获取自定义的id   
    this.setData({
      id: ids, //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    this.data.xbid=ids
  },
  tagChoosenl: function (e) {
    var ids = e.currentTarget.dataset.id;  //获取自定义的id   
    this.setData({
      id: ids,    //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    this.data.nlid=ids
  },
  tagChoosexl: function (e) {
    var ids = e.currentTarget.dataset.id;  //获取自定义的id   
    this.setData({
      id: ids,   //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    this.data.xlid=ids
  },
  //通过下拉框的条件搜索
  getResumeByTerm:function()
  {
    getApp().globalData.resumeCount=0;//取得全局变量需要的值
    var that=this;
      wx.request({
        url: getApp().globalData.url +'getByTerm',
        data:{
          openid:wx.getStorageSync('openid'),
          industry:this.data.hyid,
          sex:this.data.xbid,
          age:this.data.nlid,
          education:this.data.xlid
        },
        method:'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          if (res.statusCode == 200) {
            getApp().globalData.resumeCount=0;
            var isVip = wx.getStorageSync('isVip');
            //判断是不是vip，不是的话，隐藏电话号码信息，暂时未完成
            var Resume = res.data.data
            if (isVip!=1)
            {
              for (var i = 0; i < Resume.length; i++) {
                Resume[i].tel = "**";
              }
            }
            that.setData({
              resume: Resume,
            })
          }
        }
      })
      this.data.hyid=-1;
      this.data.xbid=-1;
      this.data.nlid=-1;
      this.data.xlid=-1;
  },
  //通过搜索输入框搜索
  getResumeByQuery :function()
  {
    getApp().globalData.resumeCount = 0;//取得全局变量需要的值
    var that = this;
      wx.request({
        url: getApp().globalData.url +'getByQuery',
        data:{
          openid: wx.getStorageSync('openid'),
          query: this.data.inputVal
        },
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          if (res.statusCode == 200) {
            getApp().globalData.resumeCount=0;
            var isVip = wx.getStorageSync('isVip');
            //判断是不是vip，不是的话，隐藏电话号码信息，暂时未完成
            var Resume = res.data.data
            if(isVip!=1)
            {
              for (var i = 0; i < Resume.length; i++) {
                Resume[i].tel = "**";
              }
            }
            that.setData({
              resume: Resume,
            })
          }
        }
      })
  },
  previewTodetail :function(e)
  {
    if (getApp().globalData.resumeCount>=50)
    {
      wx.navigateTo({
        url: '../select/select',
      }) 
    }
    else
    {
      wx.navigateTo({
        url: '../resumedemo/resumedemo?id=' + e.currentTarget.id,
      })
    }
  },

listhy: function(e) {
  if (this.data.hyopen) {
    this.setData({
      hyopen: false,
      xbopen: false,
      nlopen: false,
      xlopen: false,
      hyshow: true,
      xbshow: true,
      nlshow: true,
      xlshow: true,
      isfull: false,
      shownavindex: 0
    })
  } else {
    this.setData({
      content: this.data.hy,
      hyopen: true,
      xbopen: false,
      nlopen: false,
      xlopen: false,
      hyshow: false,
      xbshow: true,
      nlshow: true,
      xlshow: true,
      isfull: true,
      shownavindex: e.currentTarget.dataset.nav
    })
  }
},


listxb: function(e) {
  if (this.data.xbopen) {
    this.setData({
      hyopen: false,
      xbopen: false,
      nlopen: false,
      xlopen: false,
      hyshow: true,
      xbshow: true,
      nlshow: true,
      xlshow: true,
      isfull: false,
      shownavindex: 0
    })
  } else {
    this.setData({
      content: this.data.xb,
      hyopen: false,
      xbopen: true,
      nlopen: false,
      xlopen: false,
      hyshow: true,
      xbshow: false,
      nlshow: true,
      xlshow: true,
      isfull: true,
      shownavindex: e.currentTarget.dataset.nav
    })
  }
},

listnl: function(e) {
  if (this.data.nlopen) {
    this.setData({
      hyopen: false,
      xbopen: false,
      nlopen: false,
      xlopen: false,
      hyshow: true,
      xbshow: true,
      nlshow: true,
      xlshow: true,
      isfull: false,
      shownavindex: 0
    })
  } else {
    this.setData({
      content: this.data.nl,
      hyopen: false,
      xbopen: false,
      nlopen: true,
      xlopen: false,
      hyshow: true,
      xbshow: true,
      nlshow: false,
      xlshow: true,
      isfull: true,
      shownavindex: e.currentTarget.dataset.nav
    })
  }
},


listxl: function(e) {
  if (this.data.xlopen) {
    this.setData({

      hyopen: false,
      xbopen: false,
      nlopen: false,
      xlopen: false,
      hyshow: true,
      xbshow: true,
      nlshow: true,
      xlshow: true,
      isfull: false,
      shownavindex: 0
    })
  } else {
    this.setData({
      content: this.data.xl,
      hyopen: false,
      xbopen: false,
      nlopen: false,
      xlopen: true,
      hyshow: true,
      xbshow: true,
      nlshow: true,
      xlshow: false,
      isfull: true,
      shownavindex: e.currentTarget.dataset.nav
    })
  }
},


hidebg: function(e) {
  this.setData({
    hyopen: false,
    xbopen: false,
    nlopen: false,
    xlopen: false,
    hyshow: true,
    xbshow: true,
    nlshow: true,
    xlshow: true,
    isfull: false,
    shownavindex: 0
  })
},
showInput: function() {
  this.setData({
    inputShowed: true
  });
},
hideInput: function() {
  this.setData({
    inputVal: "",
    inputShowed: false
  });
},
clearInput: function() {
  this.setData({
    inputVal: ""
  });
},
inputTyping: function(e) {
  this.setData({
    inputVal: e.detail.value
  });
}
})