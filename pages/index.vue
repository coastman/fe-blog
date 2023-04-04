<template>
  <div class="article">
    <div class="carousel">
      <img src="@/assets/img/straw-man.webp" alt="">
    </div>

    <div class="article-list">
      <div class="article-item" v-for="(item, index) in list" :key="item.id">
        <NuxtLink :to="`/article/${item.id}`">
          <div class="item">
            <div class="image-box">
              <img src="@/assets/img/leave-china.webp" alt="">
            </div>
            <div class="item-body">
              <div class="title">
                <div class="title-main">{{ item.title }}</div>
                <div class="description">{{ item.description }}</div>
              </div>
              <div class="meta">
    
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { article } from '@/api';
import { $http } from '@/composables/http';

const res = await $http(article, { params: { page: 1, pageSize: 10 }}) || {};
const list = ref((res as any).data.list);
</script>

<style lang="less" scoped>
.carousel {
  width: 100%;
  margin-bottom: 20px;

  img {
    width: 100%;
    object-fit: contain;
  }
}

.article-list {
  width: 100%;

  .article-item {
    width: 100%;
    height: 140px;
    margin-bottom: 20px;
    color: @text-color;
    background-color: @module-bg;
    cursor: pointer;

    &:hover {
      background-color: @header-bg;
    }

    .item {
      padding: 10px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
    }

    .image-box {
      width: 230px;
      z-index: 6;

      img {
        width: 100%;
        object-fit: cover;
        height: 100%;
      }
      margin-right: 14px;
    }

    .item-body {
      flex: 1;

      .title-main {
        font-size: 18px;
        font-weight: 800;
        margin-bottom: 10px;
      }
    }
  }
}
</style>