// miniprogram/pages/status/status.js
/**
 * @file demo component for scroll-view
 * @author sunbai
 */
/* global Page, swan, getApp */

let app = getApp();
const order = ['one', 'two', 'three'];

/* eslint-disable babel/new-cap */
Page({
/* eslint-enable babel/new-cap */
    data: {
        scrollIntoView: 'one',
        scrollTop: 0,
        scrollLeft: 0,
        /* eslint-disable max-len */
        scrollList: [{
            src: 'https://b.bdstatic.com/miniapp/image/young.jpeg',
            description: '【少年的你】：影片简介：陈念是一名即将参加高考的高三学生，同校女生胡晓蝶的跳楼自杀让她的生活陷入了困顿之中。胡晓蝶死后，陈念遭到了以魏莱为首的三人组的霸凌，魏莱虽然表面上看来是乖巧的优等生，实际上却心思毒辣，胡晓蝶的死和她有着千丝万缕的联系。一次偶然中，陈念邂逅了名为小北的小混混...'
        }, {
            src: 'https://b.bdstatic.com/miniapp/image/airCaptain.jpeg',
            description: '【中国机长】根据2018年5月14日四川航空3U8633航班机组成功处置特情真实事件改编。机组执行航班任务时，在万米高空突遇驾驶舱风挡玻璃爆裂脱落、座舱释压的极端罕见险情，生死关头，他们临危不乱、果断应对、正确处置，确保了机上全部人员的生命安全，创造了世界民航史上的奇迹'
        }, {
            src: 'https://b.bdstatic.com/miniapp/image/young.jpeg',
            description: '【催眠.裁决】轰动全港的林氏家族凶杀案踏入审讯最后一天，陪审团准备退庭商议时，成员之一许立生突然收到女儿茵茵被绑架的消息，神秘人要求曾为国际催眠权威的立生通过催眠术令陪审团裁定被告谋杀罪名成立，否则其女儿将被撕票，这也就意味着立生必须在狭小的空间内、众目睽睽之下，不用专业工具隐秘地催眠至少4个人。立生偷偷将茵茵被绑架的讯息转发给曾为国内特种部队成员的小舅杨凯后，进入了退庭商议室…'
        }]
        /* eslint-enable max-len */
    },
    onShow() {
        // 打点操作
        const openParams = app.globalData.openParams;
        if (openParams) {
            swan.reportAnalytics('pageshow', {
                fr: openParams,
                type: 'component',
                name: 'scroll-view'
            });
        }
    },
    onHide() {
        app.globalData.openParams = '';
    },
    toLeft() {
        swan.showToast({
            title: '到最左边了',
            icon: 'none'
        });
    },
    toRight() {
        swan.showToast({
            title: '到最右边了',
            icon: 'none'
        });
    },
    upper() {
        swan.showToast({
            title: '到顶了',
            icon: 'none'
        });
    },

    lower() {
        swan.showToast({
            title: '到底了',
            icon: 'none'
        });
    },

    scroll(e) {
        console.log('获取滚动事件的详细信息e.detail：', e.detail);
        this.setData({
            scrollTop: e.detail.scrollTop
        });
    },
    scrollToTop(e) {
        console.log(e);
        this.setData({
            scrollTop: 0
        });
    },
    tap(e) {
        for (let i = 0; i < order.length; ++i) {
            if (order[i] === this.data.scrollIntoView) {
                const next = (i + 1) % order.length;
                this.setData({
                    scrollIntoView: order[next],
                    scrollTop: next * 500
                });
                break;
            }
        }
    },
    tapMove() {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        });
    }
});





// function rpx2px(rpx) {
//   var px = rpx / 750 * swan.getSystemInfoSync().windowWidth;
//   return px;
// }

// function listMax(list) {
//   var listMax = -99999;

//   for (var i = 0; i < list.length; i++) {
//     if (list[i] > listMax) {
//       listMax = list[i];
//     }
//   }

//   return listMax;
// }

// function listMin(list) {
//   var listMin = 99999;

//   for (var i = 0; i < list.length; i++) {
//     if (list[i] < listMin) {
//       listMin = list[i];
//     }
//   }

//   return listMin;
// }

// Page({
//   /**
//    * 页面的初始数据
//    */
//   data: {
//     totalNum: 8110,
//     masterNum: 7559,
//     studingNum: 249,
//     easyNum: 559,
//     progress: {
//       date: ["4.05", "4.06", "4.07", "4.08", "4.09", "4.10", "4.11"],
//       total: [1200, 1292, 1412, 1532, 1672, 1921, 2100],
//       master: [600, 700, 800, 900, 1100, 1200, 1400]
//     },
//     stastistics: {
//       date: ["4.05", "4.06", "4.07", "4.08", "4.09", "4.10", "4.11"],
//       total: [140, 122, 142, 152, 162, 151, 110],
//       master: [60, 70, 80, 90, 110, 120, 100]
//     }
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     this.drawCanvas1();
//     this.drawCanvas2();
//   },
//   drawCanvas1: function (e) {
//     var progress = this.data.progress;
//     var yLabelInc = (listMax(progress.total) - listMin(progress.master)) / 6;
//     var ctx1 = swan.createCanvasContext('canvas1');
//     ctx1.translate(rpx2px(75), rpx2px(50));
//     ctx1.setStrokeStyle("#eeeeee");
//     ctx1.setGlobalAlpha(1);
//     ctx1.setFillStyle('#333333');
//     ctx1.setFontSize(rpx2px(20)); //init grid

