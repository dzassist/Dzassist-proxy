const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/v1",
  createProxyMiddleware({
    target: "https://api.openai.com",
    changeOrigin: true,
    pathRewrite: {
      "^/v1": "/v1",
    },
    onProxyReq: (proxyReq, req, res) => {
      const authHeader = req.headers["authorization"];
      if (authHeader) {
        proxyReq.setHeader("Authorization", authHeader);
      }
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('DzAssist Proxy fonctionne ✅');
});
