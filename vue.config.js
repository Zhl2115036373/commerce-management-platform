const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,
  // 代理跨越
  devServer: {
    proxy: {
      // '/api': {
      //   // 获取数据的ip地址
      //   target: 'http://gmall-h5-api.atguigu.cn',
        
      // },
    },
  },

})
