<script setup name="Settings">
import { ref } from 'vue';

const props=defineProps({
  title:String
})

</script>
<template>
  <div class="contactListPanel">
    <div class="contactListTitle">{{ title }}</div>
    <div class="contactListContect"></div>
  </div>
  
</template>
  
<style lang="scss" scoped>
  .contactListPanel{
    width: 100%;
    height: 100%;
  
    .contactListTitle{
      width: 100%;
      height: 44px;
      font-size: 25px;
      color: black;
      padding: 0 0 0 20px;
      border-bottom: 1px solid lightgrey;
    }
  }
</style>
