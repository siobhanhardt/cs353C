const { createProxyMiddleware } = require('http-proxy-middleware')

// 通常使用这种方式就够了，如果报错，可以使用下面的方法

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://127.0.0.1:9000',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
              "^/api": "/api"
            }
        })
    )
}
