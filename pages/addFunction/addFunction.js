// pages/addFunction/addFunction.js
const code = `// 云函数入口函数
exports.main = (event, context) => {
  console.log(event)
  console.log(context)
  return {
    sum: event.a + event.b
  }
}`;
Page({
  data: {
    result: '',
    canIUseClipboard: swan.canIUse('setClipboardData')
  },

  onReady() {},

  onLoad: function (options) {},
  copyCode: function () {
    swan.setClipboardData({
      data: code,

      success(res) {
        swan.showToast({
          title: '内容已复制'
        });
      }

    });
  },

  testFunction() {
    swan.cloud.callFunction({
      name: 'sum',
      data: {
        a: 1,
        b: 2
      },
      success: res => {
        swan.showToast({
          title: '调用成功'
        });
        this.setData({
          result: JSON.stringify(res.result)
        });
      },
      fail: err => {
        swan.showToast({
          icon: 'none',
          title: '调用失败'
        });
        console.error('[云函数] [sum] 调用失败：', err);
      }
    });
  }

});