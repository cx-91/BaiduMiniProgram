/**
 * @file notice-bar
 * @author huangzilong(huangzilong@baidu.com)
 * @date 2020-06-30
 */

 /* global swan */
Component({ // eslint-disable-line
    externalClasses: ['notice-bar-class', 'text-class'],

    properties: {
        // 跑马灯文本
        text: {
            type: String,
            value: '跑马灯:notice-bar',
            observer() {
                this.init();
            }
        },

        // 背景颜色
        bgColor: {
            type: String,
            value: ''
        },

        // 文字颜色
        textColor: {
            type: String,
            value: ''
        },

        // 自定义 icon
        icon: {
            type: Boolean,
            value: true
        },

        // icon 图标名称
        iconName: {
            type: String,
            value: 'delete'
        },

        // icon 颜色
        iconColor: {
            type: String,
            value: '#fa6400'
        },

        // 滚动状态
        scroll: {
            type: Boolean,
            value: true
        },

        // 滚动延迟时间
        delay: {
            type: Number,
            value: 1
        },

        // 速度：px/s; 默认50
        speed: {
            type: Number,
            value: 50
        }
    },

    data: {
        // 第二轮进入循环
        infinite: false,

        // 容器宽度 判断是否超出开启滚动
        containerWidth: 0,

        // 文本宽度，计算速度
        textWidth: 0,

        // 动画配置
        animationData: null,

        // 展示
        show: true
    },

    methods: {

        /**
         * 获取元素宽度
         *
         * @param {string} selector 选择器
         * @return {Promise} width 返回宽度
         */
        getWidths(selector) {
            return new Promise(r =>
                this.createSelectorQuery().in(this).select(selector)
                .boundingClientRect(({width}) => r(width)).exec()
            );
        },

        /**
         * 初始化函数
         * 通过字数获取宽度不准，因为
         */
        async init() {
            const {
                scroll,
                speed,
                delay
            } = this.data;

            // 不开启滚动，则退出
            if (!scroll) {
                return;
            }
            const [containerWidth, textWidth] = await [
                await this.getWidths('.notice-bar .text-container'),
                await this.getWidths('.notice-bar .text-container .text')
            ];
            const duration = +(textWidth / speed * 1000).toFixed(2);
            this.setData({textWidth, containerWidth}, () => {
                if (textWidth > containerWidth) {
                    setTimeout(() => this.genAnimate(duration, textWidth), delay * 1000);
                }
            });
        },

        /**
         * 生成动画
         *
         * @param {number} duration 动画时长
         * @param {number} distance 元素文本宽度
         */
        genAnimate(duration, distance) {
            // 须先复位
            const animation = swan.createAnimation({
                duration: 0
            });
            animation.translate3d(0, 0, 0).step();
            this.setData({
                animationData: animation.export()
            });

            setTimeout(() => {
                const animation = swan.createAnimation({
                    duration
                });
                animation.translate3d(`-${distance}px`, 0, 0).step();
                this.setData({
                    animationData: animation.export()
                });
            }, 50);
        },

        /**
         * 滚动动画结束回调函数
         */
        aniEndHdl() {
            const {textWidth, speed, containerWidth, infinite} = this.data;
            const duration = +((textWidth + containerWidth) / speed * 1000).toFixed(2);
            const fn = () => this.genAnimate(duration, textWidth + containerWidth);
            if (!infinite) {
                this.setData({infinite: true}, fn);
            }
            else {
                fn();
            }
        },

        /**
         * 删除事件
         */
        closeHdl() {
            this.setData({
                show: false,
                animationData: null
            });
            this.triggerEvent('close');
        }
    },

    created() {
        this.init();
    }
});
