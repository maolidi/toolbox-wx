var dateTimePicker = require('../../utils/dateTimePicker.js');

// pages/tools/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTimeArray: null,
    startTime: null,
    endTimeArray: null,
    endTime: null,
    startYear: 2000,
    endYear: 2050,
    //startTime: formatTime(new Date()),
    //endTime: formatTime(Date.parse(new Date())+86400000,'date')+'  07:00:00',
    timeDiff:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    let obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    let obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    let lastArray = obj1.dateTimeArray.pop();
    let lastTime = obj1.dateTime.pop();
    lastArray = obj.dateTimeArray.pop();
    lastTime = obj.dateTime.pop();
    
    let endTime = (formatTime(Date.parse(new Date()) + 86400000, 'date')+'-07-00').split('-');
    for(let i=0;i<5;i++){
      for (let j = 0; j < obj1.dateTimeArray[i].length;j++){
        if (obj1.dateTimeArray[i][j] == endTime[i]){
          endTime[i] = j;
          break;
        }
      }
    }
    this.setData({
      startTime: obj.dateTime,
      startTimeArray: obj.dateTimeArray,
      endTimeArray: obj1.dateTimeArray,
      endTime: endTime
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let Arr = this.data.startTimeArray;
    let Date = this.data.startTime;
    let time1 = Arr[0][Date[0]] + '-' + Arr[1][Date[1]] + '-' + Arr[2][Date[2]] + ' ' + Arr[3][Date[3]] + ':' + Arr[4][Date[4]];
    Arr = this.data.endTimeArray;
    Date = this.data.endTime;
    let time2 = Arr[0][Date[0]] + '-' + Arr[1][Date[1]] + '-' + Arr[2][Date[2]] + ' ' + Arr[3][Date[3]] + ':' + Arr[4][Date[4]];
    let Diff = timeDiff(time1, time2);
    this.setData({ timeDiff: Diff });
    
  },
  changeStartTime(e) {
    let Arr = this.data.startTimeArray;
    let Date = e.detail.value;
    let time1 = Arr[0][Date[0]] + '-' + Arr[1][Date[1]] + '-' + Arr[2][Date[2]] + ' ' + Arr[3][Date[3]] + ':' + Arr[4][Date[4]];
    Arr = this.data.endTimeArray;
    Date = this.data.endTime;
    let time2 = Arr[0][Date[0]] + '-' + Arr[1][Date[1]] + '-' + Arr[2][Date[2]] + ' ' + Arr[3][Date[3]] + ':' + Arr[4][Date[4]];
    let Diff = timeDiff(time1,time2);
    this.setData({ startTime: e.detail.value, timeDiff: Diff });
  },
  changeStartTimeColumn(e) {
    var arr = this.data.startTime, dateArr = this.data.startTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      startTimeArray: dateArr
    });
  },
  changeEndTime(e) {
    let Arr = this.data.startTimeArray;
    let Date = this.data.startTime;
    let time1 = Arr[0][Date[0]] + '-' + Arr[1][Date[1]] + '-' + Arr[2][Date[2]] + ' ' + Arr[3][Date[3]] + ':' + Arr[4][Date[4]];
    Arr = this.data.endTimeArray;
    Date = e.detail.value;
    let time2 = Arr[0][Date[0]] + '-' + Arr[1][Date[1]] + '-' + Arr[2][Date[2]] + ' ' + Arr[3][Date[3]] + ':' + Arr[4][Date[4]];
    let Diff = timeDiff(time1, time2);
    this.setData({ endTime: e.detail.value, timeDiff: Diff });
  },
  changeEndTimeColumn(e) {
    var arr = this.data.endTime, dateArr = this.data.endTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      endTimeArray: dateArr
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
})
// 格式化时间
function formatTime(obj,timeType) {
  let t = typeof obj == 'string' ? new Date(obj.replace(/-/g, "/")) : new Date(obj);
  let Y = t.getFullYear();
  let m = t.getMonth() + 1;
  let d = t.getDate();
  let h = t.getHours();
  let i = t.getMinutes();
  let s = t.getSeconds();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  h = h < 10 ? '0' + h : h;
  i = i < 10 ? '0' + i : i;
  s = s < 10 ? '0' + s : s;
  if (typeof timeType !='undefined'){
    if (timeType=='date'){
      return Y + '-' + m + '-' + d;
    } else if (timeType == 'time'){
      return h + ':' + i + ':' + s;
    } else{
      return Y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
    }
  }else{
    return Y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
  }
}

// 计算时差
function timeDiff(time1,time2){
  let diff=Date.parse(time2)-Date.parse(time1);
  let day=0;
  let hour=0;
  let min=0;
  let sec=0;
  day = Math.floor(diff / 86400000);
  diff = diff % 86400000;
  hour = Math.floor(diff / 3600000);
  diff = diff % 3600000;
  min = Math.floor(diff / 60000);
  sec = (diff % 60000)/1000;
  return day + '天' + hour + '时' + min + '分' + sec;
}