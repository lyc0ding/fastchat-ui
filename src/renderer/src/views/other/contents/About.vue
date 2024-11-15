<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'

const title=ref('关于我们')
</script>

<template>
    <MainContents :title="title"></MainContents>
</template>

<style scoped lang="less">

</style>