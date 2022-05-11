const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const next = require('next');

const hostname = 'localhost';
const port = process.env.PORT;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // const HOST = 'https://gorest.co.in/public';
    const HOST = 'https://api.instantwebtools.net'; //free-api
    const HOST_SKP = 'https://workspace-dev.rbdialog.co.kr'; //free-api
    const PORT = process.env.PORT || 3000;

    server.use(
      '/api/*',
      createProxyMiddleware({
        target: HOST,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      })
    );

    server.use(
      '/rest-api/*',
      createProxyMiddleware({
        target: HOST_SKP,
        changeOrigin: true,
      })
    );

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('[ERROR] ', err);
    process.exit(1);
  });
