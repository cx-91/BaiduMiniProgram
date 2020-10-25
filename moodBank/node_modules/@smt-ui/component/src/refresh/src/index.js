/**
 * @file 下拉刷新
 * @author LipengJia (jialipeng@baidu.com)
 * @date 2019-12-19
 */

import {upx2dpx} from '../../common/utils/px';
import {calcCircle} from '../../common/utils/index';

Component({
    externalClasses: [
        'smt-refresh-container',
        'smt-refresh-circle-left',
        'smt-refresh-circle-right',
        'smt-refresh-result-container',
        'smt-refresh-result-text'
    ],

    properties: {
        // 主题
        theme: {
            type: String,
            value: ''
        },

        // loading加载区域高度
        loadingHeight: {
            type: Number,
            value: upx2dpx(192)
        },

        // 垂直移动距离 * slave通信很慢，至少间隔30ms；建议后续在sjs中使用
        offsetY: {
            type: Number,
            value: 0,
            observer(n) {
                const circleInfo = calcCircle(n, this.data.loadingHeight);
                if (circleInfo) {
                    this.setData(circleInfo);
                }
            }
        },

        // 0: 未开始 1: 加载中 2: 展示话术
        status: {
            type: Number,
            value: 0
        },

        text: {
            type: String,
            value: '建议最多显示18个汉字，超出内容截断',
            observer(n) {
                this.clipText(n);
            }
        }
    },

    data: {
        // 最长18个汉字
        clipedText: '',

        // 加载小球相关属性
        circle: {
            // 小球尺寸 * device px防止变形
            size: upx2dpx(21),

            // 小球移动距离
            offsetX: upx2dpx(33),

            // 左右渐隐（有先后）
            opacityL: 0,
            opacityR: 0,

            // 左右距离（有先后）
            xL: 0,
            xR: 0
        }
    },

    methods: {
        /**
         * 截取18位文字
         * @param {string} str 传入的文字
         */
        clipText(str) {
            this.setData({
                clipedText: str.slice(0, 18)
            });
        }
    },

    created() {
        this.clipText(this.data.text);
    }
});
