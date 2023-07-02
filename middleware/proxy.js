const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (req, res, next) {
  if (req.url.startsWith('/api')) {
    // 将请求代理到目标地址
    createProxyMiddleware('/api', { 
      target: 'http://39.104.22.73:8888/', 
      changeOrigin: true,
      pathRewrite: {
        '^/api': '' //路径重写
      },
      pathRequiresRewrite: {
        '^/api': ''
      }
  })(req, res, next)
  } else {
    next()
  }
}