#### 组件名称
smt-image-uploader

#### 解释：
上传图片组件，支持大图、多图模式，可配置图片个数、大小限制等

#### 属性说明：
|属性名 | 类型 | 必填 | 默认值 |说明 |
|---|---|---|---|---|
|theme |String |否|default|主题：default为小图，large为大图模式|
|pictureList |Array |否|[]|i上传图片地址列表|
|pictureLimit |Number |否|9|上传图片个数上限|
|showPreview |Boolean |否|false|是否支持预览|
|showTips |Boolean |否|false|是否展示提示信息|
|pictureSizeLimit |Number |否|1e7|单张图片大小限制|
|pictureSelectLimit |Number |否|2|从本地相册中选择图片个数|

#### 代码示例
swan:
```
<view class="wrap {{theme}}">
    <view class="card-panel" s-for="item,index in list">
        <view class="mode-title">
            <view class="mode-title-line-left"></view>
            <view class="mode-title-text">{{item.titleBar}}</view>
            <view class="mode-title-line-right"></view>
        </view>
        <view class="smt-card-area">
            <smt-image-uploader 
                picture-container-class="image-uploader-container"
                picture-item-class="image-uploader-item"
                theme="{{item.theme}}"
                data-index="{{index}}"
                bind:chooseimage="chooseImage"
                bind:delimage="delImage"
                picture-list="{{item.images}}"
                picture-limit="{{item.pictureLimit}}"
                picture-select-limit="{{item.pictureSelectLimit}}"
                showTips="true"/>
        </view>
    </view>
    <view class="smt-card-config">
        <view class="item-scroll">
            <text class="switch-text switch-text-before">沉浸式主题</text>
            <switch color="{{theme ==='dark' ? '#f5f5f5' : '#ddd'}}" class="init-switch" disabled="false" bind:change="changeTheme"></switch>
        </view>
    </view>
</view>
```
js:
```
Page({
    data: {
        theme: '',
        searchIconColor: '#999',
        list: [
            {
                titleBar: '上传图片',
                theme: 'default',
                images: [],
                pictureLimit: 9,
                pictureSelectLimit: 9
            },
            {
                titleBar: '上传证照',
                theme: 'large',
                images: [],
                pictureLimit: 2,
                pictureSelectLimit: 2
            }
        ]
    },

    /**
     * 选择图片
     *
     * @param {Event} e 事件对象
     * @param {Object} e.currentTarget.dataset 获取事件对象的数据
     */
    chooseImage(e) {
        const {images, currentTarget} = e;
        const index = currentTarget.dataset.index;
        this.setData(`list.${index}.images`, images);
    },

    /**
     * 删除图片
     *
     * @param {Event} e 事件对象
     * @param {Object} e.currentTarget.dataset 获取事件对象的数据
     */
    delImage(e) {
        const index = e.currentTarget.dataset.index;
        this.setData(`list.${index}.images`,
            this.data.list[index].images.filter(function (item, index) {
                if (index !== e.index) {
                    return item;
                }
            })
        );
    },

    /**
     * 切换主题
     *
     * @param {Event} e 事件对象
     * @param {Object} e.detail 获取checked值
     */
    changeTheme(e) {
        const checked = e.detail.checked;
        this.setData({
            theme: checked ? 'dark' : '',
            searchIconColor: checked ? ' #a4c2ec' : '#999'
        });
        swan.nextTick(() => {
            swan.setBackgroundColor({
                backgroundColor: checked ? '#3670c2' : '#f5f5f5'
            });
        });
    }
});
```
css:
```
.wrap {
    padding-top: .2rem;
    background: #f5f5f5;
}

.wrap .smt-card-area {
    margin: 25.362rpx 0 72.464rpx;
    background: #fff;
}

.wrap .area-content {
    height: 635.87rpx;
}

.wrap .init-switch {
    vertical-align: middle;
    margin: 28.986rpx 0;    
}

.wrap .switch-text-before {
    font-size: 28.986rpx;
    color: #333;
    display: flex;
    align-items: center;
}

.wrap .smt-card-config {
    background: #fff;
    overflow: hidden;
}

.wrap .item-logo {
    display: inline-block;
    width: 32.609rpx;
    height: 32.609rpx;
    margin: 34.005rpx 0;
}

.page-status-hover {
    opacity: .2;
}

.wrap.dark {
    background-color: #3670c2;
}

.wrap.dark .smt-card-config {
    background-color: #4985da;
}

.dark .image-uploader-container {
    background-color: #528fe6;
}

.dark .image-uploader-item {
    border: 1px solid #7fa9e5;
}

.dark .image-uploader-container text {
    color: rgba(255, 255, 255, .6);
}

.wrap.dark .switch-text-before {
    color: #fff;
    background: #4985da;
}

.wrap.dark .mode-title-line-left {
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    opacity: .3;
}

.wrap.dark .mode-title-line-right {
    background-image: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    opacity: .3;
}

.wrap.dark .mode-title-text {
    color: #fff;
}

.wrap.dark .swan-switch-input:after {
    background: #38f;
}
```