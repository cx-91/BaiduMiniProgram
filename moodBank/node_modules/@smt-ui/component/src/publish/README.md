#### 组件名称
publish

#### 解释：
发布器组件可以用于用户直接发布文章使用，可以包含文字与图片，在支持发布器的客户端上，会直接调用API来展示发布器，在不支持发布器的客户端上，则会展示降级版的发布器

#### 属性说明：
|属性名 | 类型 | 必填 | 默认值 |说明 |
|---|---|---|---|---|
|theme |String |false|-|主题配置，默认浅色；深色主题请指定dark|
|loadingHgt |Number |false|192px（需转换为设备尺寸）|加载区域高度|
|offsetY |Number |false|0|垂直移动距离，*建议后续在sjs中使用|
|status |Number |false|0|加载状态 0: 未开始 1: 加载中 2: 展示话术|
|text |String |false|建议最多显示18个汉字，超出内容截断|加载成功时的展示话术|

#### 代码示例
swan:
```
<publish title="发布器默认展示的标题" pictureList="{{pictureList}}" bind:chooseImage="chooseImage" bind:delImage="delImage" bind:publish="publish"></publish>
```
js:
```

```
css:
```

```