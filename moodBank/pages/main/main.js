// miniprogram/pages/main/main.js
var utils = require("../../utils/utils");

// var that;
// var isFirst = true;
// var progress = {};
// var progress1;
// var progress2;
// var summaryCount = 0;
// var timeIntv;
// var maxSum;


const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
    years.push(i)
}

for (let i = 1; i <= 12; i++) {
    months.push(i)
}

for (let i = 1; i <= 31; i++) {
    days.push(i)
}

let app = getApp();

Page({
    data: {
        years,
        year: date.getFullYear(),
        months,
        month: 2,
        days,
        day: 2,
        value: [9999, 1, 1]
    },
    bindChange(e) {
        const val = e.detail.value
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]]
        })
    }
});

Page({
    data: {
        multiIndex: [0, 0, 0],
        multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']]
    },
    bindMultiPickerChange: function (e) {
        console.log('picker-multiSelector changed，值为', e.detail.value)
        this.setData(
            'multiIndex', e.detail.value
        );
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.getData('multiArray'),
            multiIndex: this.getData('multiIndex')
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
                        data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                        break;
                    case 1:
                        data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
                        data.multiArray[2] = ['鲫鱼', '带鱼'];
                        break;
                }
                data.multiIndex[1] = 0;
                data.multiIndex[2] = 0;
                break;
            case 1:
                switch (data.multiIndex[0]) {
                    case 0:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                                break;
                            case 1:
                                data.multiArray[2] = ['蛔虫'];
                                break;
                            case 2:
                                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                                break;
                            case 3:
                                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                                break;
                            case 4:
                                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                                break;
                        }
                        break;
                    case 1:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['鲫鱼', '带鱼'];
                                break;
                            case 1:
                                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                                break;
                            case 2:
                                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                                break;
                        }
                        break;
                }
                data.multiIndex[2] = 0;
                break;
        }
        this.setData('multiArray', data.multiArray);
        this.setData('multiIndex', data.multiIndex);
    }
});



// Page({
//     data: {
//         timer: '',
//         resultComment: '',
//         per: ''
//     },
//     onShow() {
//         swan.getSystemInfo({
//             success: res => {
//                 let systemWidth = res.screenWidth;
//                 this.data.per = systemWidth / 375;
//             }
//         });
//         // 打点操作
//         const openParams = app.globalData.openParams;
//         if (openParams) {
//             swan.reportAnalytics('pageshow', {
//                 fr: openParams,
//                 type: 'component',
//                 name: 'canvas'
//             });
//         }
//         const totalItems = 100;
//         const rightItems = 80;
//         let completePercent = parseInt((rightItems / totalItems) * 100, 10);
//         this.getResultComment(completePercent);
//         this.showScoreAnimation(rightItems, totalItems);
//     },
//     onHide() {
//         app.globalData.openParams = '';
//     },

//     /**
//      * 得到各个百分比对应的结果
//      *
//      * @param {number=} completePercent 百分比数据
//      */
//     getResultComment(completePercent) {
//         const cp = completePercent;
//         this.setData({
//             resultComment: cp < 80 ? (cp < 60 ? '不及格' : '中等') : (cp < 90 ? '良好' : '优秀')
//         });
//     },

//     /**
//      * 根据百分比数据画出圆形比例图
//      *
//      * @param {number=} rightItems 完成度百分比数据
//      * @param {number=} totalItems 全部百分比数据
//      */
//     showScoreAnimation(rightItems, totalItems) {
//         let copyRightItems = 0;
//         this.setData({
//             timer: setInterval(() => {
//                 copyRightItems++;
//                 if (copyRightItems === rightItems) {
//                     clearInterval(this.data.timer);
//                 } else {
//                     let ctx = swan.createCanvasContext('mycanvas');
//                     // 灰色底层
//                     let per = this.data.per;
//                     ctx.setLineWidth(6);
//                     ctx.setStrokeStyle('#F3F4F7');
//                     ctx.setLineCap('round');
//                     ctx.beginPath();
//                     ctx.arc(165 * per, 110 * per, 70 * per, 0, 2 * Math.PI, false);
//                     ctx.stroke();
//                     ctx.setLineWidth(6);
//                     ctx.setStrokeStyle('#38F');
//                     ctx.setLineCap('round');
//                     ctx.beginPath();
//                     ctx.arc(165 * per, 110 * per, 70 * per,
//                         -Math.PI * 1 / 2,
//                         2 * Math.PI * (copyRightItems / totalItems) - Math.PI * 1 / 2,
//                         false);
//                     ctx.stroke();
//                     ctx.draw();
//                 }
//             }, 20)
//         });
//     },

