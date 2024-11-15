<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'

const title=ref('文件管理')
</script>

<template>
    <MainContents :title="title"></MainContents>
</template>

<style scoped lang="less">

</style>