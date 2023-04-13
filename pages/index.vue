<template>
  <div class="article">
    <div class="carousel">
      <swiper
        :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
        :slides-per-view="1"
        :loop="true"
        :effect="'creative'"
        :autoplay="{
          delay: 8000,
          disableOnInteraction: true,
        }"
        :navigation="{}"
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
        <swiper-slide v-for="slide in 10" :key="slide">
          <img src="@/assets/img/straw-man.webp" alt="">
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
                <span><i class="iconfont icon-chakan"></i>66</span>
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