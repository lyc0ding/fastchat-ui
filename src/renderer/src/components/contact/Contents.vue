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

    .dropdown {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  width: 200px;
}

.dropdown-list {
  border: 1px solid #ccc;
  border-top: none;
  position: absolute;
  background-color: white;
  width: 200px; 
  max-height: 150px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
  }
</style>
