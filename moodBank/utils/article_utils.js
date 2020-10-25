/**
 * @file utils
 * @author swan
 */
/* globals swan */

/* eslint-disable */
var timer;
export function debounce(fn, delay) {
    return function () {
        var ctx = this;
        var args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(ctx, args);
        }, (delay ? delay : 300));
    };
};

const toastTitle = ['服务器开小差，请稍后重试', '网络不给力，请稍后重试', '分享成功', '已取消关注', '关注成功', '已保存到相册', '保存失败'];
export function showToast(type = 0) {
    swan.showToast({
        icon: 'none',
        title: toastTitle[type]
    });
};

export function checkIsiPhoneX(_this) {
    let isPhoneX = swan.getStorageSync('@content-detail:isPhoneX');
    if (isPhoneX !== '') {
        _this.setData({
            isPhoneX
        });
    } else {
        swan.getSystemInfo({
            success: data => {
                const isPhoneX = data.model.indexOf('iPhone X') !== -1 || data.model.indexOf('iPhone 11') !== -1;
                _this.setData({
                    isPhoneX
                });
                swan.setStorageSync('@content-detail:isPhoneX', isPhoneX);
            }
        });
    }
}
/* eslint-enable */
