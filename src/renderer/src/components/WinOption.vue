<script setup>
import { ref, reactive, getCurrentInstance, onMounted, nextTick } from 'vue'
const proxy = getCurrentInstance()
// 设置按钮的属性
const props = defineProps({
    showSetTop: {
        type: Boolean,
        default:true
    },
    showSetMin: {
        type: Boolean,
        default:true
    },
    showSetMax: {
        type: Boolean,
        default:true
    },
    showSetClose: {
        type: Boolean,
        default:true
    },
    // 0-关闭  1-隐藏
    closeType: {
        type: Number,
        default: 0    
    }

})

const isMax = ref(false)
const isTop=ref(false)

// 初始化时给一个值
onMounted(() => {
    isTop.value = false
    isMax.value=false
    
})
// 主进程调用（交互）
const winOp = (action, data) => {
    window.ipcRenderer.send('winTitleOp',{action,data})
}

// 关闭之后回调（做一些初始化操作）
const emit = defineEmits(['closeCallback'])

// 关闭窗口
const close = () => {
    winOp('close', { closeType: props.closeType })
    emit('closeCallback')
}

// 最小化窗口
const minimize = () => {
    winOp('minimize')
}

// 最大化窗口
const maximize = () => {
    if (isMax.value) {
        winOp('unmaximize')
    }
    else {
        winOp('maximize')
        isMax.value=true
    }
}

// 置顶
const top = () => {
    isTop.value=!isTop.value
    winOp('top',{top:isTop.value})
}

</script>

<template>
    <div class="win-op no-drag">
        <div
            v-if="showSetTop"
            :class="['iconfont icon-top', isTop ? 'win-top': '']"
            @click="top"
            :title="isTop ? '取消置顶' : '置顶'"></div>
        <div v-if="showSetMin" class="iconfont icon-min" @click="minimize" title="最小化"></div>
        <div
            v-if="showSetMax"
            :class="['iconfont', isMax ? 'icon-maximize' : 'icon-max' ]"
            :title="isMax?'向下还原':'最大化'"
            @click="maximize"></div>
        <div v-if="showSetClose" class="iconfont icon-close" @click="close" title="关闭"></div>
    </div>
</template>

<style lang="scss" scoped>
.win-op{
    top: 0px;
    right: 0px;
    position: absolute;
    z-index: 1;
    overflow: hidden;
    border-radius: 0px 3px Opx Opx;

    .iconfont {
        float: left;
        font-size: 12px;
        color: 0#101010;
        text-align: center;
        display: flex;
        justify-content: center;
        cursor: pointer;
        width:25px;
        height: 25px;
        align-items: center;
        padding: Opx 30px;

        &:hover {
            background-color:lightgrey;
            color:#07c160;
        }
    }

    .icon-close {
        &:hover {
            background:red;
            color:black;
        }
    }

    .win-top {
    background:#ddd;
    color:#07c160;
    }
}
</style>
