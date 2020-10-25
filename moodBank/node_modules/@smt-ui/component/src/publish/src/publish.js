/**
 * @file publish.js
 * @author houyu(houyu01@baidu.com)
 */
const api = require('./api');

// 工具方法，之后提取出来
const aopAfter = decorators => component => {
    for (let func in decorators) {
        const context = component[func] ? component : component.methods;
        const originMethod = context[func];
        if (originMethod) {
            context[func] = function (args) {
                const returnValue = originMethod.call(this, args);
                decorators[func]({
                    args,
                    thisObject: this,
                    returnValue
                });
            };
        }
    }
    return component;
};

// 具体要拦截的方法们
const contentDecorator = aopAfter({

    onTitleChange: ({thisObject}) => {
        thisObject.resolvePublichStatus();
    },

    onContentChange: ({thisObject}) => {
        thisObject.resolvePublichStatus();
    },

    delPicture: ({thisObject}) => {
        thisObject.resolvePublichStatus();
    },

    ready: function ({thisObject}) {
        thisObject.resolvePublichStatus();
    }

});

/* globals Page, swan */
/* eslint-disable */
const Publish = contentDecorator({
/* eslint-enable */

    properties: {

        theme: {
            type: String,
            value: ''
        },

        title: {
            type: String,
            value: ''
        },

        titlePlaceHolder: {
            type: String,
            value: '输入标题'
        },

        content: {
            type: String,
            value: ''
        },

        contentPlaceHolder: {
            type: String,
            value: '输入内容'
        },

        pictureList: {
            type: Array,
            value: []
        },

        pictureLimit: {
            type: Number,
            value: 9
        },

        titleLimit: {
            type: Number,
            value: 20
        },

        titleMinLimit: {
            type: Number,
            value: -1
        },

        contentLimit: {
            type: Number,
            value: 120
        },

        contentMinLimit: {
            type: Number,
            value: -1
        },

        showPictureTips: {
            type: Boolean,
            value: false
        },

        pictureSizeLimit: {
            type: Number,
            value: 1e7
        },

        navigationBarTitle: {
            type: String,
            value: '发布'
        },

        tipsEdge: {
            type: Number,
            value: 20
        },

        pictureSelectLimit: {
            type: Number,
            value: 9
        },

        contentAutoHeight: {
            type: Boolean,
            value: true
        },

        contentHeight: {
            type: String,
            value: 'auto'
        }
    },

    data: {
        disableStatus: 'disable',
        focusingClass: '',
        contentClass: '',
        title: '',
        content: '',
        pictureList: []
    },

    contentInfos: {
        title: '',
        content: ''
    },

    lifetimes: {
        created: function () {

            if (swan.openCommunityEditor) {
                swan.openCommunityEditor({
                    ...this.data,
                    contentPlaceholder: this.data.contentPlaceholder,
                    titlePlaceholder: this.data.titlePlaceholder,
                    imageConf: {
                        maxNum: this.data.pictureLimit,
                        ratio: 1
                    },
                    navBarTitleText: this.data.navigationBarTitle,
                    success: function (res) {

                        this.triggerEvent('chooseImage', {
                            images: res.tempFilePaths
                        });

                        this.triggerEvent('publish', {
                            title: res.title,
                            content: res.content
                        });
                    }
                });

                swan.navigateBack();
            }

            swan.setNavigationBarTitle({
                title: this.data.navigationBarTitle
            });
        }
    },

    methods: {

        /**
         * 增加图片方法，并派发事件通知外部
         * @param {Object} [e] - 事件对象
         */
        addPicture: function (e) {
            let pictureList = this.data.pictureList || [];
            api
                .chooseImage({
                    count: this.data.pictureSelectLimit
                })
                .then(event => {
                    const selectedImages = event.tempFiles;
                    const totalImagesLength = selectedImages.length + this.data.pictureList.length;
                    if (totalImagesLength > this.data.pictureLimit) {
                        swan.showToast({
                            title: `图片总数超过${this.data.pictureLimit}张，无法上传`,
                            icon: 'none'
                        });
                        return;
                    }
                    // 有图片大于10M的话，则超标
                    if (this.data.pictureSizeLimit > 0
                        && selectedImages.some(file => file.size > this.data.pictureSizeLimit)
                    ) {
                        swan.showToast({
                            title: `部分图片大于${this.data.pictureSizeLimit / 1000000}M，无法上传`,
                            icon: 'none'
                        });
                        return Promise.reject();
                    }
                    this.triggerEvent('chooseImage', {
                        images: selectedImages.map(file => file.path)
                    });
                });
        },

        /**
         * 查看图片
         * @param {Object} [e] - 事件对象
         */
        viewPicture: function (e) {
            swan.previewImage({
                current: this.data.pictureList[e.currentTarget.dataset.index],
                urls: this.data.pictureList
            });
        },

        delPicture: function (e) {
            let pictureList = this.data.pictureList;
            let index = e.currentTarget.dataset.index;
            pictureList.splice(index, 1);
            this.triggerEvent('delImage', {index});
            this.setData({pictureList});
        },

        onSubmit: function (e) {
            const values = e.detail.value;
            if (this.data.disableStatus === 'disable') {
                return;
            }
            this.triggerEvent('publish', {
                title: values.title,
                content: values.content,
                images: this.data.pictureList
            });
        },

        onTitleChange: function (e) {

            this.data.title = e.detail.value;
            let titleLen = this.data.title.length;

            if (titleLen >= this.data.titleLimit) {
                swan.showToast({
                    title: `标题最多${this.data.titleLimit}字`,
                    icon: 'none'
                });
            }

            this.setData({
                contentClass: titleLen > 0 ? 'has-content' : ''
            });
        },

        onContentChange: function (e) {
            this.data.content = e.detail.value;
        },

        /**
         * 处理"发布"按钮的展现策略
         *
         * @return {bool} - 是否禁用发布按钮
         */
        resolvePublichStatus: function () {
            let title = this.data.title || '';
            let content = this.data.content || '';
            let pictureList = this.data.pictureList || '';

            let hasTitle = !!title.length && !/^(\s|\r|\n)*$/.test(title);
            let hasContent = !!content.length && !/^(\s|\r|\n)*$/.test(content);
            let hasImage = !!pictureList.length;

            let contentOverMinLimit = content.length < this.data.contentMinLimit
                || content.length > this.data.contentLimit;
            let titleOverMinLimit = title.length < this.data.titleMinLimit
                || title.length > this.data.titleLimit;

            let isDisable = !((hasTitle && !titleOverMinLimit)
                              && ((hasContent && !contentOverMinLimit)
                                  || (hasImage && !~this.data.contentMinLimit)));

            this.setData({
                disableStatus: isDisable ? 'disable' : ''
            });

            return isDisable;
        },

        clearTitle: function () {
            this.setData({title: ''});
        },

        titleFocus: function () {
            this.setData({focusingClass: 'focus'});
        },

        titleBlur: function () {
            this.setData({focusingClass: ''});
        }
    }
});

/* eslint-disable */
Component(Publish);
/* eslint-enable */
