const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/app', {
      target: 'https://pre.wwttxx2.online',
      changeOrigin: true,
      pathRewrite: {
        '^/app': '/'
      }
    })
    // createProxyMiddleware('app', {
    //   target: 'https://pre.wwttxx2.online',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/app': ''
    //   }
    // }),
  )
}