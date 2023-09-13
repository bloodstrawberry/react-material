// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware("/callback", {
//       target: "https://github.com",
//       changeOrigin: true,
//     })
//   );
//   // app.use(
//   //   createProxyMiddleware("/user", {
//   //     target: "https://api.github.com",
//   //     changeOrigin: true,
//   //   })
//   // );
// };

// // module.exports = function (app) {
// //   app.use(
// //     "/api", // 경로에 따라 프록시 설정
// //     createProxyMiddleware({
// //       target: "https://api.github.com", // GitHub API 엔드포인트
// //       changeOrigin: true,
// //       pathRewrite: {
// //         "^/api": "", // 경로 재작성 (옵션)
// //       },
// //     })
// //   );
// // };

// // module.exports = function (app) {
// //   app.use(
// //     createProxyMiddleware("/api", {
// //       target: "https://api.github.com",
// //       changeOrigin: true,
// //       pathRewrite: {
// //         "^/api": "", // URL ^/api -> 공백 변경
// //       },
// //     })
// //   );
// // };
