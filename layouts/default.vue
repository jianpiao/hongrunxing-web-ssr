<template>
  <div class="layout-default">
    <Header />
    <main class="main">
      <slot />
    </main>
    <Footer />
    <BackTop></BackTop>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
export default {
  layout: false,
}
</script>
