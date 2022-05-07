<template>
  <div class="layout-default">
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
    <BackTop></BackTop>
  </div>
</template>

<script>
export default {
  layout: false,
};
</script>

<style scoped lang="scss">
.layout-default {
  overflow: hidden;

  main {
    min-height: calc(100vh - 110px);
  }
}
</style>
