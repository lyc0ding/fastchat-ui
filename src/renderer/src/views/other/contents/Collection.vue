<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'

const title=ref('我的收藏')

const searchData=ref({
    searchContent:'',
    orderType:'0'   //默认按最新时间来排序
})

const orderTypeSelected=[
  {
    value: '0',
    label: '按最新时间',
  },
  {
    value: '1',
    label: '按最早时间',
  },
  {
    value: '2',
    label: '按文件类型',
  }
]

const fileInfo=ref([
    {
        fileTime:'2024-11-5',//保存时间
        fileType:'zip',//word、pdf、zip……
        fileName:'FastCode',
        fileStatus:1, //状态：正常/已清理
        fileFrom:'够鈡',
        fileSize:'15.4'
    },
    {
    fileTime:'2024-1-5',//保存时间
    fileType:'pdf',//word、pdf、zip……
    fileName:'pic',
    fileStatus:0, //状态：正常/已清理
    fileFrom:'Tom',
    fileSize:'11.4'
}
])

</script>

<template>
    <MainContents :title="title">
        <div class="container">
            <div class="fileContainer">
                <div class="fileContainerHead">
                    <el-input v-model="searchData.searchContent" placeholder="搜索" clearable/>
                    <el-select v-model="searchData.orderType" placeholder="Select" size="small" style="width: 150px">
                        <el-option
                            v-for="item in orderTypeSelected"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
                <div class="fileContent">
                    <div class="fileItem" v-for="file in fileInfo" key="item.fileName">
                        <div class="filePanel">
                            <div class="filePic">
                                <el-avatar shape="square" style=" width: 100%;height: 100%;object-fit: cover;"/>
                            </div>
                            <div class="fileNameSize">
                                <div class="fileName">{{ file.fileName }}.{{ file.fileType }}</div>
                                <div class="fileSize">{{ file.fileSize}} KB</div>
                            </div>
                            <div class="fileStatus" v-if="!file.fileStatus">
                                文件已过期或已被清理
                            </div>
                        </div>
                        <div class="fileTimeInfo">
                            <div class="fromUser">来自：{{ file.fileFrom }}</div>
                            <div class="reciveTime">{{ file.fileTime }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainContents>
</template>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .fileContainer{
        width: 98%;
        height: 97%;
        border-radius: 5px;

        .fileContainerHead{
            width: 100%;
            height: 20px;
            
            .el-input{
                width: 40%;
                height: 25px;
                float: left;
            }

            .el-select{
                float: right;
            }
        }

        .fileContent{
            width: 100%;
            height: 50%;
            margin-top: 30px;
            border-radius: 5px;
            background-color: #f2f2f2;
            display: flex;
            flex-direction: column;
            align-items: center;

            .fileItem{
                width: 90%;
                height: 20%;
                margin-top: 5px;
                display: flex;
                flex-direction: row ;
                justify-content: space-between;
                padding: 10px;

                &:hover{
                    background-color: lightgrey;
                }

                .filePanel{
                    display: flex;
                    flex-direction: row ;
                    .filePic{
                    height: 100%;
                    aspect-ratio: 1/1;
                    }
                    .fileNameSize{
                        height: 100%;
                        margin-left: 25px;
                        display: flex;
                        flex-direction: column ;
                        justify-content: space-between;
                        
                        .fileName{
                            color: black;
                            font-size: 18px;
                        }
                    }
                    
                    .fileStatus{
                            padding-left: 10px;
                            color: red;
                        }
                }
                
                .fileTimeInfo{
                    width: 100px;
                    height: 100%;
                    display: flex;
                    flex-direction: column-reverse;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>