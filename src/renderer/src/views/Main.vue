<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import {UserFilled,ChatDotSquare,Orange,Setting} from '@element-plus/icons-vue'
const proxy = getCurrentInstance()
const router = useRouter()

const menuList = ref([
    {
        name: 'chat',
        path: '/chat',
        countKey: 'chatCount',
        position:'top'
    },
    {
        name: 'contact', 
        path: '/contact',
        countKey: 'contactApplyCount',
        position:'top'
    },
    {
        name: 'other',
        path: '/other',
        position:'bottom'
    }

])
//切换子路由
const currentMenu = ref(menuList.value[0])
const changeMenu = (item) => {
    for (const key in selected) {
        selected[key]=undefined
    }
    selected[item.name]=true
    currentMenu.value = item;
    router.push(item.path)
}
//图标选中状态切换
const selected = ref({
    chat: true,
    contact: undefined,
    other:undefined
})
//头像url
const squareUrl=ref('')
</script>
 
<template>
    <div class="main">
        <div class="left">
            <div class="user-avator">
                <el-row>
                    <el-col :span="12">
                        <div class="demo-basic--circle">
                            <div class="block">
                                <el-avatar shape="square" :size="40" src="" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="menu-list">
                <div class="menu-list-item">
                    <template v-for="item in menuList">
                        <div class="menu-item" :class="{'active':selected.chat}" v-if="item.name=='chat'" @click="changeMenu(item)">
                            <el-icon><ChatDotSquare /></el-icon>
                        </div>
                        <div class="menu-item" :class="{'active':selected.contact}" v-if="item.name=='contact'" @click="changeMenu(item)">
                            <el-icon><UserFilled /></el-icon>
                        </div>
                    </template>
                </div>
                <div class="menu-list-item">
                    <template v-for="item in menuList">
                        <div class="menu-item" :class="{'active':selected.other}" v-if="item.position=='bottom'" @click="changeMenu(item)">
                            <template v-if="item.name=='other'"><el-icon><Orange /></el-icon></template>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="right">
            <router-view v-slot="{Component}">
                <keep-alive include="chat">
                    <component :is="Component" ref="componentRef"></component>
                </keep-alive>
            </router-view>
        </div>
    </div>
    
  <WinOption></WinOption>
</template>

<style lang="scss" scoped>
    .main {
        display: flex;
        border-radius: 0px 3px 3px 0px;
        overflow: hidden;
        background-color: #FFFFFF;
        height: calc(100vh);

        .left {
            background-color: #2E2E2E;
            width: 55px;
            display: flex;
            height: 100%;
            align-items: center;
            flex-direction: column;
            .user-avator{
                margin-top: 50px;
            }

            .menu-list {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .menu-list-item {
                    width: 55px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 15px;
                    
                    .active{
                    color: #07c160;
                    }
                    
                    .menu-item{
                        font-size: 22px;
                        align-items: center;
                    }
                }
            }
        }
        .right{
        flex: 1;
        overflow: hidden;
        border: 1px solid #bbb;
        border-left: none;
    }
    }
</style>
<!-- <style lang="scss" scoped>
.main{
    background-color: #ddd;
    display: flex;
    border-radius: 0px 3px 3px 0px;
    overflow: hidden;
    .left{
        width: 55px;
        background-color: #2E2E2E;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 35px;
        border: 1px solid #545454;
        border-right: none;
        overflow: hidden;
        .menu-list{
            margin-top: 20px;
            display: flex;
            flex:1;
            flex-direction: column;
            justify-content: space-between;
            .menu-list-top{
                .menu-top-item{
                    width: 55px;
                    color:#d3d3d3;
                    height: 40px;
                    line-height: 40px;
                    font-size: 22px;
                }
                .active{
                    color: #07c160;
                }
            }
            .menu-bottom{
                width: 55px;
                color:#d3d3d3;
                height: 40px;
                line-height: 40px;
                font-size: 22px;
                justify-content: flex-end;
            }
            .active{
                color: #07c160;
            }
        }
        
    }
    .right{
        flex: 1;
        overflow: hidden;
        border: 1px solid #bbb;
        border-left: none;
    }
}

.popover-user-panel{
    padding: 10px;
    .popover-user{
        display: flex;
        border-bottom:1px solid #bbb; 
        padding-bottom: 20px;
    }
    .send-message{
        margin-top: 10px;
        text-align: center;
        padding: 20px 0px 0px 0px;
    }
}
</style> -->

