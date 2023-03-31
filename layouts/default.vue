<template>
  <div class="app">
    <div class="header">
      <div class="header-main container">
        <div class="logo">
          <img src="@/assets/img/logo.svg" alt="">
          <span>向死而生</span>
        </div>

        <div class="tool-box">
          <button class="tooggle-theme" @click="handleToggleTheme">
            <i :class="['iconfont', theme === 'default' ? 'icon-sun' : 'icon-moon']" />
          </button>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="container main-container">
        <div class="left-menu">
          <NuxtLink
            class="menu-item"
            v-for="(item, index) in list"
            :key="index"
            :to="item.link"
          >
            {{ item.text }}
          </NuxtLink>
        </div>
        <div class="main-container-content">
          <slot />
        </div>
        <div class="right-box">
  
        </div>
      </div>
    </div>

    <div class="footer">footer</div>
  </div>
</template>

<script setup lang="ts">
const theme = useTheme();
const historyTheme = useCookie('theme', { maxAge: 2626560 });

const list = ref([
  {
    text: '明殿',
    link: '/'
  },
  {
    text: '宁静寺',
    link: '/list'
  },
  {
    text: '无色庵',
    link: '/list'
  },
  {
    text: '丹青阁',
    link: '/list'
  },
  {
    text: '狂浪生',
    link: '/list'
  },
  {
    text: '四方馆',
    link: '/list'
  },
  {
    text: '客户端',
    link: '/list'
  },
  {
    text: '广而告之',
    link: '/list'
  },
  {
    text: 'hello world',
    link: '/list'
  },
]);

const handleToggleTheme = () => {
  if (theme.value === 'default') theme.value = 'dark';
  else theme.value = 'default';
  historyTheme.value = theme.value;
};

</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}

.header {
  height: 60px;
  background: @header-bg;
  border-bottom: 1px solid @header-border;

  &-main {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    .logo {
      height: 24px;

      img {
        width: 180px;
        height: auto;
        object-fit: contain;
        vertical-align: text-bottom;
        filter: @theme-logo-rotate;
      }

      span {
        margin-left: 32px;
        color: @primary-color;
        font-family: web-font;
        font-size: 16px;
      }
    }

    .tooggle-theme {
      .iconfont {
        opacity: .5;
        font-size: 18px;
        font-weight: bold;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}

.main {
  overflow: hidden;

  &-container {
    margin-top: 20px;
    display: flex;

    &-content {
      width: 720px;
      margin-right: 20px;
    }
  }

  .left-menu {
    width: 180px;
    margin-right: 20px;

    .menu-item {
      height: 46px;
      line-height: 46px;
      color: @text-color;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: .5;
      margin-bottom: 10px;

      &:hover {
        opacity: 1;
        background-color: @header-bg;
        cursor: pointer;
        color: @primary-color;
      }

      &.router-link-active {
        opacity: 1;
        background-color: @header-bg;
        color: @primary-color;
      }
    }
  }

  .right-box {
    flex: 1;
  }
}
</style>