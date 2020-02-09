const axios = require('axios');  // axios 不支持 ES module
const qs = require('qs');

let RequestPlugin = {};

RequestPlugin.install = function (Vue) {

    axios.defaults.baseURL = API_HOST;
    axios.defaults.timeout = 200000;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';

    axios.interceptors.request.use(
        config => {
            return config;
        },
        error => {
            return error;
        }
    );

    axios.interceptors.response.use(
        response => {
            if (response.status < 400) {
                return response.data;
            }
            return response;
        },
        error => {
            return error;
        }
    );

    Vue.prototype.$httpGet = function (url, params) {
        params = params || {};
        return axios.get(url + '?' + qs.stringify(params, {
                arrayFormat: 'repeat',
                allowDots: true
            }), {_this: this});
    };

    Vue.prototype.$httpDelete = function (url, params) {
        params = params || {};
        let paramString = qs.stringify(params, {
            arrayFormat: 'repeat',
            allowDots: true
        });
        return axios.delete(paramString ? (url + '?' + paramString) : url, {_this: this});
    };

    Vue.prototype.$httpPost = function (url, params) {
        params = params || {};
        return axios.post(url, params, {
            _this: this
        });
    };

    Vue.prototype.$httpPut = function (url, params) {
        params = params || {};
        return axios.put(url, params, {
            _this: this
        });
    };

};

export default RequestPlugin;
