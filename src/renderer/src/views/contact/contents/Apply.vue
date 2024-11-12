<script setup name="Applys">
import { ref, reactive } from 'vue'
const title = ref('新的好友');
</script>

<template>
    <ContactContents :title="title"></ContactContents>
</template>

<style scoped>
select {  
  width: 200px;  
  height: 100px; /* 调整高度以显示更多选项 */  
}  

</style>