//     for (var i = 0; i < 7; i++) {
//       var x = rpx2px(i * 540 / 6);
//       var y = rpx2px(300);
//       ctx1.moveTo(x, 0);
//       ctx1.lineTo(x, y);
//       ctx1.fillText(progress.date[i], x - ctx1.measureText(progress.date[i]).width / 2, y + 15);
//     }

//     for (var i = 0; i < 7; i++) {
//       var x = rpx2px(540);
//       var y = rpx2px(i * 300 / 6);
//       ctx1.moveTo(0, y);
//       ctx1.lineTo(x, y);
//       if (i != 6) ctx1.fillText((listMax(progress.total) - yLabelInc * i).toString(), -ctx1.measureText((listMax(progress.total) - yLabelInc * i).toString()).width - 5, y + 5);
//     }

//     ctx1.stroke();
//     ctx1.draw(); //draw data1

//     ctx1.setGlobalAlpha(0.3);
//     ctx1.setFillStyle('#7bed9f');
//     ctx1.moveTo(0, rpx2px(300));

//     for (var i = 0; i < 7; i++) {
//       var x = rpx2px(i * 540 / 6);
//       var y = rpx2px((1 - (progress.total[i] - listMin(progress.master)) / parseFloat(yLabelInc * 6)) * 300);
//       ctx1.lineTo(x, y);
//     }

//     ctx1.lineTo(rpx2px(540), rpx2px(300));
//     ctx1.lineTo(0, rpx2px(300));
//     ctx1.fill();
//     ctx1.draw(true); //draw data2

//     ctx1.setGlobalAlpha(0.2);
//     ctx1.setFillStyle('#2ed573');
//     ctx1.moveTo(0, rpx2px(300));

//     for (var i = 0; i < 7; i++) {
//       var x = rpx2px(i * 540 / 6);
//       var y = rpx2px((1 - (progress.master[i] - listMin(progress.master)) / parseFloat(yLabelInc * 6)) * 300);
//       ctx1.lineTo(x, y);
//     }

//     ctx1.lineTo(rpx2px(540), rpx2px(300));
//     ctx1.lineTo(0, rpx2px(300));
//     ctx1.fill();
//     ctx1.draw(true);
//   },
//   drawCanvas2: function () {
//     var progress = this.data.stastistics;
//     var yLabelInc = (listMax(progress.total) - listMin(progress.master)) / 6;
//     var ctx1 = swan.createCanvasContext('canvas2');
//     ctx1.translate(rpx2px(75), rpx2px(50));
//     ctx1.setStrokeStyle("#eeeeee");
//     ctx1.setFillStyle('#333333');
//     ctx1.setGlobalAlpha(1);
//     ctx1.setFontSize(rpx2px(20)); //init grid

//     for (var i = 0; i < 7; i++) {
//       var x = rpx2px(i * 540 / 6);
//       var y = rpx2px(300);
//       ctx1.moveTo(x, 0);
//       ctx1.lineTo(x, y);
//       ctx1.fillText(progress.date[i], x - ctx1.measureText(progress.date[i]).width / 2, y + 15);
//     }

//     for (var i = 0; i < 7; i++) {
//       var x = rpx2px(540);
//       var y = rpx2px(i * 300 / 6);
//       ctx1.moveTo(0, y);
//       ctx1.lineTo(x, y);
//       if (i != 6) ctx1.fillText((listMax(progress.total) - yLabelInc * i).toString(), -ctx1.measureText((listMax(progress.total) - yLabelInc * i).toString()).width - 5, y + 5);
//     }

//     ctx1.stroke();
//     ctx1.draw(); //draw data1

//     ctx1.setGlobalAlpha(0.5);
//     ctx1.setFillStyle('#f3a683');

//     for (var i = 1; i < 7; i++) {
//       var x = rpx2px(i * 540 / 6);
//       var y = rpx2px((1 - (progress.total[i] - listMin(progress.master)) / parseFloat(yLabelInc * 6)) * 300);
//       ctx1.rect(x - 10, y, 20, rpx2px(300) - y);
//     }

//     ctx1.fill();
//     ctx1.draw(true); //draw data2

//     ctx1.setGlobalAlpha(0.3);
//     ctx1.setFillStyle('#e77f67');

//     for (var i = 1; i < 7; i++) {
//       var x = rpx2px(i * 540 / 6);
//       var y = rpx2px((1 - (progress.master[i] - listMin(progress.master)) / parseFloat(yLabelInc * 6)) * 300);
//       ctx1.rect(x - 10, y, 20, rpx2px(300) - y);
//     }

//     ctx1.fill();
//     ctx1.draw(true);
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {},

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {},

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {},

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {},

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {},

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {},

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {}
// });