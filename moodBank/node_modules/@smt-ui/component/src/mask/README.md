#### 组件名称
smt-mask

#### 解释：
关注引导蒙层组件。支持使用默认顶部导航的页面或者自定义顶部导航的页面。

#### 属性说明：
|属性名 | 类型 | 必填 | 默认值 |说明 |
|---|---|---|---|---|
|name|String|否|小程序名称|待关注的小程序名，一般是当前小程序名|
|icon|String|否|''|待关注的小程序logo，一般是当前小程序|
|is-custom|Boolean |否|false|是否是自定义顶部导航的页面，即.json文件中是否设置了 `isCustom: true` ，如果设置了，需要将此选项置为 `true`|

#### 代码示例
swan:
```
<view>
    <smt-mask name="AI分诊助手" icon="https://b.bdstatic.com/miniapp/images/swan_ui/fragment/AI分诊.png" is-custom />
</view>
```
