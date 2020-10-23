// miniprogram/pages/dictionary/dictionary.js

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
