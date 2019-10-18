/**
 * 所有页面通用的、配置后的 Vue 对象。
 * TIP: 因为要做成多页面，这个源文件预留出来做通用设置，保证每个页面都引入它。
 */
import 'normalize.css';
import './assets/common.css';

import Vue from 'vue';
import ElementUI from 'element-ui';
import utils from './plugins/utils';
import request from './plugins/request';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(utils);
Vue.use(request);

export default Vue;