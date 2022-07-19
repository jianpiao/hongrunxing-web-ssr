<template>
  <div class="layout-default" ref="app">
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
    <BackTop></BackTop>
  </div>
</template>

<!-- <script>
export default {
  layout: false
};
</script> -->

<script setup lang="ts">
const app = ref(null);

onMounted(() => {
  // 监听是PC端还是移动端
  sessionStorage.setItem("clientWidth", app?.value?.clientWidth?.toString());
  window.onresize = () => {
    sessionStorage.setItem("clientWidth", app?.value?.clientWidth?.toString());
  };
});
</script>

<style scoped lang="scss">
.layout-default {
  overflow: hidden;

  main {
    min-height: calc(100vh - 110px);
    padding-top: 110px;
    background-color: #333;
  }
}
</style>
