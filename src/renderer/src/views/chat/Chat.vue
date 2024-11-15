<script setup name="Sessions">
import { ref } from 'vue';
import {Search,CirclePlus} from '@element-plus/icons-vue'

const searchData=ref("")

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
</style>
