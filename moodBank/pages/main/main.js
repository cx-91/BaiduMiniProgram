/**
 * @file index.js
 * @author swan
 */
const app = getApp()

Page({
    data: {
        timer: '',
        resultComment: '',
        per: '',
        textInputDisplay: 'none',
        moodSelectorDisplay: 'inline-block',
        impactSelectorDisplay: 'none',
        changeSelectorDisplay: 'none',
        buttonGroupDisplay: 'none',
        screenWidth: 300,
        screenHeight: 600
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
    good() {
        const context = this.canvasContext;
        context.drawImage('/images/Egg.png', 50, 50, 200, 250);
        context.draw();
    },
    notbad() {
        const context = this.canvasContext;
        context.drawImage('/images/smile.png', 50, 60, 200, 200);
        context.draw(true);
    },
    bad() {
        const ctx = this.canvasContext;
        // ctx.beginPath();
        // const cx = 175;
        // const cy = 255;
        // const spikes = 5;
        // const outerRadius = 30;
        // const innerRadius = 15;
        // let rot = Math.PI/2*3;
        // ctx.moveTo(cx,cy-outerRadius)
        // let x = cx;
        // let y = cy;
        // let step = Math.PI/spikes;
        // for(let i=0;i<spikes;i++){
        //   x=cx+Math.cos(rot)*outerRadius;
        //   y=cy+Math.sin(rot)*outerRadius;
        //   ctx.lineTo(x,y)
        //   rot+=step

        //   x=cx+Math.cos(rot)*innerRadius;
        //   y=cy+Math.sin(rot)*innerRadius;
        //   ctx.lineTo(x,y)
        //   rot+=step
        // }
        // ctx.lineTo(cx,cy-outerRadius);
        // ctx.closePath();
        // ctx.lineWidth=5;
        // ctx.setFillStyle('#82E0AA');
        // ctx.fill();
        // ctx.save();
        ctx.drawImage('/images/rainbow.png', 10, 0, 200, 200);
        ctx.draw(true);
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
                        impactSelectorDisplay: 'inline-block',
                        moodSelectorDisplay: 'none'
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
                        changeSelectorDisplay: 'inline-block',
                        impactSelectorDisplay: 'none'
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
                        changeSelectorDisplay: 'none',
                        textInputDisplay: 'inline-block'
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
                        textInputDisplay: 'none',
                        buttonGroupDisplay: 'flex'
                    })
                })
        }, 500);
    },
    resetview() {
        const ctx = this.canvasContext;
        ctx.clearRect(0, 0, this.data.screenWidth, this.data.screenHeight);
        ctx.draw();
        this.setData({
            buttonGroupDisplay: 'none',
            moodSelectorDisplay: 'inline-block'
        })
    },
    saveMood(e) {
        swan.showModal({
            title: '存心情成功',
            content: JSON.stringify(e.detail.value)
        })
    }
});
