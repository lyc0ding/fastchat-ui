<script setup name="Groups">
import { ref, reactive, toRefs, onMounted} from 'vue'
const title = ref('我的群聊');

</script>

<template>
    <ContactContents :title="title"></ContactContents>
</template>

<style scoped lang="less">

</style>