<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCurrentInstance } from 'vue';

const {proxy} = getCurrentInstance()

const router = useRouter()

const title = ref('系统设置')


const navChoice = ref([
    {
        id: 0,
        name: '登录设置',
    },
    {
        id: 1,
        name:"安全设置"
    },
    {
        id: 2,
        name:"权限设置"
    }
])

const isLogout= ref(false)
const toLogin = async() => {
   await ElMessageBox.confirm('确认退出登录？',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消 ',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '退出成功',
      }),isLogout.value=true
    })

    if(isLogout.value){
        window.ipcRenderer.send("logout",isLogout.value)
        router.push('/login')
    }
}
</script>

<template>
    <MainContents :title="title">
        <div class="settingPannel">
            <div class="nav"></div>
            <div class="logout">
                <el-button type="danger" @click="toLogin()">退出登录</el-button>
            </div>
        </div>
    </MainContents>
</template>

<style scoped>

.settingPannel{
    width: 100%;
    height: 100%;

    .nav{
        width: 100%;
        height: 5%;
    }

    .logout{
        width: 100%;
        height: 100%;
        margin-bottom: 0px;
        text-align: center;

        .el-button{
            width: 30%;
        }
    }
}

</style>