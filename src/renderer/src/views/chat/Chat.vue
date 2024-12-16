<script setup name="Sessions">
import { ref } from 'vue';
import {Search,CirclePlus} from '@element-plus/icons-vue'

const searchData=ref("")

const sessionInfo=ref([
  {
    id:0,
    alias:"Tom",
    lastMsg:"你在干嘛",
    avatar:null,
    lastMsgTime:"15:10",
    isRead:true,
    unreadCount:5
  },
  {
    id:1,
    alias:"Jerry",
    lastMsg:"他说的",
    avatar:null,
    lastMsgTime:"14:10",
    isRead:false,
    unreadCount:0
  }
])

const currentSession=ref(null)

const changeSession=(item)=>{
  currentSession.value=item
}

const isActive = (session)=>{
  return currentSession.value && currentSession.value.id == session.id
}
</script>

<template>
    <Layout>
      <!-- 左侧会话区插槽 -->
      <template #left-content>
        <div class="head">
          <!-- 可拖动区域 -->
          <div class="drag-panel drag"></div>
          <!--搜索框  -->
          <div class="search-panel">
          <!--input输入-->
            <el-input  placeholder="请输入搜索内容" v-model="searchData" :suffix-icon="Search"></el-input>
            <el-icon size="large"><CirclePlus /></el-icon>
          </div>
        </div>
        <!-- 会话列表 -->
        <div class="session-panel">
          <div class="session-item"
               :class="{active : isActive(item)}"
               v-for="item in sessionInfo"
               :key="item.id"
               @click="changeSession(item)">
            <div class="friendAvatar">
              <img src=""/>
            </div>
            <div class="friendInfo">
              <div style="font-size: 15px;color: black;">{{ item.alias }}</div>
              <div style="font-size: 12px;color: gray;">{{ item.lastMsg }}</div>
            </div>
          </div>
        </div>
      </template>
      <!-- 右侧聊天区插槽 -->
      <template #right-content>
        <div class="drag-panel drag"></div>
        <router-view v-slot="{Component}">
          <component :is="Component" ref="componentRef"></component>
        </router-view>
      </template>
    </Layout>
</template>

<style lang="scss" scoped>
  .drag-panel{
    height: 25px;
    width: 100%;
  }

  .head{
    width: 100%;
    background-color: white;
    height: 69px;
  }

  .drag-panel{
    height: 25px;
    width: 100%;
  }

  .search-panel{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .el-input{
      width: 80%;
    }
    .el-icon{
      margin-left: 10px;
      color: black;
    }
  }

  .session-panel{
    width: 100%;
    height: 100%;
    user-select: none;  //禁止用户复制会话区内容

    .active{
      background-color: #c0baba;
    }

    .session-item{
      width: 100%;
      height: 45px;
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid lightgrey;

      .friendAvatar{
        width: 25%;
        height: 100%;
        background-color: aqua
      } 
      .friendInfo{
        padding: 2px 10px;
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
</style>