//     touchstart(e) {
//         console.log('touchstart', e);
//     },
//     touchmove(e) {
//         console.log('touchmove', e);
//     },
//     touchend(e) {
//         console.log('touchend', e);
//     },
//     touchcancel(e) {
//         console.log('touchcancel', e);
//     },
//     longtap(e) {
//         console.log('longtap', e);
//     },
//     error(e) {
//         console.log('error', e.detail.errMsg);
//     }
// });


// Page({
//   /**
//    * 页面的初始数据
//    */
//   data: {
//     pattern: 0,
//     wordInfo: [],
//     queryWordInfo: [],
//     isUnknown: false,
//     isEasy: false,
//     isReviewing: false,
//     isMask: true,
//     isChinese: false,
//     isQuery: false,
//     summaryList: [],
//     nwn1: 0,
//     nwn2: 0,
//     own1: 0,
//     own2: 0,
//     time: 0
//   },

//   onReady() {},

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     that = this;
//     var date = new Date();
//     this.initProgress();
//     this.initWordInfo();
//     this.pronounce();
//     console.log(this.data.wordInfo);
//     timeIntv = setInterval(() => {
//       var timeMinute = that.data.time;
//       var timeMinuteNow = (new Date().getTime() - progress.startTime) / 60000;
//       timeMinuteNow = parseInt(timeMinuteNow);

//       if (timeMinuteNow > timeMinute) {
//         that.setData({
//           time: timeMinuteNow
//         });
//       }
//     }, 1000);
//   },
//   onUnload: function () {
//     this.saveProgress();
//     clearInterval(timeIntv);
//   },
//   saveProgress: function () {
//     if (progress.type == 0) {
//       swan.setStorageSync('newWordsProgress', progress);
//     } else {
//       swan.setStorageSync('oldWordsProgress', progress);
//     }
//   },
//   pronounce: function () {
//     const innerAudioContext = swan.createInnerAudioContext();
//     innerAudioContext.autoplay = true;
//     innerAudioContext.src = that.data.wordInfo.audioUrl;
//     innerAudioContext.onPlay(() => {});
//   },
//   changePattern: function () {
//     var pattern = that.data.pattern;

//     if (pattern == 0) {
//       pattern = 1;
//       that.setData({
//         pattern: pattern
//       });
//       return;
//     } else if (pattern == 1) {
//       that.data.summaryList.push(that.data.wordInfo);
//       progress.localTimeCount += 1;

//       if (progress.localTimeCount % maxSum == 0 || progress.studingWords.length == 0 && progress.unstudyWords.length == 0) {
//         maxSum = progress.studingWords.length + progress.unstudyWords.length < 7 ? progress.studingWords.length + progress.unstudyWords.length : 7;
//         progress.localTimeCount = 0;
//         this.createSummaryList();
//         pattern = 2;
//         that.setData({
//           pattern: pattern
//         });
//       } else {
//         pattern = 0;
//         if (!that.data.isChinese) this.pronounce();
//         that.setData({
//           pattern: pattern
//         });
//       }
//     } else if (pattern == 2) {
//       if (progress.unstudyWords.length == 0 && progress.studingWords.length == 0) {
//         progress.complete = true;
//         this.saveProgress();

//         if (progress.type == 0) {
//           this.initProgress();
//           this.initWordInfo();
//         } else {
//           swan.navigateBack({
//             delta: 1
//           });
//         }
//       }

