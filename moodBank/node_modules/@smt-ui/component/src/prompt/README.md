#### 组件名称
smt-prompt

#### 解释：
温馨提示组件，可配置标题内容，提示内容，并可放置在页面的任何位置。

#### 属性说明：
|属性名 | 类型 | 必填 | 默认值 |说明 |
|---|---|---|---|---|
|prompt-class |String |否|-|提供开发外部样式类，供开发者自定义组件样式，可通过此 class 改变提示框外层样式|
|title-class |String |否|-|提供开发外部样式类，供开发者自定义组件样式，可通过此 class 改变提示框标题样式|
|content-class |String |否|-|提供开发外部样式类，供开发者自定义组件样式，可通过此 class 改变提示框内容样式|

#### 代码示例
swan:
```
<view>
    <smt-prompt content-class="prompt-content">
        <view slot="title">标题名称</view>
        <view slot="content">
            内容信息描述，支持多行信息展示，高度根据内容信息自适应<view class="content-herf" bindtap="clkTextShow">文字链接</view>
        </view>
    </smt-prompt>
</view>
```
js:
```
Page({

    /**
     * 文字链接点击事件
     */
    clkTextShow() {
        swan.showToast({
            title: '暂未配置链接',
            icon: 'none'
        });
    }
});
```
css:
```
.prompt-content {
    font-size: 25.362rpx;
    line-height: 1.5;
    color: #999;
}

.prompt-content .content-herf {
    color: #2772fb;
    display: inline;
}
```