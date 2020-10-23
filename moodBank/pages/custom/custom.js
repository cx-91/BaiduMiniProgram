/**
 * @file Component for navigation
 * @author sunbai
 */

/* global swan, Component, getCurrentPages, getApp, Page */

const systemInfo = (() => {
    let info = {};
    try {
        info = swan.getSystemInfoSync();
    }
    catch (err) {
        throw '获取系统信息错误: ' + err;
    }
    return info;
})();

let app = getApp();

!function () {
    var PageTmp = Page;
    /* eslint-disable */
    Page = function (pageConfig) {
    /* eslint-enable */
        // 设置全局默认分享
        pageConfig = Object.assign({
            onShareAppMessage: function () {
                let path = getCurrentPages()[1].uri;
                return {
                    title: '智能小程序官方示例',
                    content: '百度智能小程序官方示例，展示已支持的接口能力及组件',
                    path: path + '?fr=shareApp'
                };
            }
        }, pageConfig);
        PageTmp(pageConfig);
    };
    // 将原Page的其他属性方法赋值给新的Page，如after
    for (let key of Object.keys(PageTmp)) {
        Page[key] = PageTmp[key];
    }
}();
/* eslint-disable babel/new-cap */
Component({
/* eslint-enable babel/new-cap */
    properties: {
        // 定义了name属性，可以在使用组件时，由外部传入。此变量可以直接在组件模板中使用
        theme: {
            type: String,
            value: ''
        }
    },
    observers: {
        theme: function (theme) {
            swan.setNavigationBarColor({
                frontColor: theme === 'dark' ? '#ffffff' : '#000000',
                backgroundColor: '#3670C2',
                animation: {
                    duration: 500,
                    timingFunc: 'linear'
                }
            });
        }
    },
    data: {
        age: 1,
        statusBarHeight: systemInfo.statusBarHeight,
        indexPath: '',
        ifdocs: true,
        ifdocsWeb: true,
        shareAppIevel3: true
    },
    methods: {
        created() {
            // console.log('custom', app.globalData.openParams);
            let ifdocs = app.globalData.openParams;
            if (ifdocs === 'docs' || ifdocs === 'shareApp') {
                this.setData('ifdocs', false);
            }
            else if (ifdocs === 'docWeb') {
                this.setData('ifdocsWeb', false);
            }
            else if (ifdocs === 'shareAppIevel3') {
                this.setData('shareAppIevel3', false);
            }
            else {
                this.setData({
                    ifdocs: true,
                    ifdocsWeb: true,
                    shareAppIevel3: true
                });
            }
            app.globalData.openParams = '';
        },
        backIndex(e) {
            if (e.currentTarget.dataset.navigate) {
                // 支持业务方自定义跳转页面的逻辑
                this.triggerEvent('navigate');
            }
            else {
                const pages = getCurrentPages();
                // 若当前页面栈只有一层（适用于分享与扫码进入的页面），点击返回到首页
                if (pages.length === 1) {
                    const pagePath = pages[0].uri;
                    const pagePathArr = pagePath.split('/')[0];
                    swan.switchTab({
                        url: '/entry/' + pagePathArr + '/' + pagePathArr,
                        fail: err => {
                            // 若跳转失败就跳到扩展能力页面（存放业务方所有页面的tab页)，这里用swan.onPageNotFound不生效所以用嵌套跳转
                            swan.switchTab({
                                url: '/entry/extensions/extensions'
                            });
                        }
                    });
                }
                else {
                    swan.navigateBack({
                        fail: err => {
                            console.log('navigateBack fail', err);
                        }
                    });
                }
            }
        },
        backIevel3() {
            let myEventDetail = {}; // detail对象，提供给事件监听函数
            let myEventOption = {
                bubbles: true
            }; // 触发事件的选项
            this.triggerEvent('myevent', myEventDetail, myEventOption);
        }
    }
});
