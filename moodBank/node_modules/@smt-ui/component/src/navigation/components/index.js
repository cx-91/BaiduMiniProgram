/**
 * @file 顶部bar组件
 * @author houyu01，jingxiangzheng
 */

 /* global getCurrentPages */
import {preventRepeat} from '../../common/utils/index.js';

import {NAV_PROPS} from '../../common/utils/consts.js';
const {
    statusBarHeight,
    navigationBarHeight,
    screenWidth,
    platform
} = swan.getSystemInfoSync();

//  menuRect无法使用时替代的常量
const menuRectWidth = 97;

Component({
    properties: {
        navigationStyle: {
            type: Object,
            value: {}
        },
        navigationAreaStyle: {
            type: Object,
            value: {}
        },
        backgroundColor: {
            type: String,
            value: '#fff'
        },
        opacity: {
            type: Number,
            value: 1
        },
        ...NAV_PROPS,
        backIcon: {
            type: Boolean,
            value: true,
            observer(n) {
                this.initIcons();
            }
        },
        homeIcon: {
            type: Boolean,
            value: false,
            observer(n) {
                this.initIcons();
            }
        },
        frontColor: {
            type: String,
            value: '#000'
        }
    },

    data: {
        statusBarHeight,
        navigationBarHeight,
        safeWidth: screenWidth - menuRectWidth,
        isIos: platform === 'ios',
        iconsMap: {
            'arrow-left': 'back',
            'home': 'home'
        }
    },

    lifetimes: {
        attached: function () {
            this.initIcons();
        }
    },
    methods: {
        /**
         * 初始化首页、返回上一级icon
         *
         */
        initIcons() {
            const {
                homeIcon,
                backIcon,
                homeIconSize,
                backIconSize
            } = this.data;

            this.setData({
                icons: [{
                    type: 'arrow-left',
                    show: backIcon,
                    size: backIconSize
                }, {
                    type: 'home',
                    show: homeIcon,
                    size: homeIconSize
                }]
            });
            swan.nextTick(() => {
                this.setData({
                    loaded: true
                });
            });
        },
        /**
         * 点击icon时触发
         *
         * @param {Event} event
         */
        iconHdl(event) {
            const type = event.currentTarget.dataset.type;
            const eventHdl = `${this.data.iconsMap[type]}Hdl`;
            preventRepeat(
                () => this.dispatch(eventHdl)
            , 120);
        }
    }
});
