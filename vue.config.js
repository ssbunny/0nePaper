const webpack = require('webpack');

const HOST_PRO = '"http://192.168.1.110:808"';  // 生产环境中，API 主机地址
const HOST_DEV = '"http://28986ma181.eicp.vip"';     // 开发环境中，API 主机地址

const DIST_DIR = './dist';

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    publicPath: '',
    outputDir: DIST_DIR,
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                IS_DEV: isDev,
                API_HOST: isDev ? HOST_DEV : HOST_PRO
            })
        ]
    },
    lintOnSave: false,
    pages: {
        'exam-list': {
            entry: 'src/pages/exam-list.js',
            title: '考试信息列表'
        },
        'exam-creation': {
            entry: 'src/pages/exam-creation.js',
            title: '创建考试'
        },
        'exam-student': {
            entry: 'src/pages/exam-student.js',
            title: '选择考生'
        },
        'marking': {
            entry: 'src/pages/marking.js',
            title: '阅卷'
        },
        'check-objective': {
            entry: 'src/pages/check-objective.js',
            title: '客观题校验'
        }
    }
};