#### 组件名称
smt-person-card

#### 解释：
个人信息卡组件，可配置卡片类型、卡片背景图、卡片名称、卡片信息功能，适用于信息展示，并可放置在页面的任何位置。

#### 属性说明：
|属性名 | 类型 | 必填 | 默认值 |说明 |
|---|---|---|---|---|
|type |String |否|noraml|信息卡类型：noraml：默认普通模式，big：大图模式|
|bgImg |String |否|-|卡片背景图|
|name |String |是|-|卡片名称|
|infoList |Array |是|-|卡片信息，最多可配置 5 条，超过不会显示|
|person-card |String |否|-|提供卡片的扩展样式类，供开发者自定义组件样式，可通过此 class 改变卡片的样式，如背景颜色，背景图的展现方式|
|info-name |String |否|-|提供卡片的扩展样式类，供开发者自定义组件样式，可通过此 class 改变卡片 name 的的样式|
|info-title |String |否|-|提供卡片的扩展样式类，供开发者自定义组件样式，可通过此 class 改变卡片信息的左侧标题样式|
|info-desc |String |否|-|提供卡片的扩展样式类，供开发者自定义组件样式，可通过此 class 改变卡片信息的右边内容样式|

#### 代码示例
swan:
```
<view class="wrap">
    <view class="content">
        <view class="card-panel" s-for="item, index in personList">
            <view class="comp-wrap">
                <smt-person-card
                    name="主标题"
                    type="normal"
                    info-list="{{item.personCard}}"
                    bg-img="{{item.imgSrc}}"
                />
            </view>
        </view>
    </view>
</view>
```
js:
```
Page({
    data: {
        personList: [
            {
                title: '默认展示',
                imgSrc: 'https://b.bdstatic.com/searchbox/icms/searchbox/img/person-default.png',
                personCard: [
                    {
                        title: '标题',
                        desc: '内容文本'
                    },
                    {
                        title: '标题名称',
                        desc: '内容展示长文本示例'
                    }
                ]
            },
            {
                title: '带背景展示',
                imgSrc: 'https://b.bdstatic.com/searchbox/icms/searchbox/img/person-use.png',
                personCard: [
                    {
                        title: '标题名称',
                        desc: '内容展示长文本多文字示例'
                    },
                    {
                        title: '文本标题',
                        desc: '内容展示长文本多文字示例'
                    },
                    {
                        title: '标题名称',
                        desc: '内容展示长文本多文字示例'
                    }
                ]
            }
        ]
    }
});
```
css:
```
.wrap {
    height: 100vh;
}

.smt-card-area {
    margin-top: 25.36rpx;
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
    background-color: #fff;
    margin-top: 25.362rpx;
    padding: 27.174rpx 30.797rpx;
}
```