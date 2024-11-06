// 所有服务端要用到的接口
const api = {
    prodDomain: "http://127.0.0.1:9999",
    devDomain:"http://127.0.0.1:9999",
    prodWsDomain:"ws://127.0.0.1:9999/ws",
    devWsDomain:"ws://127.0.0.1:9999/ws",
    captcha: "/account/captcha",//验证码
    login: "/account/login",//登录
    register: "/account/register",//注册 
}

export default api