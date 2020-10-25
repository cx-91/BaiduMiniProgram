/**
 * @file index.js
 * @author swan
 */
import {debounce, showToast, checkIsiPhoneX} from '../../utils/article_utils';
import {articleInfo, followInfo} from '../../utils/article_mock';


var inputId;
/* globals Page, swan, getCurrentPages */
/* eslint-disable */
Page({
/* eslint-enable */
    data: {
        articleId: '', // 文章唯一标志
        title: '', // 文章标题
        avator: '', // 作者头像地址
        author: '', // 作者名
        authorId: '', // 作者的用户唯一标志
        date: '', // 发表日期
        btnLoading: false, // 按钮加载态
        showFollowBtn: false, // 是否显示关注按钮
        isFollow: false, // 是否关注
        content: [], // 文章正文
        imgList: [], // 文章内图片列表
        showTopBtn: false, // 是否显示回到顶部按钮
        showPageStatus: true, // 是否显示页面状态
        loading: true, // 是否加载中
        loadingBtn: false, // 是否显示重新加载按钮
        loadingTitle: '网络不给力，请稍后重试', // 页面状态提示文案
        loadingIcon: 'content', // 页面状态图标 content/wifi
        yPosition: 0,
        headerHeight: 0,
        scrollTop: 0
    },
    onShareAppMessage() {
        let currentPages = getCurrentPages();
        return {
            title: this.data.title,
            content: this.getDesp(),
            imageUrl: this.data.imgList.length > 0 ? this.data.imgList[0] : '',
            path: currentPages[currentPages.length - 1].privateProperties.accessUri,
            success: res => {
                if (res.result) {
                    showToast(2);
                }
            }
        };
    },
    onLoad(options) {
        console.log(options);
        inputId = options.id;
        console.log("input: ", inputId);

        swan.request.mock = function (param) {
            console.log("on success");
            console.log(JSON.stringify(param));
            console.log("---------------------------------------");
            //console.log(JSON.stringify(param['res']['data'][1]));
            setTimeout(() => {
                if (param.res && param.success) {
                    param.success(param.res);
                    //param.success(param.res.data[1]);
                    console.log("success");
                    console.log(param.res);
                    //console.log(param.res.data[1]);

                } else if (param.fail) {
                    param.fail({errMsg: '未知错误'});
                }
                console.log("on completed");
                param.complete && param.complete();
                console.log("completed");
            }, 300);
        };
        swan.setStorageSync('@content-detail:userId', 'xxx');
        checkIsiPhoneX(this);

        console.log("reach 1: ",JSON.stringify(options.articleId));


        this.setData({
            articleId: options.articleId
        });

        console.log("reach 20: ",JSON.stringify(options.articleId));
        //console.log("reach 21: ",JSON.parse(options.articleId));
        console.log("reach 22: ",JSON.stringify(options.id));
        console.log("reach 23: ",JSON.parse(options.id));

        this.getArticleDetail(undefined, () => {
            console.log("getArticleDetail");
            let userId = swan.getStorageSync('@content-detail:userId');

            if (userId !== '' && this.data.authorId !== userId) {
                this.setData({
                    showFollowBtn: true
                });
            }
            console.log("reach 95: ");
            this.setData('imgList', this.data.content.reduce((result, item) => {
                if (item.type === 'img') {
                    result.push(item.content);
                }
                return result;
            }, []));
            const query = swan.createSelectorQuery().in(this);
            query.select('.content-container').boundingClientRect();
            query.exec(info => {
                this.setData({
                    headerHeight: info[0] ? info[0].top : 0
                });
            });
            swan.setPageInfo({

                title: this.data.title,
                keywords: swan.getEnvInfoSync().appName + ',' + this.data.author,
                description: this.getDesp(),
                releaseDate: this.data.date,
                articleTitle: this.data.title,
                image: this.data.imgList.length > 3 ? this.data.imgList.splice(0, 3)
                    : (this.data.imgList.length > 0 ? this.data.imgList[0] : '')
            });
        });
    },
    reloadPage() {
        console.log("reloading");
        this.setData({
            loading: true,
            showPageStatus: true
        });
        this.onLoad({articleId: this.data.articleId});
    },
    getArticleDetail(articleId, cb) {
        // TODO: 获取内容详情所需要的数据，请修改为相关的请求地址参数
        console.log("getArticleDetail call params");
        let params = {
            url: '',
            method: 'GET',
            data: {
                articleId
            },
            res: articleInfo,
            success: res => {
                if (res.errno === 0) {
                    this.setData({
                        ...res.data[inputId]
                    }, () => {
                        this.setData({
                            loading: false,
                            showPageStatus: false
                        });
                        swan.reportAnalytics('articleshow', {
                            articleId: this.data.articleId,
                            userId: this.data.authorId
                        });
                        cb && cb();
                    });
                } else {
                    this.setData({
                        loading: false,
                        loadingBtn: false,
                        loadingIcon: 'content',
                        loadingTitle: '服务器开小差，请稍后重试'
                    });
                }
            },
            fail: err => {
                this.setData({
                    loading: false,
                    loadingBtn: true,
                    loadingIcon: 'wifi',
                    loadingTitle: '网络不给力，请稍后重试'
                });
            }
        };
        swan.request.mock ? swan.request.mock(params) : swan.request(params);
    },
    getDesp() {
        console.log("getDesp");
        return this.data.content.reduce((result, item) => {
            if (item.type === 'p') {
                result += item.content;
            }
            return result;
        }, '').substr(0, 20) + '...';
    },
    showTopBtn() {
        console.log("showTopBtn");
        this.setData({
            showTopBtn: true
        });
    },
    hideTopBtn() {
        console.log("hideTopBtn");
        this.setData({
            showTopBtn: false
        });
    },
    tapuser({currentTarget}) {
        console.log("tapuser");
        let userId = currentTarget.dataset.userId;
        swan.reportAnalytics('tapuser', {
            articleId: this.data.articleId,
            userId: userId
        });
        // TODO: 点击用户事件处理，通常是跳转到用户详情页
        // swan.navigateTo({
        //     url: `/user-detail/user-detail?userId=${userId}`
        // });
    },
    tapfollow(e) {
        console.log("tapfollow");
        let isFollow = this.data.isFollow;
        swan.reportAnalytics('tapfollow', {
            articleId: this.data.articleId,
            userId: this.data.authorId,
            isFollow: !isFollow
        });
        this.setData({
            btnLoading: true
        });
        // TODO: 发送 关注/取消关注 请求，请修改为相关的请求地址参数
        // 通常你应该使用request interceptor来添加一些通用的参数，比如当前登录用户的id
        let params = {
            url: '',
            method: 'POST',
            data: {
                authorId: this.data.authorId
            },
            res: followInfo,
            success: res => {
                if (res.errno === 0) {
                    showToast(isFollow ? 3 : 4);
                    this.setData({
                        isFollow: !isFollow
                    });
                } else {
                    showToast(0);
                }
            },
            fail: err => {
                showToast(1);
            },
            complete: () => {
                this.setData({
                    btnLoading: false
                });
            }
        };
        swan.request.mock ? swan.request.mock(params) : swan.request(params);
    },
    tapimg(e) {
        this.previewImage(e);
    },
    longtapimg(e) {
        swan.showActionSheet({
            itemList: ['查看图片', '保存到相册'],
            itemColor: '#000',
            success: res => {
                switch (res.tapIndex + 1) {
                    case 1:
                        this.previewImage(e);
                        break;
                    case 2:
                        this.saveImage(e);
                        break;
                }
            }
        });
    },
    previewImage(e) {
        swan.reportAnalytics('tapimg', {
            articleId: this.data.articleId,
            userId: this.data.authorId,
            img: e.target.dataset.src
        });
        swan.previewImage({
            current: e.target.dataset.src,
            urls: this.data.imgList
        });
    },
    saveImage(e) {
        swan.showLoading({
            title: '正在加载...'
        });
        swan.downloadFile({
            url: e.target.dataset.src,
            success: res => {
                let filePath = res.tempFilePath;
                swan.saveImageToPhotosAlbum({
                    filePath,
                    success: res => {
                        swan.reportAnalytics('saveimg', {
                            articleId: this.data.articleId,
                            userId: this.data.authorId,
                            img: e.target.dataset.src
                        });
                        swan.hideLoading();
                        showToast(5);
                    },
                    fail: err => {
                        swan.hideLoading();
                        showToast(6);
                    }
                });
            },
            fail: err => {
                swan.hideLoading();
                showToast(6);
            }
        });
    },
    touchstart(e) {
        this.setData({
            yPosition: e.touches[0].clientY
        });
    },
    onPageScroll(e) {
        const query = swan.createSelectorQuery().in(this);
        query.select('.content-container').boundingClientRect();
        query.exec(info => {
            if (this.data.headerHeight - info[0].top < 10) {
                this.hideTopBtn();
            }
        });
    },
    scrollPage(e) {
        const yPosition = this.data.yPosition;
        const currentPosition = e.changedTouches[0].clientY;
        this.setData({
            yPosition: currentPosition
        });
        const query = swan.createSelectorQuery().in(this);
        query.select('.content-container').boundingClientRect();
        query.exec(info => {
            if (currentPosition > yPosition && info[0].top < this.data.headerHeight) {
                this.showTopBtn();
                debounce(() => {
                    this.hideTopBtn();
                }, 2000)();
            } else if (yPosition - currentPosition > 10) {
                this.hideTopBtn();
            }
        });
    },
    backToTop() {
        swan.reportAnalytics('backtotop', {
            articleId: this.data.articleId,
            userId: this.data.authorId
        });
        swan.pageScrollTo({
            scrollTop: 0
        });
        this.hideTopBtn();
    }
});
