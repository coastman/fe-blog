<template>
  <h3 class="title">
    index.vue
    <p class="content">content</p>
  </h3>
</template>

<style lang="less" scoped>
  .title {
    color: @red;
    .content {
      color: @green;
      .text-overflow();
    }
  }
</style>