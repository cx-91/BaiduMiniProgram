/**
* @file index.js 图标组件
* @author huangjing
* @desc 图标
*/

/* global Page, swan, getApp , Component*/
Component({
    properties: {
        name: {
            type: String
        },
        size: {
            type: String,
            value: '25px'
        },
        color: {
            type: [Array, String],
            value: '',
            observer: function (value) {
                let rgbColor = value;
                const trans = hexColor => {
                    if (hexColor && hexColor.charAt(0) === '#') {
                        return '%23' + hexColor.slice(1);
                    }
                    return hexColor;
                };
                if (typeof value === 'string') {
                    rgbColor = trans(value);
                }
                else {
                    rgbColor = [];
                    for (const i of value) {
                        rgbColor.push(trans(i));
                    }
                }
                this.setData({
                    isStr: typeof value === 'string',
                    rgbColor
                });
            }
        }
    },
    data: {
        quot: '"',
        isStr: true,
        inited: false,
        rgbColor: ''
    },
    attached() {
        this.setData({inited: true});
    }
});
