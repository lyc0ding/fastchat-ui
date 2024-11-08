<script setup name="Applys">
import { ref, reactive } from 'vue'
const title = ref('新的好友');
</script>

<template>
    <ContactContents :title="title"></ContactContents>
</template>

<style scoped>

</style>