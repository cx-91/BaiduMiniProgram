// pages/userConsole/userConsole.js
Page({
  data: {
    openid: ''
  },

  onReady() {},

  onLoad: function (options) {
    this.setData({
      openid: getApp().globalData.openid
    });
  }
});