//       pattern = 0;
//       if (!that.data.isChinese) this.pronounce();
//       that.setData({
//         pattern: pattern,
//         summaryList: []
//       });
//     }
//   },
//   selectWord: function (e) {
//     var wordInfo = this.data.wordInfo; // wordInfo.magicSentence[e.currentTarget.dataset.index].selected = !wordInfo.magicSentence[e.currentTarget.dataset.index].selected;

//     var word;

//     for (var i = 0; i < wordInfo.magicSentence.length; i++) {
//       if (i != e.currentTarget.dataset.index) {
//         wordInfo.magicSentence[i].selected = false;
//       } else {
//         if (wordInfo.magicSentence[i].selected != true) {
//           wordInfo.magicSentence[i].selected = true;
//           word = wordInfo.magicSentence[i].word;
//         } else {
//           return;
//         }
//       }
//     }

//     that.setData({
//       isQuery: false,
//       wordInfo: wordInfo
//     }); // console.log("query="+word)
//     //查询单词等待回调

//     swan.cloud.callFunction({
//       name: 'getWord',
//       data: {
//         name: word
//       },
//       success: res => {
//         console.log(res);

//         if (!res.result.valid) {
//           swan.showToast({
//             title: '无该单词信息',
//             icon: 'none',
//             duration: 2000
//           });
//           this.exitQuery();
//         } else {
//           that.setData({
//             queryWordInfo: res.result.wordInfo,
//             isQuery: true
//           });
//         }
//       },
//       fail: err => {
//         swan.showToast({
//           title: '获取单词信息失败',
//           icon: 'none',
//           duration: 2000
//         });
//         this.exitQuery();
//       }
//     });
//   },
//   exitQuery: function (e) {
//     var wordInfo = this.data.wordInfo;

//     for (var i = 0; i < wordInfo.magicSentence.length; i++) {
//       wordInfo.magicSentence[i].selected = false;
//     }

//     that.setData({
//       wordInfo: wordInfo,
//       isQuery: false
//     });
//   },
//   initProgress: function () {
//     maxSum = 7;
//     progress1 = swan.getStorageSync('newWordsProgress');
//     progress2 = swan.getStorageSync('oldWordsProgress');

//     if (!progress1.complete) {
//       progress = progress1;
//       this.updateTopBar();
//     } else {
//       progress = progress2;
//       this.updateTopBar();
//     }
//   },
//   updateTopBar: function () {
//     var numNew = progress1.totalNum;
//     var numOld = progress2.totalNum;

//     if (progress.type == 0) {
//       that.setData({
//         own1: 0,
//         own2: numOld,
//         nwn1: progress.studiedWords.length + progress.easyWords.length,
//         nwn2: numNew
//       });
//     } else {
//       that.setData({
//         own1: progress.studiedWords.length + progress.easyWords.length,
//         own2: numOld,
//         nwn1: numNew,
//         nwn2: numNew
//       });
//     }
//   },
//   progressForward: function (first) {
//     //write back
//     if (!first) if (!that.data.isEasy) {
//       if (that.data.isReviewing) {
//         if (that.data.isUnknown) {
//           progress.studingWords.push(progress.studingWords.shift());
//         } else {
//           progress.unstudyWords.push(progress.studingWords.shift());
//         }
//       } else {
//         if (that.data.isUnknown) {
//           progress.studingWords.push(progress.unstudyWords.shift());
//         } else {
//           progress.studiedWords.push(progress.unstudyWords.shift());
//         }
//       }
//     } else {
//       if (that.data.isReviewing) {
//         progress.easyWords.push(progress.studingWords.shift());
//       } else {
//         progress.easyWords.push(progress.unstudyWords.shift());
//       }

//       that.setData({
//         isEasy: false
//       });
//     } //

//     var nextWord;
//     progress.globalTimeCount += 1;

//     if (progress.studingWords.length != 0 && progress.globalTimeCount - progress.studingWords[0].timeCount > 7) {
//       nextWord = progress.studingWords[0];
//       progress.studingWords[0].timeCount = progress.globalTimeCount;
//       that.setData({
//         isReviewing: true,
//         wordInfo: nextWord
//       });
//     } else if (progress.unstudyWords.length != 0) {
//       nextWord = progress.unstudyWords[0];
//       progress.unstudyWords[0].timeCount = progress.globalTimeCount; // progress.unstudyWords.shift();

