import { app, shell, BrowserWindow, ipcMain } from 'electron'

/**
 * 接收渲染进程的登录、注册界面变化消息，通过回调函数改变窗体大小
 */
const onLoginOrregister = (callback) => {
    ipcMain.on("loginOrRegister", (e, isLogin) => {
        callback(isLogin)
    })
}

// 登录成功，切换到聊天界面（窗口大小的变化）
const onLoginSuccess = (callback) => {
    ipcMain.on("loginSuccess", (e, config) => {
        callback(config)
    })
}

const winTitleOp = (callback) => {
    ipcMain.on("winTitleOp", (e, data) => {
        callback(e,useData)
    })
}

export {
    onLoginOrregister,
    onLoginSuccess,
    winTitleOp
} 