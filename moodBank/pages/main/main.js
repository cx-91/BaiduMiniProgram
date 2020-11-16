/**
 * @file index.js
 * @author swan
 */
const app = getApp()

Page({
    data: {
        buttonGroupDisplay: 'none',
        cardDisplay: 'inline-block',
        screenWidth: 300,
        screenHeight: 600,
        moodShow: "show",
        impactShow: "hide",
        changeShow: "hide",
        canvasShow: "hide",
        textShow: "hide",
        buttonGroupShow: "hide",
        cardShow: "show",
    },
    onLoad() {
        this.canvasContext = swan.createCanvasContext('mycanvas');
        const sys = swan.getSystemInfoSync();
        this.setData({
            screenWidth: sys.screenWidth,
            screenHeight: sys.screenHeight
        })
    },
    onShow() {
    },
    onHide() {
        app.globalData.openParams = '';
    },

    /**
     * 得到各个百分比对应的结果
     *
     * @param {number=} completePercent 百分比数据
     */
    getResultComment(completePercent) {
        const cp = completePercent;
        this.setData({
            resultComment: cp < 80 ? (cp < 60 ? '不及格' : '中等') : (cp < 90 ? '良好' : '优秀')
        });
    },

    touchstart(e) {
        console.log('touchstart', e);
    },
    touchmove(e) {
        console.log('touchmove', e);
    },
    touchend(e) {
        console.log('touchend', e);
    },
    touchcancel(e) {
        console.log('touchcancel', e);
    },
    longtap(e) {
        console.log('longtap', e);
    },
    error(e) {
        console.log('error', e.detail.errMsg);
    },
    download() {
        swan.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 300,
            height: 600,
            destWidth: 300,
            destHeight: 600,
            canvasId: 'mycanvas',
            fileType: 'jpg',
            quality: 1,
            success: res => {
                this.setData('src', res.tempFilePath);
                // swan.showModal({
                //     title: '图片路径',
                //     content: JSON.stringify(res.tempFilePath)
                // })
                swan.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: res => {
                        swan.showModal({
                            title: '成功',
                            content: '图片保存到相册'
                        })
                    },
                    fail: err => {
                        console.log("failed");
                    }
                });
            }
        })
    },
    moodChange(e) {
        const mood = e.detail.value;
        const ctx = this.canvasContext;
        ctx.beginPath();
        ctx.arc(0.5*(this.data.screenWidth-20), 0.3*this.data.screenHeight, 50, 0, 2 * Math.PI);
        if (mood == "happy") {
            ctx.setFillStyle('#ff9a55');
        } else if (mood == "sad") {
            ctx.setFillStyle('#6e7c5e');
        } else if (mood == "calm") {
            ctx.setFillStyle('#c9aa88');
        }
        ctx.fill();
        ctx.draw();
        var that = this;
        setTimeout(function() {
            const query = swan.createSelectorQuery();
            query
                .select('.mood-selector')
                .boundingClientRect(function (res) {
                    // console.log(res);
                })
                .exec(function(rect){
                    that.setData({
                        moodShow: 'hide',
                        impactShow: 'show'
                    })
                })
        }, 500);

    },
    impactChange(e) {
        const impact = e.detail.value;
        var that = this;
        setTimeout(function() {
            const query = swan.createSelectorQuery();
            query
                .select('.mood-selector')
                .boundingClientRect(function (res) {
                    // console.log(res);
                })
                .exec(function(rect){
                    that.setData({
                        changeShow: 'show',
                        impactShow: 'hide',
                    })
                })
        }, 500);
    },
    changeChange(e) {
        const change = e.detail.value;
        var that = this;
        setTimeout(function() {
            const query = swan.createSelectorQuery();
            query
                .select('.mood-selector')
                .boundingClientRect(function (res) {
                    // console.log(res);
                })
                .exec(function(rect){
                    that.setData({
                        changeShow: 'hide',
                        textShow: 'show',
                    })
                })
        }, 500);
    },
    textConfirm(e) {
        // console.log(e);
        const text = e.detail.value;
        const ctx = this.canvasContext;
        ctx.setFontSize(20);
        ctx.setTextAlign('center');
        ctx.setFillStyle('#555');
        ctx.fillText(text, 0.5*(this.data.screenWidth-20), 0.3*this.data.screenHeight+80);
        ctx.draw(true)

        var that = this;
        setTimeout(function() {
            const query = swan.createSelectorQuery();
            query
                .select('.mood-selector')
                .boundingClientRect(function (res) {
                    // console.log(res);
                })
                .exec(function(rect){
                    that.setData({
                        textShow: 'show',
                        buttonGroupShow: 'show',
                        canvasShow: 'show',
                        cardShow: 'hide'
                    })
                })
        }, 0);
    },
    resetview() {
        const ctx = this.canvasContext;
        ctx.clearRect(0, 0, this.data.screenWidth, this.data.screenHeight);
        ctx.draw();
        this.setData({
            buttonGroupDisplay: 'none',
            moodShow: 'show',
            cardShow: 'show',
            canvasShow: 'hide'
        })
    },
    saveMood(e) {
        swan.getUserInfo({
            success: res => {
                const userInfo = res.userInfo;
                const obj = {
                    userInput: e.detail.value,
                    userInfo: userInfo,
                    date: new Date().toUTCString()
                }
                swan.showModal({
                    title: '存心情成功',
                    content: JSON.stringify(obj)
                })
            },
            fail: err => {
                const obj = {
                    userInput: e.detail.value,
                    userInfo: "NA",
                    date: new Date().toUTCString()
                }
                swan.showModal({
                    title: '存心情成功',
                    content: JSON.stringify(obj)
                })
            }
        })
    }
});
