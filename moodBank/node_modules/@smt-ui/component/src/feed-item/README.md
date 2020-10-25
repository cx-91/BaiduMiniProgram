#### 组件名称
smt-feed-item

#### 解释：
信息流子项：包括左文右图、纯文本、上文下图、多图及视频模式。

#### 属性说明：
|属性名 | 类型 | 必填 | 默认值 |说明 |
|---|---|---|---|---|
|theme |string |是|default|信息流子项的主题|
|content |Object |是|{title: &#39;标题&#39;,infoSource: &#39;网易新闻&#39;,commentsNum: 2,images: []}|信息流子项目的内容|
|video |Object |否|{isVideo: true, time: &#39;05:00&#39;}|是否为视频和视频信息|
|status |String |否|0|阅读状态：0未读，1已读|

#### 代码示例
swan:
```
<view>
	<smt-feed-item theme='default' content='{{feedItem}}' video='{{video}}' status='0' smt-feed-item-wrapper='custom-feed-item' bindfeeditemtap='handleTap'>
	</smt-feed-item>
</view>
```
js:
```
Page({
	data: {
		feedItem: {
			title: '宠物自己在家时, 如何帮助它度过孤独时光',
			infoSource: '萌宠在家',
			commentsNum: 11
		},
		video: {
			isVideo: true,
			time: '05:00'
		}
	}
});
```
css:
```
.custom-feed-item {color: #f00}
```