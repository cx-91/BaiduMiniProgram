
/**
 * @file 时间轴
 * @author huangzilong (huangzilong@baidu.com)
 */

// 默认各状态样式（icon和icon对应颜色）
const defaultStatusStyle = {
    finished: {
        icon: 'complete-o',
        iconColor: '#2b99ff'
    },
    wait: {
        icon: 'time',
        iconColor: '#2b99ff'
    },
    success: {
        icon: 'complete',
        iconColor: '#2b99ff'
    },
    error: {
        icon: 'error',
        iconColor: '#c40311'
    }
};

Component({ // eslint-disable-line
    externalClasses: [
        'timeline-class',
        'item-tail-class',
        'content-class',
        'content-title-class',
        'content-slot-class'
    ],
    properties: {

        // 时间轴状态，可选 wait/finished/success/error
        status: {
            type: String,
            value: 'wait'
        },

        // 标题
        title: {
            type: String,
            value: ''
        },

        // 副标题
        desc: {
            type: String,
            value: ''
        },

        // 副标题样式
        descStyle: {
            type: String,
            value: ''
        },

        // 自定义 icon
        icon: {
            type: String,
            value: ''
        },

        // icon 颜色
        iconColor: {
            type: String,
            value: ''
        }
    },
    data: {
        timeStatus: '',
        timeHasTail: false,
        timeIcon: '',
        timeIconColor: ''
    },
    methods: {
        initData() {
            const {
                status,
                icon,
                iconColor,
                hasTail
            } = this.data;
            const timeStatus = /finished|wait|success|error/.test(status) ? status : 'wait';
            const timeIcon = icon || defaultStatusStyle[timeStatus].icon;
            const timeIconColor = iconColor || defaultStatusStyle[timeStatus].iconColor;

            /**
            * 自定义有/无过程线 或 默认
            * 默认：finished、wait为未结束（有过程线）, success、error为流程结束（无过程线）
            */
            const timeHasTail = typeof hasTail === 'undefined'
                    ? /finished|wait/.test(timeStatus)
                    : hasTail;

            this.setData({
                timeStatus,
                timeIcon,
                timeIconColor,
                timeHasTail
            });
        }
    },
    created() {
        this.initData();
    }
});
