<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'

const title=ref('系统设置')
</script>

<template>
    <MainContents :title="title">你好</MainContents>
</template>

<style scoped>

</style>