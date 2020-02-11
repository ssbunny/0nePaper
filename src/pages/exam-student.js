import 'iview/dist/styles/iview.css'
import Vue from '../vue.js';
import ExamStudent from '../views/exam/ExamStudent.vue';

import {
    Table,
    Alert
} from 'iview';


// 万万没想到，element-ui 1000 条记录就卡的不行...
Vue.component('Table', Table);
Vue.component('Alert', Alert);

new Vue({
    el: '#app',
    render: h => h(ExamStudent)
});
