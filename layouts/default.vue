<template>
  <div class="app">
    <div class="header">
      <div class="container">
        <div class="logo">
          <img src="@/assets/img/logo.svg" alt="">
          <span>向死而生</span>
        </div>

        <div class="tool-box">
          <button class="tooggle-theme" @click="handleToggleTheme">
            <i :class="[
                'iconfont',
                theme === 'default' ? 'icon-sun' : 'icon-moon'
              ]" 
            />
          </button>
        </div>
      </div>
    </div>

    <div class="main">
      <slot />
    </div>

    <div class="footer">footer</div>
  </div>
</template>

<script setup lang="ts">
const theme = useTheme();
const historyTheme = useCookie('theme');

const handleToggleTheme = () => {
  if (theme.value === 'default') theme.value = 'dark';
  else theme.value = 'default';
  historyTheme.value = theme.value;
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  background: @header-bg;
  border-bottom: 1px solid @header-border;

  .container {
    width: 1200px;
    margin: 0 auto;
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
        color: @font-color;
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
</style>