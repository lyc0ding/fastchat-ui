<!--主界面----聊天界面系统布局 -->
<template>
  <div class="layout-container">
    <div class="left-list">
      <slot name="left-content"></slot>
    </div>
    <div class="right-chat">
      <slot name="right-content"></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .layout-container{
    display: flex;
    flex-direction: row;

    .left-list{
      width: 255px;
      background-color: lightgrey;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      border-right: 1px solid rgb(211, 207, 207);
    }
    .right-chat{
      flex:1;
      width: 100vw;
      height: calc(100vh - 2px );
      background-color: white;
    }
  }
</style>
