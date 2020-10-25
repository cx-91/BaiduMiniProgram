#### 组件名称
smt-notice-bar

#### 解释：
跑马灯组件，可配置跑马灯内容，跑马灯样式，跑马灯滚动状态以及滚动配置。适用于提示引导，并可放置在页面的任何位置。

#### 属性说明：
|属性名 | 类型 | 必填 | 默认值 |说明 |
|---|---|---|---|---|
|text |String |否|-|跑马灯文本|
|icon |Boolean |否|true|是否展示跑马灯尾部icon图标|
|iconName |String |否|delete|展示的icon图标名称|
|iconColor |String |否|#fa6400|展示的icon图标颜色|
|scroll |Boolean |否|true|跑马灯是否滚动|
|delay |Number |否|1|跑马灯滚动延时时间|
|speed |Number |否|50|跑马灯每秒滚动速度|
|notice-bar-class |String |否|-|提供跑马灯的扩展样式类，供开发者自定义组件样式，可通过此class改变跑马灯外层样式|
|text-class |String |否|-|提供跑马灯的扩展样式类，供开发者自定义组件样式，可通过此class改变跑马灯文本样式|

#### 代码示例
swan:
```
<view class="wrap">
    <view class="content">
        <view class="card-panel">
            <view class="mode-title">
                <view class="mode-title-line-left"></view>
                <view class="mode-title-text">默认样式</view>
                <view class="mode-title-line-right"></view>
            </view>
            <view class="comp-wrap">
                <smt-notice-bar bg-color="#fef5ef" text="{{noticeBarText}}"></smt-notice-bar>
            </view>
        </view>
        <view class="card-panel">
            <view class="mode-title">
                <view class="mode-title-line-left"></view>
                <view class="mode-title-text">可配样式</view>
                <view class="mode-title-line-right"></view>
            </view>
            <view class="comp-wrap">
                <smt-notice-bar
                    text="{{noticeBarText2}}"
                    icon-color="#fff"
                    notice-bar-class="comp-notice-bar"
                    text-class="comp-notice-bar-text"
                >
                </smt-notice-bar>
            </view>
        </view>
    </view>
</view>
```
js:
```
Page({
    data: {
        noticeBarText: '跑马灯内容跑马灯内容跑马灯内容跑马灯内跑马灯内容跑马灯内容跑马灯内容跑马灯内',
        noticeBarText2: '跑马灯内容跑马灯内容跑马灯内容'
    }
});
```
css:
```
.wrap {
    height: 100vh;
    background-color: #f5f5f5;
}

.content {
    padding-top: .2rem;
}

.smt-card-area {
    margin-top: 25.36rpx;
    background-color: #fff;
}

.card-panel {
    margin-top: 72.46rpx;
}

.card-panel:first-child {
    margin-top: 0;
}

.card-area {
    display: flex;
    margin: 90.58rpx 0 0;
    padding: 28.382rpx 30.797rpx;
    border: none;
    border-radius: 0;
    transition: background-color 200ms linear;
    align-items: center;
    justify-content: space-between;
}

.comp-wrap {
    margin-top: 25.362rpx;
}

.comp-last-content {
    padding-bottom: 0;
}

.comp-info-wrap {
    margin-bottom: 36.232rpx;
}

.comp-info-wrap:last-child {
    margin-bottom: 0;
}

.comp-title {
    margin-top: 10.87rpx;
    color: #999;
}

.comp-notice-bar {
    background-color: #679cfc !important;
}

.comp-notice-bar-text {
    color: #fff;
}
```