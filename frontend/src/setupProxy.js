const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        ["/articles", "/article", "/profileInfo", "/avatar/:user?", "/avatar", "/headline", "/email", "/zipcode"],
        createProxyMiddleware(
            {
                target: "http://localhost:4000/",
                changeOrigin: true,
                // pathRewrite: {
                //     "/articles": ""
                // }
            }
        )
    );
    // app.use(
    //     "/article",
    //     createProxyMiddleware(
    //         {
    //             target: "http://localhost:4000/article",
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 "/article": ""
    //             }
    //         }
    //     )
    // );
};