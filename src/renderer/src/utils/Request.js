import axios from 'axios'
import { ElLoading } from 'element-plus'
import Message from '@/utils/Message.js'
import Api from '@/utils/Api.js'
import Utils from '@/utils/Utils'

//请求头的东西
const contentTypeForm = 'application/x-www-form-urlencode;charset=UTF-8'  //表单
const contentTypeJson = 'application/json'   //json
const responseTypeJson = 'json'

let loading = null

const instance = axios.create({
    withCredentials: true,//允许授权，头部携带信息
    // 生产环境：http://localhost:9999/api
    // 开发环境（大成dist包）：/api
    baseURL: (import.meta.env.PROD ? Api.prodDomain : "") + "api", //判断环境
    timeout:10*1000
})

//请求前拦截器
instance.interceptors.request.use(
    (config) => {
        //发送请求后，做一个时长两秒的遮罩，防止重复提交
        if (config.showLoading) {
            loading = ElLoading.service({
                lock: true,
                text: '加载中……',
                background: 'regb(0,0,0,.7)'
            });
        }
        return config
    },
    (error) => {
        if (config.showLoading && loading) {
            loading.close();
        }
        Message.error("请求发送失败");
        return Promise.reject("请求发送失败")
    }
)

// 请求后拦截器
instance.interceptors.response.use(
    //服务器响应成功，将遮罩关掉
    (response) => {        //相当于 function(response)
        const { showLoading, errorCallback, showError = true, responseType } = response.config
        if (showLoading || loading) {
            setInterval(() => {
                loading.close()
            },1500)
        }
        const responseData = response.data  //返回的数据
        //以数据流的形式返回的
        if (responseType == 'arraybuffer' || responseType == 'blob') {
            return responseData;
        }
        //正常请求
        if (responseData.code == 200) {
            return responseData;
        }
        else if (responseData.code == 901) {
            //登录超时
            setTimeout(() => {
                window.ipcRenderer.send('relogin')
            }, 2000)
            return Promise.reject({showError:true,msg:"登录超时"})
        }
        else {
            //其他错误
            if (errorCallback) {
                errorCallback(responseData)
            }
            return Promise.reject({showError:showError,msg:responseData.mag})
        }
    },
    (error) => {
        if (error.config.showLoading || loading) {
            loading.close()
        }
        // Utils.ContentAfterFirstSemicolon(error.response.data)
        return Promise.reject({ showError: true, msg: "网络异常"})
    }
)

//真正发请求的地方
const request = (config) => {
    const { url, params, dataType, showLoading = true, responseType = responseTypeJson, showError = true ,requestType} = config
    let contentType = contentTypeForm
    let formData = new FormData(); //创建form对象
    for (let key in params) {
        formData.append(key, params[key] == undefined ? "" : params[key])
    }
    if (dataType != null && dataType == 'json') {
        contentType=contentTypeJson
    }
    const token = localStorage.getItem('token')  //获取token值
    let headers = {
        'Content-Type': contentType,
        'X-Requested-With': XMLHttpRequest,
        'token':token   //请求头带上token
    }

    if (requestType == 'post') {
        return instance.post(url, formData, {
            headers: headers,
            showLoading: showLoading,
            errorCallback: config.errorCallback,
            showError: showError,
            responseType:responseType
        }).catch(error => {
            if (error.showError) {
                Message.error(error.msg)
            }
            return null;
        })
    }
    else {
        return instance.get(url, {
            headers: headers,
            showLoading: showLoading,
            errorCallback: config.errorCallback,
            showError: showError,
            responseType:responseType
        }).catch(error => {
            if (error.showError) {
                Message.error(error.response.data)
            }
            return null;
        })
    }
}

export default request