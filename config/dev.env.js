'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST: '"/api"'
});
// prod:
//     module.exports = {
//       NODE_ENV: '"production"',
//       API_HOST: '"http://172.16.211.151/"' //服务器域名
//     };
