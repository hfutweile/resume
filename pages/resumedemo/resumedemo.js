Page({
  data: {
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
    arrayLowestSalar: ['5000', '4500', '4600', '5200'],
    indexLowestSalar: 0,
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
    var ID=options.id
      wx.request({
        url: 'https://www.yeahempire.com/getResumeById',
        data:{
          resumeId: ID
        },
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          console.log(res.data)
          if (res.statusCode == 200){
            this.setData({
              resume_details: res.data
            })
          }
          
        }
      })
  },
  setUserInputToDatabase:function(e){
    wx.request({
      url: 'https://www.yeahempire.com/setUserInputToDatabase',
      data: {
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