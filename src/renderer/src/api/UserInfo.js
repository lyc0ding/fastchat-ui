import request from "@/utils/Request.js"

export const getCaptchaService = () => {
    return request.get('/account/captcha')
}