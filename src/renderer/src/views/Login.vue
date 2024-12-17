<script setup>
import { ref ,getCurrentInstance} from 'vue';
import { UserFilled, Lock, Promotion, Iphone,CloseBold } from '@element-plus/icons-vue'
// 代理对象挂载，使其可以引用全区配置的工具类
const { proxy } = getCurrentInstance()
import { useUserInfoStore } from '@/stores/UserInfoStore';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const UserInfoStore = useUserInfoStore()
const router=useRouter()

// 登录、注册提交的表单信息
const formData = ref({
  userId: '',
  phone: '',
  nickname:'',
  password: '',
  checkPassword:'',
  captchaAnswer: ''
})
// 发送请求获取验证码
const captchaUrl=ref("@\assets\img\failPic.png")
const getCaptcha = async () => {
  let result = await proxy.Request({
    url: proxy.Api.captcha,
    requestType: 'get',
    showLoading:true
  })
  if(!result){
    return;
  }
  captchaUrl.value = result.data.captcha
  localStorage.setItem("captcha",result.data.captchaKey)  //将验证码的key存在浏览器中的storage中，且刷新或者重启浏览器都不会消失
}
getCaptcha()

// 登录、注册界面切换
const isLogin = ref(true)
// 信息未填写、不符合规范提示信息
const errMsg = ref('')

//校验提示信息
const changeOnType = () => {
  errMsg.value=''
  window.ipcRenderer.send('loginOrRegister', !isLogin.value)
  isLogin.value=!isLogin.value
}

// 登录、注册按钮：校验参数信息
const submit = async() => {
  if (isLogin.value && proxy.Utils.isEmpty(formData.value.userId)){
    errMsg.value = '用户ID不能为空！'
    return;
  }
  else if (!isLogin.value && !proxy.Utils.checkValueByType('phone', formData.value.phone)) {
    errMsg.value = "请输入正确的手机号！"
    return
  }
  else if (proxy.Utils.isEmpty(formData.value.password)) {
    errMsg.value = '密码不能为空！'
    return;
  }
  else if (!isLogin.value && !(formData.value.password === formData.value.checkPassword)) {
    errMsg.value = "输入的两次密码应该一致！"
    return 
  }
  else if(proxy.Utils.isEmpty(formData.value.captchaAnswer)) {
    errMsg.value = '验证码不能为空！'
    return;
  }
  errMsg.value = ""
  // 登录注册请求
  let result = await proxy.Request({
    url: isLogin.value?proxy.Api.login:proxy.Api.register,
    requestType:'post',
    params: {
      userId: isLogin.value ? formData.value.userId : null,
      password: formData.value.password,
      nickname: !isLogin.value ? formData.value.nickname : null,
      phone: !isLogin.value ? formData.value.phone : null
    },
    errorCallback:(response)=> {
      getCaptcha();
      errMsg.value=response.data
    }
  })
  if (result.code==200) {
    isLogin.value ? ElMessage.success("登录成功！") : ElMessage.success("注册成功！")
    //将用户登录成功生成的token存入pinia
    UserInfoStore.setInfo(result.data)
    if (isLogin.value) { 
      // 登录（注册）成功，给主进程发消息
      window.ipcRenderer.send("loginSuccess", isLogin.value)
      router.push('/index');//跳转到主页你买呢
      return;
    }
    changeOnType();
    return;
  }
  if (!result) {
    cleanFormData()
    return;
  }
}



const cleanVerify = () => {
  errMsg.value=null
}
const cleanFormData = () => {
  formData.value.userId = '',
  formData.value.captchaAnswer = '',
  formData.value.checkPassword = '',
  formData.value.password = '',
  formData.value.phone = '',
  formData.value.nickname = ''
}
</script>

<template>
  <div id="login-panel" v-on:keyup.enter="submit()">  <!--在登录页绑定事件：按下enter键提交登录 --> 
    <!-- 登录界面标头 -->
    <div id="login-title" class="title drag">
      <span>FastChat</span>
    </div>

    <div id="login-interface">
      <!-- 登录表单 -->
      <el-form
        :model="formData"
        ref="formDataRef"
        label-width="80px"
        @submit.prevent
      >
        <!-- 错误输入校验 -->
        <el-form-item label="" label-width="auto" prop="">
          <div id="errMsg">{{ errMsg }}</div>
        </el-form-item>
        <!--用户名-->
        <el-form-item label="" label-width="auto" prop=""  v-if="isLogin" @focus="cleanVerify()">
          <el-input clearable placeholder="用户ID" v-model.trim="formData.userId">
            <template #prefix>
              <el-icon><UserFilled /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!--电话号码或者电子邮箱-->
        <el-form-item label="" label-width="auto" prop="" v-if="!isLogin">
          <el-input clearable placeholder="手机" v-model.trim="formData.phone" type="text">
            <template #prefix>
              <el-icon><Iphone /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!--用户昵称-->
        <el-form-item label="" label-width="auto" prop="" v-if="!isLogin">
          <el-input clearable placeholder="昵称" v-model.trim="formData.nickname">
            <template #prefix>
              <el-icon><UserFilled /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item label="" label-width="auto" prop="" >
          <el-input clearable placeholder="密码" v-model.trim="formData.password" type="password">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!--确认密码-->
        <el-form-item label="" label-width="auto" prop="" v-if="!isLogin">
          <el-input clearable placeholder="确认密码" v-model.trim="formData.checkPassword" type="password">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!--验证码-->
        <el-form-item label="" label-width="auto" prop="" >
          <el-input clearable placeholder="验证码" v-model.trim="formData.captchaAnswer">
            <template #prefix>
              <el-icon><Promotion /></el-icon>
            </template>
          </el-input>
          <div style="margin-left: 10px;">
            <img :src=captchaUrl @click="getCaptcha">
          </div>
        </el-form-item>
      </el-form>

      <!-- 提交按钮 -->
      <el-button type="primary" @click="submit()">{{ isLogin?'登录':'注册' }}</el-button>
    </div>

  <div class="otherLogin">
    <el-dropdown  v-if="isLogin">
      <span class="el-dropdown-link">
        其他方式登录
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>手机号验证</el-dropdown-item>
          <el-dropdown-item>电子邮箱验证</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <div class="bottom-link">
    
    <span class="forget">忘记密码?</span>
    <span class="registry" @click="changeOnType()">{{ isLogin?'没有账号？':'已有账号？' }}</span>

  </div>
  </div>

  <WinOption class="close" :showSetTop="false" :showSetMax="false" :showSetMin="false"></WinOption>

</template>


<style lang="scss" scoped>

  #login-panel{
    user-select: none;
    background-color:white;
  }
   
   #login-title{
    padding: 5px 10px 0px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .shutdown{
      width: 20px;
      height: 20px;
      background-color: red;
    }
  }

  #login-interface{

  display: flex;  
  flex-direction: column;  
  justify-content: center;  
  align-items: center;

  .el-button{
    width: 80vw;
  }

  .el-form{

    #errMsg{
      margin-top: 12px;
      color: red;
    }
    .el-form-item:nth-child(2){
      margin-top: -10px;
    }
    .el-form-item{
      .el-input{
        width: 250px;
      }
    }
    .el-form-item:last-child{
      .el-input{
        width: 100px;
      }
    }
  }

  }

  .otherLogin{
    padding: 10px;
    margin-top: 20px;

  }

  .bottom-link{
    display: flex;
    justify-content: space-between;
    padding: 10px;

    span:hover{
    color: #07c160;
    }
  }

  .close{
    width: 26px;
    padding-right: 5px;
  }
</style>
