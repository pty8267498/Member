'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  EVN_CONFIG:'"dev"',
  API_ROOT: '"http://47.105.220.229:80"'
	// API_ROOT: '"https://www.easy-mock.com/mock/5afd2726659068782e12185e/admin/"'  // 本地测试环境接口地址
})
