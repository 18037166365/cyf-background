let baseUrl;   //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = "http://127.0.0.1:3009/"  //这里是本地的请求url
        break
    case 'production':
        baseUrl = "https://cyf.nlxiaoniao.cn/"   //生产环境url
        break
}

export default baseUrl;
