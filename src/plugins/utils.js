import * as collection from  'd3-collection';

let UtilsPlugin = {};

UtilsPlugin.install = function (Vue) {

    // 引入 d3.js 库里的集合相关方法，很实用的库
    Vue.prototype.$collection = collection;

    /**
     * 深克隆一个 JS 对象
     * @param obj
     */
    Vue.$deepCopy = Vue.prototype.$deepCopy = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    };

    /**
     * 浅克隆一个 JS 对象
     * @param obj
     */
    Vue.$shallowCopy = Vue.prototype.$shallowCopy = (obj) => {
        return Object.assign({}, obj);
    };

    /**
     * 数字的小数位数格式化
     * @param val         - 待处理的数字
     * @param scale       - 格式化的位数，默认 2 位
     * @param defaultVal  - 处理失败后的缺省值，默认显示 `--`
     */
    Vue.$toFixed = Vue.prototype.$toFixed = (val, scale, defaultVal) => {
        if (typeof val !== 'number') {
            val = parseFloat(val);
        }
        if (Number.isNaN(val)) {
            if (defaultVal === 0) {
                return 0;
            }
            return defaultVal || '--';
        }
        return val.toFixed(scale || 2);
    };

};

export default UtilsPlugin;
