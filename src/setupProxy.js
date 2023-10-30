const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    // createProxyMiddleware('user', {
    //   target: 'https://pre.wwttxx2.online',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/user': ''
    //   }
    // }),
    createProxyMiddleware('app', {
      target: 'https://pre.wwttxx2.online',
      changeOrigin: true,
      pathRewrite: {
        '^/app': ''
      }
    }),
  )
}