<template>
  <div class="article">
    <div class="carousel">
      <swiper
        class="swiper"
        :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination, SwiperNavigation]"
        :slides-per-view="1"
        :loop="true"
        :effect="'creative'"
        :pagination="{
          clickable: true
        }"
        :autoplay="{
          delay: 3500,
          disableOnInteraction: true,
        }"
        :creative-effect="{
          prev: {
            shadow: false,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }"
      >
        <swiper-slide v-for="(item, index) in list" :key="item.id">
          <img :src="`http://127.0.0.1:3008${item.thumbnailUrl}`" alt="">
        </swiper-slide>
      </swiper>
    </div>

    <div class="article-list">
      <div class="article-item" v-for="(item, index) in list" :key="item.id">
        <NuxtLink :to="`/article/${item.id}`">
          <div class="item">
            <div class="image-box">
              <img :src="`http://127.0.0.1:3008${item.thumbnailUrl}`" alt="">
            </div>
            <div class="item-body">
              <div class="title">
                <div class="title-main">{{ item.title }}</div>
                <div class="description">{{ item.description }}</div>
              </div>
              <div class="meta">
                <span><i class="iconfont icon-shijian"></i>5个月前</span>
                <span><i class="iconfont icon-chakan"></i>{{ item.viewCount }}</span>
                <span><i class="iconfont icon-xiaoxi"></i>4</span>
                <span><i class="iconfont icon-dianzan"></i>1</span>
                <span><i class="iconfont icon-yingyongzhongxin"></i>无色庵</span>
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
  height: 230px;
  overflow: hidden;

  .swiper {
    width: 100%;
    height: 230px;
    overflow: hidden;

    :deep(.swiper-pagination-bullet) {
      width: 10px;
      background-color: rgba(255, 255, 255);
      opacity: .5;
      border-radius: 1px;
    }
  
    :deep(.swiper-pagination-bullet-active) {
      width: 20px;
      background-color: #FFF;
      opacity: 1;
      border-radius: 2px;
    }
  }

  img {
    width: 100%;
    object-fit: contain;
    height: auto
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

      .title {
        margin-bottom: 50px;
      }

      .title-main {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
      }

      .meta {
        // display: flex;
        span + span {
          margin-left: 42px;
        }
        span {
          i { margin-right: 8px; }
        }
        // justify-content: space-between;
      }
    }
  }
}
</style>