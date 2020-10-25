Smart UI是一套开发、设计风格统一的智能小程序扩展组件库，由百度智能小程序官方设计团队和智能小程序团队为小程序量身设计，以增强开发者开发体验。

### Smart UI目前提供的核心能力如下： 

|名称|解释|
|---|---|
|[follow 关注](https://smartprogram.baidu.com/docs/develop/extended/component-content/follow/)|关注组件，内容/用户关注组件。开发者可在小程序内配置关注组件，实现用户对内容和用户的关注，可嵌套在原生组件内，自定义选择组件的样式和动效。|
|[icon 图标](https://smartprogram.baidu.com/docs/develop/extended/ui_component/smt-icon/)|包括天气、系统设置、互动社交、生活服务、书籍影音、政务服务、交通出行7个行业类别的图标。请扫描示例二维码查看图标全集。|
|[navigation 自定义导航](https://smartprogram.baidu.com/docs/develop/extended/ui_component/smt-navigation/)| 顶部自定义的导航栏，其中不包含界面，仅仅是限制了开发者写顶部bar内容的区域，使之在安全区内完成顶部内容的渲染；支持配置返回首页、上一页按钮，和滑动切换效果主题|
|[page-status 页面状态](https://smartprogram.baidu.com/docs/develop/extended/ui_component/smt-page-status/)|页面状态组件，可用于全屏和半屏。用于展示页面加载，页面异常-有操作、页面异常-无操作三种页面状态。|
|[spin 加载](https://smartprogram.baidu.com/docs/develop/extended/ui_component/smt-spin/)|加载组件，可用于全屏和半屏。用于展示加载状态，点击加载、正在加载、加载完成、重新加载四种状态。|
|[refresh 刷新](https://smartprogram.baidu.com/docs/develop/extended/ui_component/smt-refresh/)|可用于页面任意区域；使用时需自行添加下拉逻辑改变offset-y参数；smt-feed组件对smt-refresh进行了封装，支持手势交互和api调起刷新。|
|[feed 信息流](https://smartprogram.baidu.com/docs/develop/extended/ui_component/smt-feed/)|信息流组件，可配置下拉刷新、列表加载、上滑加载功能，适用于列表信息展示，并可放置在页面的任何部分；组件包含手势下拉以及api调用两种使用方式。|
|[feed-item 信息流子项](https://smartprogram.baidu.com/docs/develop/extended/ui_component/smt-feed-item/)|信息流子项，包括左文右图、纯文本、上文下图、多图及视频模式。|
|[search-bar 自定义搜索框](https://smartprogram.baidu.com/docs/develop/extended/ui_component/smt-search-bar/)|自定义搜索框，支持配置多种主题，搜索默认文案，容器样式等。|
|[textarea 多行输入框](https://smartprogram.baidu.com/docs/develop/extended/ui_component/smt-textarea/)|多行输入框，支持白色主题（默认）、 边框主题和深色模式主题，可配置字符限制、错误提示方式等。|
|[image-uploader 图片上传器](https://smartprogram.baidu.com/docs/develop/extended/ui_component/smt-image-uploader/)|上传图片组件，支持大图、多图模式，可配置图片个数、大小限制等。|



## Smart UI快速入门 

* 使用前： 扩展组件库基于智能小程序自定义组件构建，在使用扩展组件库之前，建议先阅读熟悉[智能小程序自定义组件](https://smartprogram.baidu.com/docs/develop/framework/custom-component/)。

* 如何使用：目前组件库灵活支持两种引入方式：npm和动态库方式。

### 方式一： npm 引入
1. 首先要在项目中npm安装依赖包`@smt-ui/component`；

2. 引入 npm 包中的自定义组件
```
{
    "usingComponents": {
        "smt-icon": "@smt-ui/component/src/icon"
    }
}
```

3. 在对应页面的 swan 中直接使用该组件
```
<smt-icon name="arrow-left"></smt-icon>
```

### 方式二： 动态库引入
1. 首先要在项目的app.json引入动态库，[动态库相关可参考文档](https://smartprogram.baidu.com/docs/develop/framework/dynamiclib_use/)

```
"dynamicLib": {
    // 'smartUI' 是个可自己定的别名。本小程序中统一用这个别名引用此动态库。
    "smartUI": {
        // 这个 provider 就是发布的动态库唯一名字，须写 "smart-ui"。
        "provider": "smart-ui"
    }
},
```

2. 引入动态库的自定义组件
```
{
    "usingComponents": {
        "smt-icon": "dynamicLib://smartUI/smt-icon"
    }
}
```

3. 在对应页面的 swan 中直接使用该组件
```
<smt-icon name="arrow-left"></smt-icon>
```

4. 目前已支持动态库引入的组件包括：`smt-feed，smt-feed-item，smt-icon，smt-page-status，smt-refresh，smt-spin，smt-mask、smt-textarea、smt-search-bar、smt-image-uploader`


* 具体到各个组件的使用，[可参考组件文档](https://smartprogram.baidu.com/docs/develop/extended/ui_component/smt-feed/) 
