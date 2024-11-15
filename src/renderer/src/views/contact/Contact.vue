<script setup  name="Contacts">
import {  ref } from 'vue';
import { Search, CirclePlus, Plus } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route=useRoute

// 组件
import BlankPage from '@/components/BlankPage.vue'

// 联系人左侧选项
const contactPart = ref([
  {
    title: '新朋友',
    childrens: [
      {
        id:1,
        name: '新的朋友',
        icon: 'icon-add-group',
        iconBgColor: '#08bf61',
        path: '/contact/apply',
        showTitle: true,
        countKey:'contactApplyKey'
      }
    ],
  },
  {
    title: '群聊',
    childrens: [
      {
        id:2,
        name: '我的群聊',
        icon: 'icon-plane',
        iconBgColor: '#fe7a06',
        path:'/contact/group'
      }
    ]
  },
  {
    title: '公众号',
    contactData:[],
    emptyMsg:'暂未添加公众号'
  },
  {
    title: '我的好友',
    contactData:[],
    emptyMsg:'暂未添加任何好友'
  }
])

const searchData=ref('')

// 选项活动状态、路由
const currentPart = ref(null)
const selectedPart=(children)=>{
  currentPart.value=children
  router.push(children.path)
}
// 判断当前选项
const isActive=(children)=>{
  return currentPart.value && currentPart.value.id == children.id
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
        <div class="contactList" >
          <template v-for="item in contactPart">
            <div class="contact-list">
              <div class="contact-list-title" style="margin-top:-15px;">{{ item.title }}</div>
            <!-- 联系人界面的选项 -->
              <div class="contactList-item"
                v-for="children in item.childrens"
                @click="selectedPart(children)"
                :class="{active:isActive(children)}"
              >
                <div class="itemListIcon" :class="['iconfont',children.icon]" :style="{ backgroundColor: children.iconBgColor}"></div>
                <div class="itemListName" >{{ children.name }}</div>
              </div>
            </div>
            <!-- 群聊、联系人查询为空提示 -->
            <div class="contactListEmptyMsg" v-if="item.contactData && item.contactData.length == 0">{{ item.emptyMsg }}</div>
            <el-divider style="margin-top: 5px;"/>
          </template>
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
  .contactList{
    width: 100%;
    margin-top:30px;
    .contact-list{
      .contact-list-title{
        color:#878686;
        font-size:12px;
      }
      .contactList-item{
        display: flex;
        height:55px;
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

      .active{
        background-color: #c0baba;
      }
      
    }

    .contactListEmptyMsg{
      margin-top: 10px;
        text-align: center;
      }
  }
</style>
