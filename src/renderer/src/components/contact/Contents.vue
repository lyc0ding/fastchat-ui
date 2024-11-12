<script setup name="Settings">
import { ref } from 'vue';

const props=defineProps({
  title:String
}) 

const options=ref(['选项1', '选项2', '选项3', '选项4'])
const selectedOptions = ref([])
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
}

const toggleOption = (option) => {
  const index = selectedOptions.value.indexOf(option);
  console.log(index)
      if (index === -1) {
        selectedOptions.value.push(option); // 如果未选中则添加
      } else {
        selectedOptions.value.splice(index, 1); // 如果已选中则移除
      }
}
</script>


<template>
  <div class="contactListPanel">
    <!-- <div class="contactListTitle">{{ title }}</div> -->

    <div class="contactListContect">
      <div>
        <div class="dropdown" @click="toggleDropdown">
          <span>{{ selectedOptions.length ? selectedOptions.join(', ') : '请选择' }}</span>
        </div>
        <div v-if="isDropdownOpen" class="dropdown-list">
          <div
            v-for="option in options"
            class="dropdown-item"
            @click.stop="toggleOption(option)"
          >
            <input type="checkbox" :checked="selectedOptions.includes(option)" />
            {{ option }}
          </div>
      </div>
    </div>
    </div>

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
