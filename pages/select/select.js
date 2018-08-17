Page({
  data: {
    inputShowed: false,
    inputVal: "",
    name: "baijiameng",
    phone: "123456",
    position: "whatever",
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
    shownavindex: ''
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
  },

  tagChoose: function (e) {
    var ids = e.currentTarget.dataset.id;  //获取自定义的id   
    this.setData({
      id: ids  //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })


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