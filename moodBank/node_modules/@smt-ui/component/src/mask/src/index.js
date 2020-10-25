/**
 * @file index.js
 * @author swan
 */
/* globals Page, Component, swan, getCurrentPages */
/* eslint-disable */
Component({
/* eslint-enable */
    properties: {
        name: {
            type: String,
            value: '小程序名称'
        },
        icon: {
            type: String,
            value: ''
        },
        isCustom: {
            type: Boolean,
            value: false
        }
    },

    data: {
        showMask: 0,
        statusBarHeight: 0,
        navigationBarHeight: 0
    },

    attached: function () {
        let {statusBarHeight, navigationBarHeight} = swan.getSystemInfoSync();
        this.setData({
            navigationBarHeight,
            statusBarHeight
        });
        let showMask = swan.getStorageSync('smt-mask:showMask');
        if (!(showMask instanceof Error)) {
            if (showMask === '') {
                this.setData({showMask: 1});
            } else {
                this.setData({showMask});
            }
        } else {
            this.setData({showMask: 1});
        }
    },

    methods: {
        closeMask: function () {
            this.setData({showMask: 0});
            swan.setStorageSync('smt-mask:showMask', '0');
        }
    }
});
