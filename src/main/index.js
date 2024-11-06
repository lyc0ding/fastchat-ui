import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { onLoginOrregister, onLoginSuccess,winTitleOp } from './ipc'

const login_width = 300
const login_height = 370
const register_height = 465

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'FastChat',
    icon: icon,
    width: 850, //login_width,
    height: 700, //login_height,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    frame: true,
    resizable: false,
    transparent: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.setTitle('FastChat')
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    //分离状态打开开发者工具
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  //监听登录注册
  onLoginOrregister((isLogin) => {
    mainWindow.setResizable(true)
    if (isLogin) {
      mainWindow.setSize(login_width, login_height)
    } else {
      mainWindow.setSize(login_width, register_height)
    }
    mainWindow.setResizable(false)
  })

  onLoginSuccess((config) => {
    mainWindow.setResizable(true) //可变窗口大小
    mainWindow.setSize(850, 800)
    mainWindow.center() //居中显示
    //可以最大化
    mainWindow.setMinimizable(true)
    //设置最小窗口大小
    mainWindow.setMinimumSize(800, 600)
    if (config) {
      console.log(config)
    }
  })

  winTitleOp((e,{action,data}) => {
    const webContents = e.sender;
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.