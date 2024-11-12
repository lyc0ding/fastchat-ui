<script setup name="Others">
import { ref } from 'vue';
import {Search,CirclePlus} from '@element-plus/icons-vue'

const OtherList=ref([
  {
    id:1,
    title:'账号信息',
    icon:'icon-man',
    path:'/other/account',
    bgColor:'#37e920'
  },
  {
    id:2,
    title:'文件管理',
    icon:'icon-man',
    path:'/other/file',
    bgColor:'#ff8000'
  },
  {
    id:3,
    title:'我的收藏',
    icon:'icon-man',
    path:'/other/collect',
    bgColor:'#00c3ff'
  },
  {
    id:4,
    title:'系统设置',
    icon:'icon-setting',
    path:'/other/setting',
    bgColor:'#00c3ff'
  },
  {
    id:5,
    title:'关于我们',
    icon:'icon-about',
    path:'/other/about',
    bgColor:'#edbbd8'
  }
])

</script>

<template>
    <Layout>
      <!-- 左侧会话区插槽 -->
      <template #left-content>
        <!-- 可拖动区域 -->
        <div class="drag-panel drag"></div>

        <div class="otherList">
          <div class="otherListItem" v-for="item in OtherList" :key="item.id">
            <div :class="['iconfont',item.icon,otherItemIcon]" :style="{backgroundColor:item.bgColor}"></div>
            <div class="otherListItemText">
              {{ item.title }}
            </div>
          </div>
        </div>
        
      </template>
      <!-- 左侧聊天区插槽 -->
      <template #right-content>
        <div class="drag-panel drag"></div>
        <router-view>
          
        </router-view>
      </template>
    </Layout>
</template>

<style lang="scss" scoped>
  .drag-panel{
    height: 25px;
    width: 100%;
  }

  .otherList{
    width: 100%;
    height: 100%;

    .otherListItem{
      display: flex;
      flex-direction: row;
      padding-left: 10px;
      align-items: center;
      &:hover{
        background-color: lightgrey;
      }

      .iconfont{
      height: 35px;
      width: 40px;
      border-radius: 3px;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      }
      .otherListItemText{
        margin-left: 15px;
        display: flex;
        align-items: center;
        color: black;
        margin-top: 8px
      }
    }

    
  }

  .search-panel{
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .el-icon{
      margin-left: 15px;
      color: black;
    }
  }
</style>
