<script setup>
import { ref, reactive, toRefs, onMounted,watch} from 'vue'
import { ElMessage} from 'element-plus'

const avatarUrl = ref('@/assets/img/avator.jpg');

const title=ref('账户信息')

const ownAccountInfo = ref({
    nickName:'够鈡',
    accountNumber:'189348155',
    phone:'56454621',
    email:'264829255656',
    emailAppend:'',
    region:'',
    personSignature:'',
})


// 监听表单是否被修改
const isUpdated=ref(false)

watch(ownAccountInfo, (newValue) => {
    isUpdated.value=true
},{deep:true});

const onSubmit=()=>{
    ElMessage.success("保存成功")
    isUpdated.value=!isUpdated.value
}
</script>

<template>
    <MainContents :title="title">
        <div class="accoutContent">
            <div class="accounInfo">
                <div class="accountAvatar">
                    <!-- <el-avatar shape="square" size="large" fit="fill" :src="avatarUrl" /> -->
                    <img src="@/assets/img/avator.jpg">
                </div>
                <div class="accountDetail">
                    <div class="userName">够钟</div>
                    <div class="accountNumber">账号：517594579</div>
                </div>
            </div>
            <div class="updateAccountInfo">
                <el-form
                    style="max-width: 600px"
                    :model="ownAccountInfo"
                    label-width="auto"
                    label-position="left"
                    size="default"
                >
                    <el-form-item label="昵称">
                        <el-input v-model="ownAccountInfo.nickName" />
                    </el-form-item>
                    <el-form-item label="账号">
                        <el-input v-model="ownAccountInfo.accountNumber" disabled/>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="ownAccountInfo.phone" />
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="ownAccountInfo.email">
                            <template #append>
                                <el-select v-model="ownAccountInfo.emailAppend" placeholder="@qq.com" style="width: 115px">
                                <el-option label="@qq.com" value="1" />
                                <el-option label="@163.com" value="2" />
                                <el-option label="Tsel" value="3" />
                                </el-select>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="地区">
                        <el-select
                            v-model="ownAccountInfo.region"
                            placeholder="请选择你的地区"
                        >
                            <el-option label="上海" value="上海"/>
                            <el-option label="北京" value="北京" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="个性签名">
                        <el-input v-model="ownAccountInfo.personSignature" type='textarea'/>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" v-if="isUpdated" style="width: 100%;">保 存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </MainContents>
</template>

<style scoped>

.accoutContent{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 水平居中 */
    overflow: auto; /* 设置overflow属性，出现滚动条 */
    /* justify-content: center; */

    .accounInfo{
        width: 75%;
        height: 25%;
        margin-top: 20px;
        background-color: lightblue;
        display: flex;
        align-items: center;
        border-radius: 3px;

        .accountAvatar{
            width: 8vw;
            margin-left: 7vw;
            /* aspect-ratio: 1 / 1; */
            height: 8vw;
            overflow: hidden;
            border-radius: 4px;

            .el-avatar{
                width: 100%;  /* 使 el-avatar 填满父 div */  
                height: 100%; /* 使 el-avatar 填满父 div */  
                object-fit: cover; /* 调整图片的填充方式，根据需求可设置为 cover 或 contain */
            }

            img{
                width: 100%; /* 使图片宽度占满容器 */  
                height: 100%; /* 使图片高度占满容器 */  
                object-fit: cover; /* 图片填满容器，保持比例 */  
            }
        }

        .accountDetail{
            margin-left: 10px;
            height: 8vw;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .userName{
                font-size: 3vw;
                letter-spacing: 1vw;
            }
        }
    }

    .updateAccountInfo{
        width: 75%;
        height: 50%;
        margin: 20px;

        .el-form{
            /* margin-left: 7vw; */
        }
    }
}

</style>