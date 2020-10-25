/**
 * @file 个人信息组件
 * @author huangzilong (huangzilong@baidu.com)
 */

Component({ // eslint-disable-line
    externalClasses: [
        'person-card-wrap',
        'info-name-wrap',
        'info-title-wrap',
        'info-desc-wrap'
    ],
    properties: {
        // 信息卡类型 noraml、big
        type: {
            type: String,
            value: 'normal'
        },

        // 卡片背景图
        bgImg: {
            type: String,
            value: ''
        },

        // 卡片名称
        name: {
            type: String,
            value: ''
        },

        // 卡片信息
        infoList: {
            type: Array,
            value: []
        }
    }
});
