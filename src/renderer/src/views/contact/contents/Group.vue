<script setup name="Groups">
import { ref, reactive, toRefs, onMounted} from 'vue'
const title = ref('我的群聊');

</script>

<template>
    <MainContents :title="title"></MainContents>
</template>

<style scoped lang="less">

</style>