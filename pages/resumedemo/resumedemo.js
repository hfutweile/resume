Page({
  data: {
    resumeId:-1,
    LabelInput:0,
    HSalaryInput:0.0,
    LSalaryInput:0.0,
    OnJobInput:null,
    WAdrrInput:null,
    WPosiInput:null,
    LinkRInput:null,
    EvaluateInput:null,
    resume_details: null,
    showTopTips: false,
    isAgree: false,
    arrayLabel: ['优秀', '满意', '一般', '差'],
    indexLabel: 0,
    arrayHighestSalary: ['18000', '16000', '14000', '12000'],
    indexHighestSalary: 0,
    arrayLowestSalary: ['5000', '4500', '4600', '5200'],
    indexLowestSalary: 0,
    arrayOnJob: ['在职', '离职', '下岗'],
    indexOnJob: 0,
    arrayLinkResult: ['已联系', '未接通', '其他'],
    indexLinkResult: 0,
  },
  //获取用户输入的信息
  LabelInput :function(e)
  {
    this.data.LabelInput = e.detail.value;
  },
  HSalaryInput:function(e){
    this.data.HSalaryInput = e.detail.value;
  },
  LSalaryInput: function (e) {
    this.data.LSalaryInput = e.detail.value;
  },
  OnJobInput: function (e) {
    this.data.OnJobInput = e.detail.value;
  },
  WAdrrInput: function (e) {
    this.data.WAdrrInput = e.detail.value;
  },
  WPosiInput: function (e) {
    this.data.WPosiInput = e.detail.value;
  },
  LinkRInput: function (e) {
    this.data.LinkRInput = e.detail.value;
  },
  EvaluateInput: function (e) {
    this.data.EvaluateInput = e.detail.value;
  },
  onLoad : function(options)
  {
    //获取上一个页面传值
    var ID=options.id;
    this.data.resumeId=ID;
    var that=this;
      wx.request({
        url: wx.getStorageSync('url') +'getByResumeId',
        data:{
          openid:wx.getStorageSync('openid'),
          resumeId: ID
        },
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          console.log(res.data)
          if (res.statusCode == 200){
            wx.setStorageSync('resumeCount', wx.getStorageSync('resumeCount')+1)
            console.log(res.data.data[0]);
            var isVip = res.data.vip.vip
            console.log(isVip)
            if(isVip==0){
              res.data.data[0].name='**';
              res.data.data[0].phone_number='**';
            }
            if (res.data.data[0].sex==2)
            {
              res.data.data[0].sex='女';
            }
            else if (res.data.data[0].sex == 1){
              res.data.data[0].sex = '男';
            }
            if(res.data.data[0].hunyinzhuangtai==0)
            {
              res.data.data[0].hunyinzhuangtai = '未婚';
            }
            if (res.data.data[0].hunyinzhuangtai == 1) {
              res.data.data[0].hunyinzhuangtai = '已婚';
            }
            if (res.data.data[0].hunyinzhuangtai == 2) {
              res.data.data[0].hunyinzhuangtai = '离异';
            }
            var industry={
            1:'销售/客服/营销',
            2:'财务',
            3:'人力资源/行政后勤',
            4:'IT/互联网/通信',
            5:'房地产/物业',
            6:'建筑',
            7:'金融',
            8:'交通/物流',
            9: '生产/制造',
            10: '传媒/设计/推广',
            11: '教育/翻译',
            12: '法律',
            13: '商场/服务/收银',
            14: '能源/环保/农业',
            15: '医药',
            16: '酒店/餐饮/快消',
            17: '普工',
            18: '兼职/实习',
            19: '其他'}
            res.data.data[0].hangye = industry[res.data.data[0].hangye]
            var education={
              0:'不限',
              1:'专科',
              2:'本科',
              3:'研究生',
              4:'博士生'
            }
            res.data.data[0].xueli = education[res.data.data[0].xueli]
            that.setData({
              resume_details: res.data.data[0]
            })
            
          }
          
        }
      })
  },
  setUserInputToDatabase:function(e){
    wx.request({
      url: wx.getStorageSync('url')+'setUserInputToDatabase',
      data: {
        resumeId:this.data.resumeId,
        labelInput: this.data.LabelInput,
        hSalaryInput: this.data.HSalaryInput,
        lSalaryInput: this.data.LSalaryInput,
        onJobInput:this.data.OnJobInput,
        wAdrrInput: this.data.WAdrrInput,
        wPosiInput: this.data.WPosiInput,
        linkRInput: this.data.LinkRInput,
        evaluateInput: this.data.EvaluateInput,
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success:function(e){
        if (res.statusCode == 200)
        {
          console.log(res.data);
          console.log(res.data.msg);
        }
      }
    })
  },
  bindPickerChangeLabel: function (e) {
    this.setData({
      indexLabel: e.detail.value
    })
  },
  bindPickerChangeHighestSalary: function (e) {
    this.setData({
      indexHighestSalary: e.detail.value
    })
  },
  bindPickerChangeLowestSalary: function (e) {
    this.setData({
      indexLowestSalary: e.detail.value
    })
  },
  bindPickerChangeOnJob: function (e) {
    this.setData({
      indexOnJob: e.detail.value
    })
  },
  bindPickerChangeLinkResult: function(e) {
    this.setData({
      indexLinkResult: e.detail.value
    })
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }
});