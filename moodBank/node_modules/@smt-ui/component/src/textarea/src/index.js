/**
 * @file 多行输入框
 * @author swan
 */
/* globals Component, swan */
import {limitStr} from '../../common/utils/index';

Component({
    externalClasses: [
        'textarea-class',
        'textarea-content-class',
        'textarea-input-class',
        'textarea-button-class'
    ],
    properties: {
        /**
         * 多行输入框主题：
         * default: 默认白色主题
         * border: 边框主题
         * dark: 深色模式主题
         */
        theme: {
            type: String,
            value: 'default'
        },
        // 输入内容默认文案
        placeholder: {
            type: String,
            value: '请输入内容',
            observer(n) {
                this.setData('placeholder', limitStr(n, 32));
            }
        },
        placeholderStyle: {
            type: String,
            value: ''
        },
        // 输入内容长度限制
        contentLimit: {
            type: Number,
            value: 120
        },
        // 输入框宽度
        width: {
            type: String,
            value: 'auto'
        },
        // 输入框高度是否自适应
        autoHeight: {
            type: Boolean,
            value: false
        },
        /**
         * 输入超限提示类型
         * 1.text:框下文字提示；
         * 2.toast:toast提示超限；
         * 3.none:不提示
         */
        promptType: {
            type: String,
            value: 'toast'
        },
        // promptType为text时，出现提示时的剩余可输入字符个数
        tipsEdge: {
            type: Number,
            value: 20
        },
        // promptType为toast时，提示文案内容
        toastText: {
            type: String,
            value: '超出字数限制',
            observer(n) {
                this.setData('toastText', limitStr(n, 14));
            }
        },
        // 发布按钮的文字内容
        submitText: {
            type: String,
            value: '发表'
        }
    },

    data: {
        maxLength: -1,
        content: ''
    },
    methods: {
        /**
         * 输入内容变化时触发
         * @param {Event} e 事件对象
         * @param {Object} e.detail 获取value值
         */
        onChange(e) {
            const {
                promptType,
                contentLimit,
                content,
                toastText
            } = this.data;

            if (contentLimit > 0 && content.length >= contentLimit) {

                if (promptType === 'toast') {
                    swan.showToast({
                        icon: 'none',
                        title: toastText
                    });
                }

                if (promptType !== 'text') {
                    this.setData('maxLength', contentLimit);
                }
            }

            this.triggerEvent('input', {value: e.detail.value});
        },
        /**
         * 点击完成时触发
         * @param {Event} e 事件对象
         * @param {Object} e.detail 获取value值
         */
        onConfirm(e) {
            this.triggerEvent('confirm', {value: e.detail.value});
        },
        /**
         * 失焦时触发
         * @param {Event} e 事件对象
         * @param {Object} e.detail 获取value值
         */
        onBlur(e) {
            this.triggerEvent('blur', {value: e.detail.value});
        },
        /**
         * 发表成功时触发
         *
         */
        onSubmit() {
            swan.showToast({
                title: `${this.data.submitText}成功`
            });
            this.triggerEvent('submit', {
                value: this.data.content
            });
        }
    }
});
