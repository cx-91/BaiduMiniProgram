/**
 * @file 下拉刷新
 * @author LipengJia (jialipeng@baidu.com)
 * @date 2019-12-19
 */
import {upx2dpx} from '../../common/utils/px';
import {calcCircle, linearAccu, promiseDebounce, syncSetData} from '../../common/utils/index';

const STATUS = {
    IDLE: 0,
    LOADING: 1,
    SHOWTEXT: 2
};

Component({
    externalClasses: [
        'smt-feed-container',
        'smt-feed-loading',
        'smt-feed-content',

        'smt-refresh-circle-left',
        'smt-refresh-circle-right',
        'smt-refresh-result-container',
        'smt-refresh-result-text'
    ],

    properties: {
        // 是否开启下拉刷新
        pullToRefresh: {
            type: Boolean,
            value: false
        },

        // loading加载区域高度 * 必须是device px
        loadingHeight: {
            type: Number,
            value: upx2dpx(192),
            observer(n) {
                if (typeof n !== 'number') {
                    throw 'loadingHeight 必须是数字类型!否则下拉可造成卡顿闪屏';
                }
            }
        },

        // 距底部距离 触发 scrolltolower 事件
        lowerThreshold: {
            type: Number,
            value: 50
        },

        // 加载成功话术 * 不要默认值，prop抖动
        text: {
            type: String,
            value: '',
            observer(n) {
                this.clipText(n);
            }
        },

        // 加载话术停留时间 * 用于单测
        textStayTime: {
            type: Number,
            value: 800
        },

        // 主题定义
        theme: {
            type: String,
            value: ''
        },

        // 禁止下拉 * 场景：处于滚动页面且api加载(demo示例平台)
        disableTouch: {
            type: Boolean,
            value: false
        }
    },

    data: {
        // 左右小球信息
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
        },

        // 是否禁用scrollView
        enableScroll: true,

        // 滑动距离
        offsetY: 0,

        // 滑动区域高度，用于计算阻尼值
        clientHeight: 0,

        // 最长18个汉字
        clipedText: '',

        // 0: 未开始 1: 加载中 2: 展示话术
        status: STATUS.IDLE,

        // 滚动高度
        scrollTop: 0
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
        },

        /**
         * scrollView 滚动参数
         * @param {Object} param Event
         */
        scrollHdl({detail}) {
            this.scrollTop = detail.scrollTop;
            // 如果是ios惯性，就禁掉回弹
            if (this.data.pullToRefresh && this.scrollTop < 0 && this.data.enableScroll && this.offsetY === 0) {
                this.setData({
                    enableScroll: false
                }, () => {
                    this.setData({
                        enableScroll: true
                    });
                });
            }
            this.triggerEvent('scroll', detail);
        },

        /**
         * 阻尼值转换 * 四参方程有常数，便于转换屏幕比
         * 两种情况： 滚动区域 > 400 ? 用系数 = .7 : .65
         * x: 0, 50, 100, 150, 200, 250, 300, 350, 400, 800, 40000, 120000
         * y: 0,32,62,90,115,136,153,164,170,270, 420, 440
         *
         * @param {number} pullDistance 下拉的总距离
         * @param {number=} base 基础值，calc(iphone 8p - 40px)
         * @return {number} 返回值
         */
        dumping(offsetY, base = 464) {
            const y = offsetY > 0 ? offsetY : 0;
            const ratio = this.data.clientHeight / base;
            let result = 0;
            if (this.data.clientHeight > 400) {
                // 系数 .65
                result = (440.5 + .5) * ratio / (1 + (y / 551.5665) ** -1.009) - .5;
            }
            else {
                // 系数 .7
                result = (440.0483 + .0510) * ratio / (1 + (y / 444.0544) ** -1.2801) - .0510;
            }
            return Math.round(result);
        },

        async touchHdl({type, touches = [], changedTouches = [], manual = false}) { // eslint-disable-line fecs-max-statements
            // 如果上一次没完全关闭，禁止下拉
            if (this.closing || (this.data.disableTouch && !manual)) {
                return;
            }
            // ue规定： 如果api调用下拉刷新，则不启用手势刷新
            const disabled = !this.data.pullToRefresh && !manual && this.status === STATUS.IDLE;

            // 禁用多点触控
            switch (type) {
                case 'touchstart': {
                    this.touching = true;
                    for (const touch of touches) {
                        const {identifier: id, pageY} = touch;
                        if (this.pos[id] == null) {
                            this.pos[id] = pageY + this.scrollTop;
                            break;
                        }
                    }
                    break;
                }
                case 'touchmove': {
                    let distance = 0;
                    for (const touch of touches) {
                        const {identifier: id, pageY} = touch;
                        if (this.pos[id]) {
                            distance += Math.round(pageY - this.pos[id]);
                        }
                    }
                    let offsetY = this.offsetY = this.dumping(distance + this.lastOffsetY);

                    const pullDown = distance > 0;
                    // 没loading动画时下拉计算动画
                    if (this.status === STATUS.IDLE) {
                        const circleInfo = calcCircle(offsetY, this.data.loadingHeight);
                        circleInfo && this.setData(circleInfo);
                    }

                    // 还未加载时，向上划要收起loading
                    if (!pullDown && this.status !== STATUS.IDLE && Math.abs(offsetY) > 20) {
                        this.fadeCircle();
                        this.setData({
                            status: STATUS.IDLE,
                            offsetY: 0
                        });
                        this.status = STATUS.IDLE;
                        this.triggerEvent('statuschange', STATUS.IDLE);
                        this.lastOffsetY = this.offsetY = 0;
                        return;
                    }

                    if (disabled) {
                        return;
                    }
                    // offsetY快，setData慢，可能造成向上划没到顶。
                    // 要注意 初始就向下划，过滤掉
                    if (offsetY > 0 || this.data.offsetY > 0) {
                        const setOffsetY = () => this.setData({offsetY});
                        // 如果已经禁止滚动&&还往下拉，直接赋值
                        if (!this.data.enableScroll) {
                            setOffsetY();
                        }
                        else {
                            this.setData({ // 该setData 不会多次执行
                                enableScroll: false
                            }, setOffsetY);
                        }
                    }
                    break;
                }
                case 'touchend': {
                    for (const touch of changedTouches) {
                        const {identifier: id, pageY} = touch;
                        if (this.pos[id]) {
                            this.lastOffsetY += pageY - this.pos[id];
                        }
                    }

                    if (touches.length || disabled) {
                        return;
                    }

                    this.touching = false;
                    this.pos = {};

                    // 判断是否加载
                    const shouldLoad = this.scrollTop <= 0 && this.offsetY >= this.data.loadingHeight;
                    let result = 0;
                    if (shouldLoad) {
                        // 只有status === 0时，触发加载
                        if (this.status === STATUS.IDLE) {
                            this.triggerEvent('refresh');
                            this.setData({status: STATUS.LOADING});
                            this.status = STATUS.LOADING;
                            this.triggerEvent('statuschange', STATUS.LOADING);
                        }
                        this.startRefreshTime = Date.now();
                        result = this.data.loadingHeight;
                    }
                    else {
                        this.fadeCircle();
                    }
                    this.setData({
                        enableScroll: true
                    },
                    () => {
                        this.setData({
                            offsetY: result
                        });
                    });
                    this.lastOffsetY = this.offsetY = result;
                    break;
                }
            }
        },

        /**
         * circle渐隐
         */
        fadeCircle() {
            return linearAccu((y, callback) => {
                const circleInfo = calcCircle(y, this.data.loadingHeight);
                if (circleInfo) {
                    this.setData(circleInfo, callback);
                }
                else {
                    callback();
                }
            }, this.data.loadingHeight, 0);
        },

        /**
         * 渐隐loadingbar
         */
        async closeLoading() {
            // 防止关闭后，touchend还在触发中
            this.closing = true;
            this.debCloseLoading.cancel();
            if (!this.data.enableScroll) {
                await syncSetData(this, {enableScroll: true});
            }
            await syncSetData(this, {offsetY: 0});
            // 关闭动画200ms
            await new Promise(r => setTimeout(r, 200));
            // 放在后面防止小球和text重叠
            await syncSetData(this, {status: STATUS.IDLE});
            this.triggerEvent('statuschange', STATUS.IDLE);
            this.status = STATUS.IDLE;
            this.lastOffsetY = this.offsetY = 0;
            this.closing = false;
        },

        /**
         * 调用模拟下拉刷新
         */
        async startRefresh() {
            // 未关闭又调用
            if (this.status !== STATUS.IDLE) {
                this.debCloseLoading.cancel();
                await this.closeLoading();
            }
            this.status = STATUS.LOADING;
            this.setData({
                enableScroll: false,
                status: STATUS.LOADING
            }, () => {
                if (this.closing) {
                    return;
                }
                this.offsetY = this.data.loadingHeight;
                this.touchHdl({type: 'touchend', manual: true});
            });
            this.triggerEvent('statuschange', STATUS.LOADING);
        },

        /**
         * 停止当前刷新
         */
        async stopRefresh() {
            // 用户下拉，至少保证小球转1圈
            let time = 500 - (Date.now() - this.startRefreshTime);
            time = time > 0 ? time : 0;
            await new Promise(r => setTimeout(r, time));
            this.status = STATUS.SHOWTEXT;
            this.setData({
                status: STATUS.SHOWTEXT
            });
            this.triggerEvent('statuschange', STATUS.SHOWTEXT);
            await this.debCloseLoading();
        },

        /**
         * 滚动到底部时触发
         * @param {Object} param detail 事件
         */
        scrollToLower({detail}) {
            this.triggerEvent('scrolltolower', detail);
        },

        setScrollTop(scrollTop) {
            this.setData({
                scrollTop
            });
        }
    },

    created() {
        this.setData({
            max: upx2dpx(this.data.maxDistance)
        });

        this.clipText(this.data.text);
        // 记录用户下拉开始时间，到加载结束至少保证小球转3圈
        this.startRefreshTime = 0;

        // 滚动高度，用于计算是否触顶下拉
        this.scrollTop = 0;

        // 是否有手指在屏幕
        this.touching = false;

        // 多点触控位置，解决手指交叉切换问题
        this.pos = {};

        // 上次结束位置
        this.lastOffsetY = 0;

        // 手指移动位置 * 用这个来判断是否手机离开屏幕
        this.offsetY = 0;

        // 0: 未开始 1: 加载中 2: 展示话术
        this.status = STATUS.IDLE;

        // 是否正在关闭
        this.closing = false;

        // 循环检测是否要关闭loading
        this.debOffsetCheck = () => new Promise(resolve => {
            const timer = setInterval(() => {
                if (this.touching) {
                    return;
                }
                clearInterval(timer);
                resolve();
            }, 300);
        });

        // 关闭loading bar; text显示时长: 800ms
        this.debCloseLoading = promiseDebounce(async () => {
            await this.debOffsetCheck();
            await new Promise(r => setTimeout(r, this.data.textStayTime));
            await this.closeLoading();
        }, 100);
    },

    ready() {
        // 计算滑动区域高度，用于计算阻尼值
        swan.createSelectorQuery().in(this)
        .select('.smt-feed-wrap').boundingClientRect(res => {
            try {
                if (!res) {
                    throw '未找到节点';
                }
                const clientHeight = res.height;
                this.setData({clientHeight});
            }
            catch (err) {
                console.error('获取节点信息错误');
            }
        }).exec();
    }
});