//       that.setData({
//         isReviewing: false,
//         wordInfo: nextWord
//       });
//     } else if (progress.studingWords.length != 0) {
//       nextWord = progress.studingWords[0];
//       progress.studingWords[0].timeCount = progress.globalTimeCount;
//       that.setData({
//         isReviewing: true,
//         wordInfo: nextWord
//       });
//     }

//     that.setData({
//       isUnknown: false
//     });
//     return;
//   },
//   initWordInfo: function () {
//     this.progressForward(1);
//     this.initMagicSentence();
//   },
//   updateWordInfo: function () {
//     this.progressForward();
//     this.initMagicSentence();
//   },
//   initMagicSentence: function () {
//     var wordInfo = this.data.wordInfo;
//     wordInfo.magicSentence = utils.parseSentence(this.data.wordInfo.sentence, this.data.wordInfo.name);
//     this.setData({
//       wordInfo: wordInfo
//     });
//   },
//   knownHandle: function () {
//     if (!that.data.isUnknown) {
//       that.setData({
//         isUnknown: false
//       });
//     }

//     this.changePattern();
//   },
//   unknownHandle: function (e) {
//     if (that.data.isReviewing || that.data.isUnknown) {
//       that.setData({
//         isUnknown: true
//       });
//       that.changePattern();
//     } else {
//       that.setData({
//         isUnknown: true
//       });
//     }
//   },
//   easymark: function (e) {
//     that.setData({
//       isEasy: true
//     });
//     that.changePattern();
//   },
//   uneasymark: function (e) {
//     that.setData({
//       isEasy: false
//     });
//   },
//   nextHandle: function (e) {
//     that.updateWordInfo();
//     that.changePattern();
//     that.updateTopBar();
//   },
//   createSummaryList: function () {
//     var summaryList = that.data.summaryList;

//     for (let i of summaryList) {
//       i.mask = that.data.isMask;
//     }

//     that.setData({
//       summaryList: summaryList
//     }); // var num = progress.globalTimeCount%7==0?7:progress.globalTimeCount%7;
//     // var summaryList = []
//     // var i1 = progress.studingWords.length - 1;
//     // var i2 = progress.studiedWords.length - 1;
//     // var i3 = progress.easyWords.length - 1;
//     // //may error
//     // while(num--){
//     //   if(i1<0 && i2<0){
//     //     continue
//     //   }
//     //   if(i1 < 0){
//     //     summaryList.unshift(progress.studiedWords[i2]);
//     //     i2--;
//     //   }
//     //   else if(i2 < 0){
//     //     summaryList.unshift(progress.studingWords[i1]);
//     //     i1--;
//     //   }
//     //   else{
//     //     if(progress.studingWords[i1].timeCount > progress.studiedWords[i2].timeCount){
//     //       summaryList.unshift(progress.studingWords[i1]);
//     //       i1--;
//     //     }
//     //     else{
//     //       summaryList.unshift(progress.studiedWords[i2]);
//     //       i2--;
//     //     }
//     //   }
//     //   summaryList[0].mask = that.data.isMask
//     //}
//   },
//   wordMask: function (e) {
//     var summaryList = that.data.summaryList;
//     summaryList[e.currentTarget.dataset.index].mask = !summaryList[e.currentTarget.dataset.index].mask;
//     that.setData({
//       summaryList: summaryList
//     });
//   },
//   maskSwitchChange: function (e) {
//     var summaryList = that.data.summaryList;
//     var mask = e.detail.value;

//     for (let i of summaryList) {
//       i.mask = mask;
//     }

//     that.setData({
//       isMask: mask,
//       summaryList: summaryList
//     });
//   },
//   chineseSwitchChange: function (e) {
//     this.setData({
//       isChinese: !this.data.isChinese
//     });
//   },
//   unknownmark: function (e) {
//     that.setData({
//       isUnknown: true
//     });
//   },
//   viewQueryWordInfo: function (e) {
//     swan.navigateTo({
//       url: '../wordInfo/wordInfo?name=' + that.data.queryWordInfo.name
//     });
//   }
// });