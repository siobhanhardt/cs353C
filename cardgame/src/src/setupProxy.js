const { createProxyMiddleware } = require('http-proxy-middleware')

// Usually this method is enough, if an error is reported, you can use the following method

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
