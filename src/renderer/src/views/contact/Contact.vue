<script setup  name="Contacts">
import {  ref } from 'vue';
import { Search, CirclePlus, Plus } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter
const route=useRoute

// 组件
import BlankPage from '@/components/BlankPage.vue'

const searchData = ref("")

const currentSelected=ref(undefined)
const partJump=(item)=>{
  // currentSelected.value=item.  
}

// const selected=

const contactPart = ref([
  {
    title: '新朋友',
    childrens: [
      {
        name: '搜好友',
        icon: 'icon-search',
        iconBgColor: '#fa9d3b',
        path:'/contact/search'
      },
      {
        name: '新的朋友',
        icon: 'icon-man',
        iconBgColor: '#08bf61',
        path: '/contact/newFriends',
        showTitle: true,
        countKey:'contactApplyKey'
      }
    ]
  },
  {
    title: '我的群聊',
    childrens: [
      {
        name: '新建群聊',
        icon: 'icon-add-group',
        iconBgColor: '#1485ee',
        path:'/contact/createGroup'
      },
      {
        name: '我的加入群聊',
        icon: 'icon-plane',
        iconBgColor: '#08bf61',
        path:'/contact/myGroups'
      }
    ]
  },
  {
    title: '公众号',
  },
  {
    title: '我的好友',
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
                v-for="children in item.childrens"
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
      <!-- 右侧聊天区插槽 -->
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
      .contact-list-title{
        color:#878686;
        font-size:12px;
      }
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
        background-color:lightgrey;
      }
    }
  }
</style>
