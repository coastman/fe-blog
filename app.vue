<template>
  <Html :class="theme">
    <Body>
      <NuxtLayout>
        <!-- <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" /> -->
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup lang="ts">
const theme = useTheme();
</script>
