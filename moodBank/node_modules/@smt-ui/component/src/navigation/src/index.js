/**
 * @file 自定义导航组件
 * @author jingxiangzheng(jingxiangzheng@baidu.com)
 */
/* globals Component, swan */
import {NAV_PROPS} from '../../common/utils/consts.js';
const {
    statusBarHeight,
    navigationBarHeight,
    platform
} = swan.getSystemInfoSync();

Component({
    properties: {
        ...NAV_PROPS,
        // 自定义导航类型：default为默认，switchNav为切换导航栏模式
        type: {
            type: String,
            value: 'default'
        },
        // 是否显示返回图标
        backIcon: {
            type: Boolean,
            value: false
        },
        // 是否显示首页图标
        homeIcon: {
            type: Boolean,
            value: false
        },
        // 切换模式下的初始bar
        commonBar: {
            type: Object,
            value: {
                opacity: 1,
                title: '',
                frontColor: '#000',
                bgColor: '#fff',
                backIcon: true,
                homeIcon: false,
                navigationStyle: {},
                navigationAreaStyle: {},
                isFullScreenWidth: false
            }
        },
        // 切换模式下的滚动后切换fixed bar
        fixedBar: {
            type: Object,
            value: {
                opacity: 1,
                title: 'fixed',
                frontColor: '#000',
                bgColor: 'pink',
                backIcon: true,
                homeIcon: false,
                navigationStyle: {},
                navigationAreaStyle: {},
                isFullScreenWidth: false
            }
        },
        // 切换导航栏起始位置，默认状态栏的高度
        switchStartPosition: {
            type: Number,
            value: statusBarHeight
        },
        // 切换导航栏终止位置
        switchEndPosition: {
            type: Number,
            value: 100
        },
        homeIconSize: {
            type: String,
            value: '35.02rpx'
        },
        backIconSize: {
            type: String,
            value: '35.02rpx'
        }
    },
    data: {
        navigationBarHeight,
        statusBarHeight,
        platform,
        hideFixed: true
    },
    lifetimes: {
        ready() {
            const self = this;
            Page.after({
                methods: {
                    onPageScroll(context) {
                        self.switchBar({
                            type: 'switchNav',
                            scrollTop: context.args.e.scrollTop
                        });
                    }
                }
            });
        }
    },
    messages: {
        backHdl: function (e) {
            this.triggerEvent('backHdl');
        },
        homeHdl: function (e) {
            this.triggerEvent('homeHdl');
        }
    },
    methods: {
        /**
         * 切换顶部bar
         * @param {Object} params 滚动参数
         */
        switchBar(params) {
            const {
                switchStartPosition,
                switchEndPosition,
                fixedBar,
                switchAnimation
            } = this.data;
            const scrollTop = params.scrollTop;

            let fixedOpacity = 0;

            // 滚动位置大于切换导航栏起始位置
            if (scrollTop > switchStartPosition) {
                fixedOpacity = scrollTop <= switchEndPosition
                ? (scrollTop / switchEndPosition) : fixedBar.opacity;
                this.data.hideFixed && this.setData({
                    hideFixed: false
                });
            }
            else {
                this.data.hideFixed || this.setData({
                    hideFixed: true
                });
            }

            this.setData({
                fixedBar: {
                    ... this.data.fixedBar,
                    opacity: switchAnimation ? fixedOpacity : 1
                }
            });
        }
    }
});
