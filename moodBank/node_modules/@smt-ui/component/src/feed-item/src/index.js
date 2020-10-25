/**
 * @file list-item组件
 * @author jingxiangzheng(jingxiangzheng@baidu.com)
 */

/* eslint-disable */
Component({
    /* eslint-disable */
    externalClasses: ['smt-feed-item-wrapper'],
    properties: {
        theme: {
            type: String,
            value: 'default'
        },
        content: {
            type: Object,
            value: {
                title: '宠物自己在家时, 如何帮助它度过孤独时光',
                infoSource: '萌宠在家',
                commentsNum: 183,
                images: ['../assets/demo.jpg']
            }
        },
        video: {
            type: Object,
            value: {
                isVideo: false,
                time: ''
            }
        },
        status: {
            type: String,
            value: '0'
        }
    },
    data: {
        statusMap: {
            0: '',
            1: 'visited'
        }
    },
    attached() {
        // 解决iphoneX的图片bug
        this.setData('showList', true);
    },
    methods: {
        onTouchStart() {
            this.setData({
                isAcive: true
            });
        },
        onTouchEnd() {
            setTimeout(() => {
                this.setData({
                    isAcive: false
                });
                this.triggerEvent('feeditemtap');
            }, 100);
        },
        imageLoadedHandle(event) {
            // 替换占位符
            this.setData('imageLoaded', true);
        }
    }
});