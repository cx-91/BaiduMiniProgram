/**
 * @file 步骤条
 * @author huangzilong (huangzilong@baidu.com)
 */

Component({ // eslint-disable-line
    externalClasses: [
        'steps-class',
        'steps-flex-class',
        'steps-block-class',
        'step-class',
        'step-head-class',
        'step-main-class'
    ],
    properties: {

        // 当前步骤进度
        active: {
            type: Number,
            value: 1,
            observe() {
                this.scrollIntoViewStr();
            }
        },

        // step默认颜色
        color: {
            type: String,
            value: '#ccc'
        },

        // 当前步骤颜色
        activeColor: {
            type: String,
            value: '#2b99ff'
        },

        // 步骤总数据
        steps: {
            type: Array,
            value: []
        },

        // 连接行的颜色
        lineColor: {
            type: String,
            value: '#f5f5f5'
        },

        // 当前步骤的连接行颜色
        lineActiveColor: {
            type: String,
            value: '#f5f5f5'
        },

        // 连接行样式
        lineStyle: {
            type: String,
            value: 'dashed'
        },

        // 当前步骤的连接行样式
        lineActiveStyle: {
            type: String,
            value: 'solid'
        },

        // 连接行宽度
        lineWidth: {
            type: Number,
            value: 3.62
        },

        // 步骤标题内容颜色
        titleColor: {
            type: String,
            value: '#999'
        },

        // 当前步骤的标题内容颜色
        titleActiveColor: {
            type: String,
            value: '#000'
        },

        // 副标题颜色
        descColor: {
            type: String,
            value: '#999'
        },

        // 当前步骤副标题颜色
        descActiveColor: {
            type: String,
            value: '#999'
        },

        // step item默认宽度
        space: {
            type: Number,
            value: 162
        }
    },
    data: {
        scrollIntoView: '',
        colorBlue: '#2b99ff',
        // step icon的 name
        stepName: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']
    },
    methods: {

        /**
         * 步骤条滚动到当前步骤
         */
        scrollIntoViewStr() {
            let active = this.data.active;

            this.setData({
                scrollIntoView: `id_${active - 1}`
            });
        }
    },
    created() {
        this.scrollIntoViewStr();
    }
});
