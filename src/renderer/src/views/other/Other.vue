<script setup name="Sessions">
import { ref } from 'vue';
import {Search,CirclePlus} from '@element-plus/icons-vue'

const OtherList=ref([
  {
    id:1,
    title:'账号信息',
    icon:'icon-man',
    path:'/other/account',
    bgColor:'##37e920'
  },
  {
    id:2,
    title:'文件管理',
    icon:'icon-man',
    path:'/other/file',
    bgColor:'##37e920'
  },
  {
    id:3,
    title:'我的收藏',
    icon:'icon-man',
    path:'/other/collect',
    bgColor:'##37e920'
  },
  {
    id:4,
    title:'关于我们',
    icon:'icon-about',
    path:'/other/about',
    bgColor:'##37e920'
  }
])

</script>

<template>
    <Layout>
      <!-- 左侧会话区插槽 -->
      <template #left-content>
        <!-- 可拖动区域 -->
        <div class="drag-panel drag"></div>

        <div class="otherList" v-for="item in OtherList" :key="item.id">
          <div :class="['iconfont',item.icon,otherItemIcon]" ></div>
        </div>
        
      </template>
      <!-- 左侧聊天区插槽 -->
      <template #right-content>
        <div class="drag-panel drag"></div>
      </template>
    </Layout>
</template>

<style lang="scss" scoped>
  .drag-panel{
    height: 25px;
    width: 100%;
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
