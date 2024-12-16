<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';

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

const toLogin = () => {
    router.push('/login')
}
</script>

<template>
    <MainContents :title="title">
        <div class="settingPannel">
            <div class="nav">
                
            </div>
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
        background-color: aquamarine;
        margin-bottom: 0px;
        text-align: center;

        .el-button{
            width: 30%;
        }
    }
}

</style>