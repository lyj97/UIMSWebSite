const Webpack = require("webpack")
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require("./webpack.config")
const config = require('./config/')

var compiler = Webpack(webpackConfig)
var server = new WebpackDevServer(compiler, {
    publicPath: config.publicPath,
    stats: {
        colors: true //显示不同的颜色区分打包的文件
    },
    // proxy: { //代理服务器
    //     '/api': {
    //         target: 'http://2045.site:8099/UIMSTest/',
    //         changeOrigin: true,
    //         pathRewrite: {
    //           '^/api': '/'
    //         }
    //     }
    // }
})

server.listen(8080, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('http://localhost:8080' + config.publicPath)
})