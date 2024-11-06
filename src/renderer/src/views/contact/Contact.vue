<script setup>
import {  ref } from 'vue';
import { Search, CirclePlus, Plus } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter
const route=useRoute



const searchData = ref("")

const contactPart = ref([
  {
    title: '新朋友',
    children: [
      {
        name: '搜好友',
        icon: 'icon-search',
        iconBgColor: '#fa9d3b',
        path:'/contact/search'
      },
      {
        name: '新的朋友',
        icon: 'icon-about',
        iconBgColor: '#08bf61',
        path: '/contact/tianjiahaoyou',
        showTitle: true,
        countKey:'contactApplyKey'
      }
    ]
  },
  {
    title: '我的群聊',
    children: [
      {
        name: '新建群聊',
        icon: 'icon-add-group',
        iconBgColor: '#1485ee',
        path:'/contact/search'
      },
      {
        name: '我的群聊',
        icon: 'icon-plane',
        iconBgColor: '#08bf61',
        path:'/contact/contactNotice'
      }
    ]
  },
  {
    title: '公众号',
  }
])




</script>

<template>
    <Layout>
      <!-- 左侧会话区插槽 -->
      <template #left-content>
        <div class="head" style="background-color: white;width: 100%;">
          <!-- 可拖动区域 -->
        <div class="drag-panel drag"></div>
        <!--搜索框  -->
        <div class="search-panel">
          <!--input输入-->
            <el-input  placeholder="请输入搜索内容" v-model="searchData" :suffix-icon="Search" style="height: 25px;"></el-input>
            <el-icon size="large"><CirclePlus /></el-icon>
        </div>
        </div>
        <div class="contactList" >
          <template v-for="item in contactPart">
            <div class="contact-list">
              <div class="contact-list-title">{{ item.title }}</div>
            <!-- 联系人界面的选项 -->
              <div class="contactList-item"
                v-for="children in item.children"
                @click="partJump(children)"
                :class="['part-item',children.path==route.path?active:''] "
              >
                <div class="itemListIcon" :class="['iconfont',children.icon]" :style="{ backgroundColor: children.iconBgColor}"></div>
                <div class="itemListName" >{{ children.name }}</div>
              </div>
            </div>
            <el-divider style="margin-top: 10px;"/>
          </template>
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
  .contactList{
    width: 100%;
    .contact-list{
      .contactList-item{
        display: flex;
        height:57px;
        .itemListIcon{
        margin-top: 10px;
        height: 35px;
        width: 40px;
        font-size: 35px;
        margin-left: 10px;
        border-radius: 3px;
        text-align: center;
        }
        .itemListName{
          margin-left: 15px;
          display: flex;
          align-items: center;
          color: black;
        }
      }
      .contactList-item:hover{
        background-color: grey
      }
    }
  }
</style>
