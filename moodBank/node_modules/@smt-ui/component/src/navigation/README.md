#### 组件名称
smt-navigation

#### 解释：
顶部自定义的导航栏，其中不包含界面，仅仅是限制了开发者写顶部bar内容的区域，使之在安全区内完成顶部内容的渲染；支持配置返回首页、上一页按钮，和滑动切换效果主题

#### 属性说明：
|属性名 | 类型 | 必填 | 默认值 |说明 |
|---|---|---|---|---|
|backgroundColor |string |否|#fff|导航背景色|
|frontColor |string |否|#000|前景颜色（目前特指字体颜色）|
|opacity |Number |否|1|导航背景透明度|
|navigationStyle |Object |否|{}|导航容器自定义样式（加在行间样式上）|
|navigationAreaStyle |Object |否|{}|导航内容可视区自定义样式（加在行间样式上）|
|type |String |否|default|自定义导航类型：default为默认，switchNav为切换导航栏模式|
|backIcon |Boolean |否|false|是否显示返回图标|
|homeIcon |Boolean |否|false|是否显示首页图标|
|switchStartPosition |Number |否|statusBarHeight（计算得来的默认状态栏的高度）|切换模式下，导航栏起始位置，默认状态栏的高度|
|switchEndPosition |Number |否|100|切换模式下，是否隐藏顶部|
|commonBar |Object |否|{&#39;opacity&#39;:1,&#39;title&#39;:’&#39;,&#39;frontColor&#39;:&#39;#000&#39;,&#39;bgColor&#39;:&#39;#fff&#39;,&#39;backIcon&#39;:true,&#39;homeIcon&#39;:false,&#39;navigationStyle&#39;:{},&#39;navigationAreaStyle&#39;:{}}|切换模式下，初始的导航样式|
|fixedBar |Object |否|{&#39;opacity&#39;:1,&#39;title&#39;:&#39;fixed&#39;,&#39;frontColor&#39;:&#39;#000&#39;,&#39;bgColor&#39;:&#39;pink&#39;,&#39;backIcon&#39;:true,&#39;homeIcon&#39;:false,&#39;navigationStyle&#39;:{},&#39;navigationAreaStyle&#39;:{}}|切换模式下，滚动后的导航样式|
|homeIconSize |String |||顶部自定义的导航栏，其中不包含界面，仅仅是限制了开发者写顶部bar内容的区域，使之在安全区内完成顶部内容的渲染；支持配置返回首页、上一页按钮，和滑动切换效果主题|
|backIconSize |String |||顶部自定义的导航栏，其中不包含界面，仅仅是限制了开发者写顶部bar内容的区域，使之在安全区内完成顶部内容的渲染；支持配置返回首页、上一页按钮，和滑动切换效果主题|

#### 代码示例
swan:
```
<view class="wrap">
    <image class="iphone-image-area"  
        mode="widthFix" 
        src="{{showSwicthNav ? iphoneGifSrc : iphoneImgSrc}}"
    />
    <image class="status-image-area {{showSwicthNav ? 'hide' : ''}}"  
        mode="widthFix" 
        src="{{statusImgSrc}}"
    />
    <smt-navigation 
        navigation-style="{{navigationStyle}}"
        navigation-area-style="{{navigationAreaStyle}}"
        back-icon="{{backIcon}}"
        home-icon="{{homeIcon}}"
        front-color="#fff"
        bindbackHdl="backHdl"
        bindhomeHdl="homeHdl"
        backgroundColor="transparent">
        <view class="navigation-content-area {{showTitle ? '' : 'hide'}}">
            <text class="navigation-title">{{title}}</text>
            <text class="navigation-desc">{{desc}}</text>
        </view>
    </smt-navigation>
    <view class="btns-area">
        <button s-for="item,index in btnsList"
            type="primary"
            data-type="{{item.type}}"
            data-index="{{index}}"
            disabled="{{item.disabled}}"
            hover-stop-propagation="true"
            bind:tap="tapHdl">
            {{item.text}}
        </button>
    </view>
</view>
```
js:
```
Page({
    data: {
        homeIcon: false,
        backIcon: false,
        btnsList: [{
            type: 'back',
            text: '显示"返回上一页"按钮'
        }, {
            type: 'home',
            text: '显示"返回首页"按钮'
        }, {
            type: 'both',
            text: '显示"返回上一页&返回首页"按钮'
        }, {
            type: 'switch',
            text: '点击演示上滑页面导航变色'
        }, {
            type: 'reset',
            text: '重置'
        }],
        iphoneImgSrc: 'https://b.bdstatic.com/miniapp/images/simulator.png',
        iphoneGifSrc: 'https://b.bdstatic.com/miniapp/images/simulator.gif',
        statusImgSrc: 'https://b.bdstatic.com/miniapp/images/smt_status.png',
        navigationStyle: {
            'position': 'relative',
            'margin-top': '-836rpx',
            'padding': '0 0 0 30.19rpx',
            'height': '30px',
            'width': '100%'
        },
        navigationAreaStyle: {
            height: '45px'
        }
    },

    /**
     * 点击返回上一级按钮
     *
     */
    backHdl() {
        this.changeNavHdl('上一页面');

    },

    /**
     * 点击返回首页按钮
     *
     */
    homeHdl() {
        this.changeNavHdl('小程序首页');
    },

    /**
     * 切换模拟器公共方法
     *
     * @param {string} title 标题
     * @param {string} desc 描述
     * @param {boolean} backIcon 是否配置返回按钮
     * @param {boolean} homeIcon 是否配置返回首页按钮
     */
    changeNavHdl(title) {
        this.setData({
            title,
            desc: 'detail',
            backIcon: false,
            homeIcon: false
        });
        setTimeout(() => {
            this.setData({
                showTitle: true
            });
        }, 300);
    },

    /**
     * 点击按钮触发
     *
     * @param {Event} e 事件对象
     * @param {Object} e.currentTarget.dataset 该按钮的数据对象
     */
    tapHdl(e) {
        const {type, index} = e.currentTarget.dataset;
        const homeIcon = /home|both/.test(type);
        const backIcon = /back|both/.test(type);

        this.setData({
            title: '',
            desc: '',
            homeIcon,
            backIcon,
            showTitle: false,
            showSwicthNav: type === 'switch',
            btnsList: this.data.btnsList.filter((btnVal, btnIndex) => {
                if (type === 'reset') {
                    btnVal.disabled = false;
                }
                else if (btnIndex === index) {
                    btnVal.disabled = true;
                }
                return btnVal;
            })
        });
    }
});

```
css:
```
.wrap {
    height: 100%;
    padding: 0;
    background: #f5f5f5;
}

.hide {
    opacity: 0;
}

.header-content-custom {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}
.header-content-area {
    height: 100%;
    flex: 1;
    box-sizing: border-box;
}
.wrap .smt-card-area {
    margin: 25.362rpx 0 72.464rpx;
    background: #fff;
}
.wrap .area-content {
    height: 635.87rpx;
}

.header-content-subtitle {
    z-index: 99;
    display: block;
    font-size: .13rem;
    color: #999;
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

.iphone-image-area {
    width: 702.9rpx;
    height: 580.92rpx;
    margin: 22.34rpx 23.55rpx;
}

.status-image-area {
    width: 661.84rpx;
    position: relative;
    top: -766rpx;
    left: 44rpx;
}

.btns-area {
    /* position: relative;
    top: 362.32rpx; */
    position: fixed;
    width: 100%;
    bottom: 18.12rpx;
    background: #f5f5f5;;
    padding-top: 12.08rpx;
}

.navigation-content-area {
    width: 100%;
    margin-left: 20%;
}

.navigation-desc {
    font-size: 23.55rpx;
}

.navigation-title,
.navigation-desc {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity .5;
}

.navigation-desc {
    opacity: .6;
}
```