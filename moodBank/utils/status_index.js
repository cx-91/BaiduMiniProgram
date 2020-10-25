/**
 * @file utils/index.js
 * @author jingxiangzheng(jingxiangzheng@baidu.com)
 * @desc 工具集
 */

/**
 * 选择组件 * 避免s-if出问题
 *
 * @param {Object} context this
 * @param {string} selector 选择操作符
 */
export const selComponent = (context, selector) =>
    new Promise((r, j) => {
        if (!context || !selector) {
            return j('context和selector必传！');
        }
        swan.createSelectorQuery().in(context) // eslint-disable-line
        .select(selector).fields({id: true}, res => {
            try {
                if (!res) {
                    return j('未找到节点');
                }
                const component = context.selectComponent(res.id);
                component ? r(component) : j('选择自定义组件错误');
            }
            catch (err) {
                j(err);
            }
        }).exec();
    });
