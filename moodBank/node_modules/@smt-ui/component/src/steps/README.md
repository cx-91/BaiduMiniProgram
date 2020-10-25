#### 组件名称
smt-steps

#### 解释：
步骤条组件，可配置步骤条内容，步骤条状态，步骤条上限为8步。适用于信息输入，并可放置在页面的任何位置。

#### 属性说明：
|属性名 | 类型 | 必填 | 默认值 |说明 |
|---|---|---|---|---|
|steps |Array |是|-|步骤条数据，最多支持8个步骤。steps示例：[{text: &#39;标题文案标题文案标题文案&#39;}, {text: &#39;标题文案标题文案标题文案&#39;}]，详细代码请阅读代码示例|
|active |Number |否|1|当前步骤进度|
|color |String |否|#ccc|步骤条默认颜色|
|activeColor |String |否|#2b99ff|当前进度步骤条颜色|
|steps-class |String |否|-|提供步骤条的扩展样式类，供开发者自定义组件样式，可通过此class改变步骤条外层样式|
|step-class |String |否|-|提供步骤条的扩展样式类，供开发者自定义组件样式，可通过此class改变步骤条内容样式|
|step-main-class |String |否|-|提供步骤条的扩展样式类，供开发者自定义组件样式，可通过此class改变步骤条文本样式|

#### 代码示例
swan:
```
<view class="wrap">
    <view class="card-area">
        <view class="top-description border-bottom">默认样式</view>
        <view class="border-bottom">
            <smt-steps
                active="{{stepsActive}}"
                line-style="solid"
                steps="{{steps}}"
                active-color="#2772fb"
                step-main-class="step-main"
            >
            </smt-steps>
        </view>
        <button
            bindtap="addStep"
            class="step-btn-cls"
            hover-stop-propagation="true"
            type="primary"
        >
            点击按钮添加步骤
        </button>
    </view>
    <view class="card-area">
        <view class="top-description border-bottom">执行展示</view>
        <view class="border-bottom">
            <smt-steps
                active="{{fourStepsActive}}"
                line-style="solid"
                steps="{{fourSteps}}"
                active-color="#2772fb"
                step-main-class="step-main"
            >
            </smt-steps>
        </view>
        <button
            bindtap="changeActive"
            class="step-btn-cls"
            hover-stop-propagation="true"
            type="primary"
        >
            点击按钮执行步骤
        </button>
    </view>
</view>
```
js:
```
Page({
    data: {
        stepsActive: 2,
        steps: [
            {
                text: '第1步'
            },
            {
                text: '第2步'
            }
        ],
        fourStepsActive: 2,
        fourSteps: [
            {
                text: '第1步'
            },
            {
                text: '第2步'
            },
            {
                text: '第3步'
            },
            {
                text: '第4步'
            }
        ]
    },

    /**
     * 添加步骤条进度
     */
    addStep() {
        const {stepsActive, steps} = this.data;
        const len = steps.length;

        if (len < 8) {
            this.setData({
                steps: [
                    ...steps,
                    {
                        text: `第${len + 1}步`
                    }
                ],
                stepsActive: stepsActive + 1
            });
        }
        else {
            this.showToast('步骤添加已到上限');
        }
    },

    /**
     * 展示提示
     *
     * @param {string} title 提示内容
     */
    showToast(title) {
        swan.showToast({
            title,
            icon: 'none'
        });
    },

    /**
     * 执行步骤
     */
    changeActive() {
        const {fourStepsActive, fourSteps} = this.data;
        if (fourStepsActive < fourSteps.length) {
            this.setData({
                fourStepsActive: fourStepsActive + 1
            });
        }
        else {
            this.showToast('步骤已执行完成');
        }
    }
});
```
css:
```
.wrap {
    background-color: #f5f5f5;
    height: 100vh;
}

.step-main {
    display: flex;
    justify-content: center;
}

.step-main view {
    margin-left: 0 !important;
}

.step-btn-cls {
    background-color: #2772fb !important;
    color: #fff;
}
```