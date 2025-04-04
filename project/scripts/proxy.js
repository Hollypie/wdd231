const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Proxy requests to the BoardGameGeek API
app.use('/xmlapi2', createProxyMiddleware({
  target: 'https://www.boardgamegeek.com',
  changeOrigin: true,
  pathRewrite: {
    '^/xmlapi2': '', // remove '/xmlapi2' from the request
  },
}));

app.listen(8080, () => {
  console.log('Proxy server is running at http://localhost:8080');
});
