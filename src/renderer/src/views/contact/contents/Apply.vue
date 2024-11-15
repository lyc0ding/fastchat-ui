<script setup name="Applys">
import { ref, reactive } from 'vue'
const title = ref('新的好友');
</script>

<template>
    <MainContents :title="title"></MainContents>
</template>

<style scoped>
select {  
  width: 200px;  
  height: 100px; /* 调整高度以显示更多选项 */  
}  

</style>