/**
 * @file 上滑加载
 * @author huangzilong(huangzilong@baidu.com)
 * @date 2019-12-19
 */

import {systemInfo} from '../../common/utils/index.js';

Component({
    externalClasses: ['smt-spin-wrap', 'smt-spin-text'],

    properties: {
        // 与textConfig对应
        status: {
            type: Number,
            value: 1
        },

        // 话术配置 与 textConfig 对应;
        textConfig: {
            type: Array,
            value: ['点击加载更多', '正在加载...', '已经到底啦', '加载失败 点击重新加载']
        },

        theme: {
            type: String,
            value: ''
        },

        secureBottom: {
            type: Boolean,
            value: true
        }
    },

    data: {
        needSecureBottom: /iphone (11|x)/.test(systemInfo.model.toLowerCase())
    }
});
