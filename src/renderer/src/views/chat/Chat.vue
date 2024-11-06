<script setup>
import { ref } from 'vue';
import {Search,CirclePlus} from '@element-plus/icons-vue'

const searchData=ref("")

</script>

<template>
    <Layout>
      <!-- 左侧会话区插槽 -->
      <template #left-content>
        <!-- 可拖动区域 -->
        <div class="drag-panel drag"></div>
        <!--搜索框  -->
        <div class="search-panel">
          <!--input输入-->
            <el-input  placeholder="请输入搜索内容" v-model="searchData" :suffix-icon="Search" style="height: 25px;"></el-input>
            <el-icon size="large"><CirclePlus /></el-icon>
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
