Page({
  data: {
    resume_id:null,
    resume_details: null,
    showTopTips: false,
    radioItems: [
      { name: 'cell standard', value: '0' },
      { name: 'cell standard', value: '1', checked: true }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],
    date: "2016-09-01",
    time: "12:01",
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    countries: ["中国", "美国", "英国"],
    countryIndex: 0,
    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,
    isAgree: false,

        array: ['优秀6', '满意2', '一般1', '差3'],
    index: 0,
  },
  onLoad : function(options)
  {
      //获取上一个页面传值
      var resumeID=options.id
      this.setData({
        resume_details: {
        name: '刘伟乐', sex: '男', age: '23', birth_date: '1970-01-23', addr: '四川', group: '汉族', marry: '未婚', PoliticalStatus: '群众', industry: '酒店/餐饮/快消', position: '餐饮店长', hopeWorkspace: '湖南 长沙 芙蓉区', education: '本科', educationalType: '函授', school: 'xxx大学', major: '工商管理', workYear: '10年', professionalTitle: 'xxxx', registerTime: '2018-08-16', lastViewTime: '2018-08-19'
        }
      })
    console.log("resumedemo resumeId:" + getApp().globalData.resumeId)
      wx.request({
        url: 'https://www.yeahempire.com/getResumeById',
        data:{
          resumeId: getApp().globalData.resumeId
          //resumeId:resumeID
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          this.setData({
            resume_details: res.data
          })
        }
      })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }
});