#### 组件名称
smt-icon

#### 解释：
包括天气、系统设置、互动社交、生活服务、书籍影音、政务服务、交通出行7个行业类别的图标。请扫描示例二维码查看图标全集。

#### 属性说明：
|属性名 | 类型 | 必填 | 默认值 |说明 |
|---|---|---|---|---|
|name |String |是||icon的英文名称|
|color |String, Array.&lt;String&gt; |||icon的颜色，多色图标支持传入色值的数组|
|size |String ||25px|icon的尺寸，必须包含单位（px, rpx, vw, vh, %, em等）|

#### 代码示例
swan:
```
<view>
    <smt-icon name="add" color="{{color1}}" />
    <smt-icon name="smart-game-m" size="30"  color="{{color2}}"/>
</view>
```
js:
```
Page({
    data: {
        color1: '#3388ff',
        color2: ['#ffdd52', '#ffc92c', '#ffa808', '#ffa808']
    }
});
```
css:
```

```
