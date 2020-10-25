#### 组件名称
smt-timeline

#### 解释：
时间轴组件，可配置时间轴内容，时间轴状态以及自定义图标。适用于信息展示，并可放置在页面的任何位置。

#### 属性说明：
|属性名 | 类型 | 必填 | 默认值 |说明 |
|---|---|---|---|---|
|status |String |否|wait|时间轴状态，类型包括：wait、finished、success、error，每个类型对应不同的icon图标以及时间轴展现样式|
|title |String |否|-|时间轴标题|
|desc |String |否|-|时间轴副标题|
|descStyle |String |否|-|时间轴副标题样式|
|icon |String |否|-|自定义icon名称|
|iconColor |String |否|-|自定义icon颜色|
|timeline-class |String |否|-|提供时间轴的扩展样式类，供开发者自定义组件样式，可通过此class改变时间轴外层样式|
|item-tail-class |String |否|-|提供时间轴的扩展样式类，供开发者自定义组件样式，可通过此class改变时间轴轴线样式|
|content-title-class |String |否|-|提供时间轴的扩展样式类，供开发者自定义组件样式，可通过此class改变时间轴标题样式|

#### 代码示例
swan:
```
<view class="wrap">
    <view class="content">
        <view class="card-panel">
            <view class="mode-title">
                <view class="mode-title-line-left"></view>
                <view class="mode-title-text">单条信息样式</view>
                <view class="mode-title-line-right"></view>
            </view>
            <view class="comp-wrap">
                <smt-timeline
                    s-for="item, index in options"
                    status="{{item.status}}"
                    title="{{item.title}}"
                    desc="{{item.desc}}"
                    has-tail="{{item.hasTail}}"
                    icon-color="{{item.iconColor}}"
                    timeline-class="comp-timeline"
                    desc-style="
                        {{index === options.length - 1 ? 'font-weight: 700;' : ''}}
                        {{item.status === 'error' ? 'color: #f7534f' : ''}}
                    "
                >
                    {{item.info}}
                </smt-timeline>
            </view>
        </view>
        <view class="card-panel">
            <view class="mode-title">
                <view class="mode-title-line-left"></view>
                <view class="mode-title-text">多条信息样式</view>
                <view class="mode-title-line-right"></view>
            </view>
            <view class="comp-wrap">
                <smt-timeline
                    s-for="item, index in options2"
                    status="{{item.status}}"
                    desc="{{item.desc}}"
                    has-tail="{{item.hasTail}}"
                    icon-color="{{item.iconColor}}"
                    timeline-class="comp-timeline"
                    desc-style="{{
                        index === options.length - 1
                        ? 'font-weight: 700;'
                        : ''
                    }}"
                >
                    <view
                        class="comp-info-wrap"
                        s-for="descInfo in item.descInfo"
                    >
                        <view class="comp-info">
                            {{descInfo.info}}
                        </view>
                        <view class="comp-title">
                            {{descInfo.title}}
                        </view>
                    </view>
                </smt-timeline>
            </view>
        </view>
    </view>
</view>
```
js:
```
Page({
    data: {
        options: [
            {
                title: '2019-10-15 15:29:06',
                desc: '状态：进行中',
                info: '当前状态详情描述',
                status: 'wait',
                hasTail: true,
                iconColor: '#2772fb'
            },
            {
                title: '2019-10-15 15:29:06',
                desc: '状态：成功/通过',
                info: '当前状态详情描述',
                status: 'success',
                hasTail: true,
                iconColor: '#2772fb'
            },
            {
                title: '2019-10-15 15:29:06',
                desc: '状态：失败/未通过',
                info: '当前状态详情描述',
                status: 'error',
                iconColor: '#f7534f'
            }
        ],
        options2: [
            {
                status: 'wait',
                desc: '状态：进行中',
                hasTail: true,
                iconColor: '#2772fb',
                descInfo: [
                    {
                        info: '当前状态详情描述',
                        title: '2019-10-15 15:29:06'
                    },
                    {
                        info: '当前状态详情描述',
                        title: '2019-10-15 15:29:06'
                    }
                ]
            },
            {
                status: 'success',
                desc: '状态：成功/通过',
                hasTail: true,
                iconColor: '#2772fb',
                descInfo: [
                    {
                        info: '当前状态详情描述',
                        title: '2019-10-15 15:29:06'
                    },
                    {
                        info: '当前状态详情描述',
                        title: '2019-10-15 15:29:06'
                    }
                ]
            },
            {
                status: 'success',
                desc: '已办结',
                iconColor: '#2772fb',
                descInfo: [
                    {
                        info: '当前状态详情描述',
                        title: '2019-10-15 15:29:06'
                    },
                    {
                        info: '当前状态详情描述',
                        title: '2019-10-15 15:29:06'
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
    background-color: #f5f5f5;
    transition: background-color 200ms linear;
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
    padding: 38.043rpx 30.797rpx 0;
    background-color: #fff;
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

.comp-timeline {
    padding: 0 !important;
}
```